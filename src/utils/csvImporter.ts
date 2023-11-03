import fs from 'fs';
import csvParser from 'csv-parser';
import { insertMovie } from '@/infra';

export const importCSVData = (csvFilePath: string) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser({ separator: ';' }))
      .on('data', (row) => {
        insertMovie(
          row.title,
          parseInt(row.year),
          row.studios,
          row.producers,
          row.winner
        );
      })
      .on('end', () => {
        resolve('Dados do CSV importados com sucesso.');
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
