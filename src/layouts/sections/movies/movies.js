import { getMovies } from '../../../api/api-tmdb';
import refs from '../../../common/js/refs';
import createListMarkup from '../../../common/js/createListMarkup';
import createMovieCardMarkup from '../../../templates/createMovieCardMarkup';
import createMovieDetailsMarkup from '../../../templates/createMovieDetailsMarkup';
import { createPaginationBtnListMarkup } from '../../../components/pagination/pagination';

import { showLoader, hideLoader } from '../../../components/loader/loader';
import { openModal } from '../../../components/modal/modal';


onfirstLoad();

// ===== Вішаємо прослуховувачі кліків на кнопки "пагінації", "деталі проекту", "фільту" ================================================================================
refs.moviesList.addEventListener('click', onMovieDetailsBtnClick);

async function onfirstLoad() {
  const res = await getMovies('trend');
  const trendingMovies = res.results;
  const listMarkup = createListMarkup(trendingMovies, createMovieCardMarkup);
  refs.moviesList.innerHTML = listMarkup;
  renderPagination(res.total_pages);
  getGenres();
}

async function renderPagination(pages) {
  if (!pages || pages < 2) return (refs.pagination.innerHTML = ''); // TODO -  передивитись блок іф
  refs.pagination.innerHTML = createPaginationBtnListMarkup(pages);
}

async function onMovieDetailsBtnClick(e) {
  if (!e.target.classList.contains('movie-card__details-btn')) return;
  showLoader();
  const currentMovieId = e.target.dataset.id;
  const videoRes = getMovies('video', currentMovieId);
  const videoKey = await getMovieDetailsVideoKey(videoRes);
  const detailsRes = await getMovies('details', currentMovieId);

  const movieDetailsMarkup = createMovieDetailsMarkup(detailsRes, videoKey);
  refs.modal.innerHTML = movieDetailsMarkup;
  openModal();

  const movieDetailsPlayBtnRef = refs.modal.querySelector(".movie-details__video-play-btn");
  videoKey && movieDetailsPlayBtnRef.addEventListener('click', onMovieDetailsPlayBtnClick); // TODO - remove EventListener
  !videoKey && movieDetailsPlayBtnRef.classList.add('isHidden');

  hideLoader();
}

function onMovieDetailsPlayBtnClick(e) {
  const movieDetailsVideoRef = refs.modal.querySelector(".movie-details__video");
  movieDetailsVideoRef.classList.toggle('isHidden');
  e.target.textContent === 'Show official trailer'
    ? (e.target.textContent = 'Hide official trailer')
    : (e.target.textContent = 'Show official trailer');
}

async function getMovieDetailsVideoKey(data) {
  const { results } = await data;
  if (!results || results.length < 1) return null;

  const officialTrailer = results.find(res => (res.name.toLowerCase() === 'official trailer'));
  const anyTrailer = results.find(res => res.name.toLowerCase().includes('trailer'));

  return officialTrailer?.key && anyTrailer?.key;
}

async function getGenres(params) {
  const genresRes = await getMovies('genres');
  console.log(genresRes.genres);
}

// =========
// const PER_PAGE = 20;
// const pages = Math.ceil(trendingMovies.length / PER_PAGE);