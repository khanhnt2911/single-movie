export const fetcher = (...args) => fetch(...args).then((res) => res.json())
export const API_KEY = "b2bfd7a8fd6001ec78e71956b1a29faa"
const TMDB_ENDPOINT = 'https://api.themoviedb.org/3/movie'
const TMDB_ENPOINT_SEARCH = 'https://api.themoviedb.org/3/search/movie'
export const TMDB_API = {
  getMovieList: (type, page) => `${TMDB_ENDPOINT}/${type}?api_key=${API_KEY}&page=${page}`,
  getMovieSearch: (query, page) => `${TMDB_ENPOINT_SEARCH}?api_key=${API_KEY}&query=${query}&page=${page}`,
  getMovieDetails: (movieId) => `${TMDB_ENDPOINT}/${movieId}?api_key=${API_KEY}&language=en-US`,
  getMovieMeta: (movieId, type) => `${TMDB_ENDPOINT}/${movieId}/${type}?api_key=${API_KEY}&language=en-US`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`
}
