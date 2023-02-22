import { getMovies } from '../../../api/api-tmdb';
import refs from '../../../common/js/refs';
import createListMarkup from '../../../common/js/createListMarkup';
import createMovieCardMarkup from '../../../templates/createMovieCardMarkup';
import createMovieDetailsMarkup from '../../../templates/createMovieDetailsMarkup';
import { createPaginationBtnListMarkup } from '../../../components/pagination/pagination';
import { showLoader, hideLoader } from '../../../components/loader/loader';
import { openModal } from '../../../components/modal/modal';

import '../../../components/search-form/search-form';

let allGenresList = null;
onFirstLoad();

// ===== addEventListeners ==================================================
refs.moviesList.addEventListener('click', onMovieDetailsBtnClick);

// ===== On function ==================================================
async function onFirstLoad() {
  allGenresList = await getAllGenres();

  const trendRes = await getMovies('trend');
  const trendingMovies = trendRes.results;

  renderMovies(trendingMovies);
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

// ===== GET function ==================================================
async function getAllGenres() {
  const genresRes = await getMovies('genres');
  return genresRes.genres;
}

function getDataToRender(dataArray) {
  const moviesDataToRender = dataArray.map(data => {
    const {
      id,
      name,
      title,
      genre_ids,
      poster_path,
      release_date,
      first_air_date,
    } = data;
    const movieTitle = title || name;
    const genresNamesList = getGenresNames(genre_ids);
    const movieImg = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const releaseDate = release_date ? release_date : first_air_date;
    const releaseYear = releaseDate ? releaseDate.slice(0, 4) : '';

    return { id, movieTitle, movieImg, releaseYear, genresNamesList };
  });

  return moviesDataToRender;
}

function getGenresNames(genresIds) {
  const genresNames = genresIds
    .map(genreId => allGenresList.find(genre => genreId === genre.id)?.name)
    .filter(genreName => genreName !== undefined)
    .join(', ');

  return genresNames;
}

async function getMovieDetailsVideoKey(data) {
  const { results } = await data;
  if (!results || results.length < 1) return null;

  const officialTrailer = results.find(
    res => res.name.toLowerCase() === 'official trailer'
  );
  const anyTrailer = results.find(res =>
    res.name.toLowerCase().includes('trailer')
  );

  return officialTrailer?.key && anyTrailer?.key;
}

// ===== other function ==================================================
export function renderMovies(moviesData) {
  const dataToRender = getDataToRender(moviesData);
  const listMarkup = createListMarkup(dataToRender, createMovieCardMarkup);
  refs.moviesList.innerHTML = listMarkup;
}

async function renderPagination(pages) {
  if (!pages || pages < 2) return (refs.pagination.innerHTML = ''); // TODO -  передивитись блок іф
  refs.pagination.innerHTML = createPaginationBtnListMarkup(pages);
}

// =========
// const PER_PAGE = 20;
// const pages = Math.ceil(trendingMovies.length / PER_PAGE);