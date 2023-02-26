const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '9cb79068ade378f45d510f1b7326cccd';

export async function getMovies(typeOfQuery, currentPage=1, searchQuery, movieId) {
  let options;
  let queryOptions = '';
  const page = currentPage ? `&page=${currentPage}` : '';

  switch (typeOfQuery) {
    case 'search':
      options = `search/movie`;
      queryOptions = `&query=${searchQuery}`;
      break;

    case 'details':
      options = `movie/${movieId}`;
      break;

    case 'video':
      options = `movie/${movieId}/videos`;
      break;

    case 'cast':
      options = `movie/${movieId}/credits`;
      break;

    case 'reviews':
      options = `movie/${movieId}/reviews`;
      break;

    case 'trend':
      options = `trending/all/week`;
      break;

    case 'genres':
      options = `genre/movie/list`;
      break;

    default:
      console.log('Invalid type of query');
  }

  const res = await fetch(
    `${BASE_URL}${options}?api_key=${API_KEY}${queryOptions}${page}`
  );
  const resJson = await res.json();
  return resJson;

  // ===== old return ==================================================
  // return fetch(`${BASE_URL}${options}?api_key=${API_KEY}${queryOptions}`).then(
  //   res => res.json()
  // );
}

// ===== Деталі ================================================================================
// /trending/get-trending список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці.
// /search/search-movies пошук фільму за ключовим словом на сторінці фільмів.
// /movies/get-movie-details запит повної інформації про фільм для сторінки кінофільму.
// /movies/get-movie-credits запит інформації про акторський склад для сторінки кінофільму.
// /movies/get-movie-reviews запит оглядів для сторінки кінофільму.
// ================================================================================