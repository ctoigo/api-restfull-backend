/* eslint-disable prettier/prettier */
import fs from 'fs';
import csvParser from 'csv-parser';
import { insertMovie } from '@/infra';

const expectedHeader = ['year', 'title', 'studios', 'producers', 'winner'];

const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export const importCSVData = (csvFilePath: string) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser({ separator: ';' }))
      .on('headers', (headers) => {
        if (!arraysAreEqual(headers, expectedHeader)) {
          reject(
            'Cabeçalhos inválidos. O formato do arquivo deve ser: ' +
            expectedHeader.join(', ')
          );
        }
      })
      .on('data', (row) => {
        if (isNaN(row.year) || row.year < 0) {
          reject('Dados inválidos: A ano deve ser um número positivo.');
        }
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
        reject('Erro ao processar o arquivo CSV: ' + error.message);
      });
  });
};
