import swaggerConfig from '@/docs';
import Logger from '@/infra/Log/logger';
import routes from '@/routes/routes';
import cors from 'cors';
import '@/config/env';
import 'express-async-errors';
import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import * as expressWinston from 'express-winston';
import path from 'path';
import responseTime from 'response-time';
import { serve, setup } from 'swagger-ui-express';
import Youch from 'youch';
import { initializeDatabase } from '@/infra';
import { importCSVData } from '@/utils';

const { NODE_ENV } = process.env;

class App {
  public server: express.Application;

  constructor() {
    const csvFilePath = path.join(__dirname, '../../movielist.csv');
    initializeDatabase();

    importCSVData(csvFilePath)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

    this.server = express();

    this.server.use(responseTime());

    this.server.use(
      '/.well-known/acme-challenge',
      express.static('static/.well-known/acme-challenge')
    );

    this.server.use('/docs', serve, setup(swaggerConfig));
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.disable('x-powered-by');
    this.server.use(
      (request: Request, response: Response, next: NextFunction) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
      }
    );
    this.server.use(
      responseTime((request: Request, response: Response, time: number) => {
        const info = {
          method: request.method,
          url: request.url,
          time,
          body: request.body,
          headers: request.headers,
          statusCode: response.statusCode,
          IP: request.connection.remoteAddress,
        };
        Logger.info(JSON.stringify(info));
      })
    );
    this.server.set('json spaces', 2);
    this.server.use(expressWinston.logger({ winstonInstance: Logger }));
    this.server.use(express.json({ limit: '50MB' }));
    this.server.use(express.urlencoded({ extended: false }));

    this.server.use(
      cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true,
      })
    );

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(
      async (
        request: Request,
        response: Response,
        err: ErrorRequestHandler
      ) => {
        const host = request.get('host');
        const { protocol, url, method } = request;
        const userAgent = request.headers['user-agent'];
        const errors = await new Youch(err, request).toJSON();

        Logger.error(
          JSON.stringify({
            errors,
            host,
            protocol,
            url,
            method,
            userAgent,
          })
        );

        if (NODE_ENV === 'development') {
          return response.status(500).json({
            errors,
            host,
            protocol,
            url,
            method,
            userAgent,
          });
        }

        return response.status(500).json({ error: 'Internal server error' });
      }
    );
  }
}

export default new App().server;
