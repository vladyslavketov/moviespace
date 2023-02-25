import { getMovies } from '../../../api/api-tmdb';
import refs from '../../../common/js/refs';
import createListMarkup from '../../../common/js/createListMarkup';
import createMovieCardMarkup from '../../../templates/createMovieCardMarkup';
import createMovieDetailsMarkup from '../../../templates/createMovieDetailsMarkup';
import createMovieDetailsErrorMarkup from '../../../templates/createMovieDetailsErrorMarkup';

import { createPaginationBtnListMarkup, getCurrentPage } from '../../../components/pagination/pagination';
import { showLoader, hideLoader } from '../../../components/loader/loader';
import { openModal } from '../../../components/modal/modal';

import '../../../components/search-form/search-form';
import setBtnDisabled from '../../../common/js/setBtnDisabled';
import setCurrentClass from '../../../common/js/setCurrentClass';
import { hideBtn } from '../../../components/pagination/pagination';

let allGenresList = null;
let currentCase = 'trend';
onFirstLoad();

// ===== addEventListeners ==================================================
refs.moviesList.addEventListener('click', onMovieDetailsBtnClick);
refs.pagination?.addEventListener('click', onPaginationBtnClick);

// ===== On function ==================================================
async function onFirstLoad() {
  allGenresList = await getAllGenres();
  const trendRes = await getMovies('trend');

  refs.pagination.setAttribute('data-case', 'trend');
  renderMovies(trendRes.results);
  renderPagination(trendRes.total_pages);
}

async function onMovieDetailsBtnClick(e) {
  if (!e.target.classList.contains('movie-card__details-btn')) return;
  showLoader();

  const currentMovieId = e.target.dataset.id;
  const detailsRes = await getMovies('details', null, null, currentMovieId).then(res => { return res.status ? res : null})
  const checkedMovieName = detailsRes ? checkMovieName(e, detailsRes) : null;

  if (detailsRes && checkedMovieName) {
    const dataToRender = getDataToRender(detailsRes);
    const videoRes = getMovies('video', null, null, currentMovieId);
    const videoKey = await getMovieDetailsVideoKey(videoRes);
    const movieDetailsMarkup = createMovieDetailsMarkup(dataToRender, videoKey);
    refs.modal.innerHTML = movieDetailsMarkup;

    const movieDetailsPlayBtnRef = refs.modal.querySelector('.movie-details__video-play-btn');
    videoKey ? movieDetailsPlayBtnRef.addEventListener('click', onMovieDetailsPlayBtnClick) : movieDetailsPlayBtnRef.classList.add('isHidden'); // TODO - remove EventListener
  } else {
    const movieDetailsMarkup = createMovieDetailsErrorMarkup();
    refs.modal.innerHTML = movieDetailsMarkup;
  }

  openModal();
  hideLoader();
}

function onMovieDetailsPlayBtnClick(e) {
  const movieDetailsVideoRef = refs.modal.querySelector(".movie-details__video");
  movieDetailsVideoRef.classList.toggle('isHidden');
  e.target.textContent === 'Show official trailer'
    ? (e.target.textContent = 'Hide official trailer')
    : (e.target.textContent = 'Show official trailer');
}

async function onPaginationBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  showLoader();
  const currentPage = getCurrentPage(e);
  const currentCase = refs.pagination.dataset.case;
  const currentQuery = refs.pagination.dataset.query;

  const res = await getMovies(currentCase, currentPage, currentQuery);
  renderMovies(res.results);

  hideBtn(e);
  setBtnDisabled(e, '.paginationBtn');
  setCurrentClass(e, '.paginationBtn.current');
  // renderContent(filterData, currentPage);
  hideLoader();
}

// ===== GET function ==================================================
async function getAllGenres() {
  const genresRes = await getMovies('genres');
  return genresRes.genres;
}

function getGenresNames(genresIds) {
  const genresNames = genresIds
    .map(genreId => allGenresList.find(genre => genreId === genre.id)?.name)
    .filter(genreName => genreName !== undefined)
    .join(', ');

  return genresNames;
}

function getDataArrayToRender(dataArray) {
  const dataArrayToRender = dataArray.map(data => {
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
    const movieImg = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : './images/coming_soon.webp';
    const releaseDate = release_date ? release_date : first_air_date;
    const releaseYear = releaseDate ? releaseDate.slice(0, 4) : '';

    return { id, movieTitle, movieImg, releaseYear, genresNamesList };
  });

  return dataArrayToRender;
}

function getDataToRender(dataArray) {
  const { id, name, title, genres, poster_path, release_date, firstDate } = dataArray;
  const movieTitle = title || name;
  const genresNamesList = genres?.map(genr => genr.name).join(', ');
  const movieImg = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : './images/coming_soon.webp';
  const releaseDate = release_date ? release_date : firstDate;
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : '';

  return { id, movieTitle, movieImg, releaseYear, genresNamesList }
}

async function getMovieDetailsVideoKey(data) {
  const { results } = await data;
  if (!results || results.length < 1) return null;

  const officialTrailer = results.find(res => res.name.toLowerCase() === 'official trailer');
  const anyTrailer = results.find(res => res.name.toLowerCase().includes('trailer'));
  const anyVideo = results[0];

  return officialTrailer?.key || anyTrailer?.key || anyVideo?.key
}

// ===== other function ==================================================
export function renderMovies(moviesData) {
  const dataArrayToRender = getDataArrayToRender(moviesData);
  const listMarkup = createListMarkup(dataArrayToRender, createMovieCardMarkup);
  refs.moviesList.innerHTML = listMarkup;
}

export async function renderPagination(pages) {
  if (!pages || pages < 2) return (refs.pagination.innerHTML = ''); // TODO -  передивитись блок іф
  refs.pagination.innerHTML = createPaginationBtnListMarkup(pages);
}

function checkMovieName(e, dataToCheck) {
  const currentTitle = e.target.parentElement.querySelector('.movie-card__title').textContent;
  const { name, title } = dataToCheck;
  const movieTitle = title || name;
  return (currentTitle !== movieTitle) ? false : true;
}


// const detailsRes = async function getdetailsRes() {
//   try {
//     const detailsRes = await getMovies('details', currentMovieId);
//     return detailsRes;
//   } catch (error) {
//     return error;
//   }
// };