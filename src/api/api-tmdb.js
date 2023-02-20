const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '9cb79068ade378f45d510f1b7326cccd';

export async function getMovies(typeOfQuery, movieId, searchQuery) {
  let options;
  let queryOptions = '';

  switch (typeOfQuery) {
    case 'search':
      options = `search/movie`;
      queryOptions = `&query=${searchQuery}`;
      break;

    case 'details':
      options = `/movie/${movieId}`;
      break;

    case 'cast':
      options = `/movie/${movieId}/credits`;
      break;

    case 'reviews':
      options = `/movie/${movieId}/reviews`;
      break;

    case 'trend':
      options = `trending/all/day`;
      break;

    default:
      console.log('Invalid typeOfQuery');
  }

  return fetch(`${BASE_URL}${options}?api_key=${API_KEY}${queryOptions}`).then(
    res => res.json()
  );
}

// ===== Деталі ================================================================================
// /trending/get-trending список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці.
// /search/search-movies пошук фільму за ключовим словом на сторінці фільмів.
// /movies/get-movie-details запит повної інформації про фільм для сторінки кінофільму.
// /movies/get-movie-credits запит інформації про акторський склад для сторінки кінофільму.
// /movies/get-movie-reviews запит оглядів для сторінки кінофільму.
// ================================================================================


// ===== Альтернатива ================================================================================
// export function getTrendingMovies() {
//   return fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}`).then(res =>
//     res.json()
//   );
// }

// export function getSearchMovies(searchQuery) {
//   return fetch(
//     `${BASE_URL}search/movie?api_key=${API_KEY}&query=${searchQuery}`
//   ).then(res => res.json());
// }

// export function getMovieDetails(movieId) {
//   return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then(res =>
//     res.json()
//   );
// }

// export function getMovieDetailsCast(movieId) {
//   return fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`).then(
//     res => res.json()
//   );
// }

// export function getMovieDetailsReviews(movieId) {
//   return fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`).then(
//     res => res.json()
//   );
// }