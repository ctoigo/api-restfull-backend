import components from './components';
import paths from './paths';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'API RestFULL Backend',
    description: 'Essa é a documentação da API de um RestFULL Backend.',
    version: '1.0.0',
    contact: {
      name: 'Chrystian Toigo',
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'API',
      description: 'APIs relacionadas nas chamadas',
    },
  ],
  paths,
  schemas,
  components,
};
