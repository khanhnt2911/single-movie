export const fetcher = (...args) => fetch(...args).then((res) => res.json())
export const API_KEY = "b2bfd7a8fd6001ec78e71956b1a29faa"
const MDB_ENDPOINT = "https://api.themoviedb.org/3/movie"
const MDB_ENDPOINT_SEARCH = "https://api.themoviedb.org/3/search/movie"
export const MDB_API = {
  getMovieList: (type, page) =>
    `${MDB_ENDPOINT}/${type}?api_key=${API_KEY}&page=${page}`,
  getMovieSearch: (query, page) =>
    `${MDB_ENDPOINT_SEARCH}?api_key=${API_KEY}&query=${query}&page=${page}`,
  getMovieDetails: (movieId) =>
    `${MDB_ENDPOINT}/${movieId}?api_key=${API_KEY}&language=en-US`,
  getMovieMeta: (movieId, type) =>
    `${MDB_ENDPOINT}/${movieId}/${type}?api_key=${API_KEY}&language=en-US`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
}
