import { getMovies } from '../../../api/api-tmdb';
import refs from '../../../common/js/refs';
import createMovieCardMarkup from '../../../templates/createMovieCardMarkup';
import createListMarkup from '../../../common/js/createListMarkup';
import { createPaginationBtnListMarkup } from '../../../components/pagination/pagination';

onfirstLoad();

async function onfirstLoad() {
  const res = await getMovies('trend');
  const trendingMovies = res.results;
  const listMarkup = createListMarkup(trendingMovies, createMovieCardMarkup);
  refs.moviesList.innerHTML = listMarkup;
  renderPagination(res.total_pages);
}

async function renderPagination(pages) {
  if (!pages || pages < 2) return (refs.pagination.innerHTML = ''); // TODO -  передивитись блок іф
  refs.pagination.innerHTML = createPaginationBtnListMarkup(pages);
}




// =========
// const PER_PAGE = 20;
// const pages = Math.ceil(trendingMovies.length / PER_PAGE);