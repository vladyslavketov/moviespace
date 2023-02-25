import { renderMovies, renderPagination } from "../../layouts/sections/movies/movies";
import { getMovies } from "../../api/api-tmdb";
import refs from "../../common/js/refs";

// ===== addEventListeners ==================================================
refs.searchForm.addEventListener('submit', onFormSubmit);
refs.btnToTrends.addEventListener('click', onBtnClick);

// ===== On function ==================================================
async function onFormSubmit(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.searchQuery.value;
  if (!searchQuery) return;

  const searchRes = await getMovies('search', null, searchQuery, null);
 
  refs.pagination.setAttribute('data-case', 'search');
  refs.pagination.setAttribute('data-query', searchQuery);
  renderMovies(searchRes.results);
  renderPagination(searchRes.total_pages);
}

async function onBtnClick() {
  refs.pagination.setAttribute('data-case', 'trend');
  refs.pagination.removeAttribute('data-query');

  const trendRes = await getMovies('trend');
  renderMovies(trendRes.results);
  renderPagination(trendRes.total_pages);
}