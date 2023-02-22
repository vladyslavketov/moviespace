import { renderMovies } from "../../layouts/sections/movies/movies";
import { getMovies } from "../../api/api-tmdb";
import refs from "../../common/js/refs";

// ===== addEventListeners ==================================================
refs.searchForm.addEventListener('submit', onFormSubmit)

// ===== On function ==================================================
async function onFormSubmit(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.searchQuery.value;
  const searchRes = await getMovies('search', null, searchQuery);

  renderMovies(searchRes.results);
}