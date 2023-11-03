import { importCSVData } from '../src/utils/csvImporter';
import { getMovies } from './infra';

describe('CSV Importer', () => {
  it('should import data from CSV', async () => {
    await importCSVData('path/to/your/movies.csv');
    const movies = await getMovies();

    expect(movies).toHaveLength(2);
  });
});
