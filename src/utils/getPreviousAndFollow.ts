export const getPreviousWinYear = (
  movies: any,
  producer: string,
  year: number
): number | null => {
  const producerMovies = movies.filter(
    (movie) => movie.producers === producer && movie.year < year
  );
  if (producerMovies.length > 0) {
    return Math.max(...producerMovies.map((movie) => movie.year));
  }
  return null;
};

export const getFollowingWinYear = (
  movies: any,
  producer: string,
  year: number
): number | null => {
  const producerMovies = movies.filter(
    (movie) => movie.producers === producer && movie.year > year
  );
  if (producerMovies.length > 0) {
    return Math.min(...producerMovies.map((movie) => movie.year));
  }
  return null;
};
