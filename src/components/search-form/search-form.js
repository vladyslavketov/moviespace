import refs from '../../common/js/refs';
import { getMovies } from '../../api/api-tmdb';
import { renderMovies } from '../../layouts/sections/movies/movies';
import { renderPagination, showPagBtns } from '../../components/pagination/pagination';

// ===== addEventListeners ==================================================
refs.searchForm.addEventListener('submit', onFormSubmit);
refs.btnToTrends.addEventListener('click', onBtnClick);

// ===== On function ==================================================
async function onFormSubmit(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.searchQuery.value;
  if (!searchQuery) return;

  const searchRes = await getMovies('search', null, searchQuery, null);

  refs.pagination.setAttribute('data-type', 'search');
  refs.pagination.setAttribute('data-query', searchQuery);
  renderMovies(searchRes.results);
  renderPagination(searchRes.total_pages);
  showPagBtns();
  e.target.reset();
}

async function onBtnClick() {
  refs.pagination.setAttribute('data-type', 'trend');
  refs.pagination.removeAttribute('data-query');

  const trendRes = await getMovies('trend');
  renderMovies(trendRes.results);
  renderPagination(trendRes.total_pages);
}
