import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

export const initializeDatabase = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY,
        title TEXT,
        year INTEGER,
        studios TEXT,
        producers TEXT,
        winner TEXT
      )
    `);
  });
};

export const insertMovie = (
  title: string,
  year: number,
  studios: string,
  producers: string,
  winner: string
) => {
  db.run(
    'INSERT INTO movies (title, year, studios, producers, winner) VALUES (?, ?, ?, ?, ?)',
    [title, year, studios, producers, winner]
  );
};

export const getMovies = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM movies', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
