import { getMovies } from '../../../api/api-tmdb';
import refs from '../../../common/js/refs';
import createListMarkup from '../../../common/js/createListMarkup';
import createMovieCardMarkup from '../../../templates/createMovieCardMarkup';
import createMovieDetailsMarkup from '../../../templates/createMovieDetailsMarkup';
import createMovieDetailsErrorMarkup from '../../../templates/createMovieDetailsErrorMarkup';

import { getCurrentPage, renderPagination, showPagBtns } from '../../../components/pagination/pagination';
import { showLoader, hideLoader } from '../../../components/loader/loader';
import { openModal } from '../../../components/modal/modal';

import '../../../components/search-form/search-form';
import setBtnDisabled from '../../../common/js/setBtnDisabled';
import setCurrentClass from '../../../common/js/setCurrentClass';
import { setBgHero } from '../../../pages/home/hero/hero';

let allGenresList = null;
let currentMoviesList = null;
onFirstLoad();

// ===== addEventListeners ==================================================
refs.moviesList.addEventListener('click', onMovieDetailsBtnClick);
refs.pagination?.addEventListener('click', onPaginationBtnClick);

// ===== On function ==================================================
export async function onFirstLoad() {
  allGenresList = await getAllGenres();
  const trendRes = await getMovies('trend');
  currentMoviesList = trendRes.results;

  await setBgHero(trendRes.results);
  
  if (trendRes.total_pages > 50) trendRes.total_pages = 50; // limit the NOP
  renderMovies(trendRes.results);
  renderPagination(trendRes.total_pages);
  showPagBtns(1);
  refs.pagination.setAttribute('data-type', 'trend');
  refs.pagination.setAttribute('data-currentpage', 1);
}

async function onMovieDetailsBtnClick(e) {
  if (!e.target.classList.contains('movie-card__details-btn')) return;
  showLoader();

  const currentMovieId = e.target.dataset.id;
  const detailsRes = await getMovies('details', null, null, currentMovieId).then(res => { return res.status ? res : null });
  const checkedMovieName = detailsRes ? checkMovieName(e, detailsRes) : null;
  let currentMovieData = detailsRes;
  let videoRes = null;
  
  if (!detailsRes || !checkedMovieName) {
    currentMovieData = currentMoviesList.find(item => item.id === Number(currentMovieId));
  } else {
    videoRes = await getMovies('video', null, null, currentMovieId);
  }

  const dataToRender = getDataToRender(currentMovieData);
  const videoKey = getMovieDetailsVideoKey(videoRes);
  
  const movieDetailsMarkup = createMovieDetailsMarkup(dataToRender, videoKey);
  refs.modal.innerHTML = movieDetailsMarkup;

  const movieDetailsPlayBtnRef = refs.modal.querySelector('.movie-details__video-play-btn');
  videoKey ? movieDetailsPlayBtnRef.addEventListener('click', onMovieDetailsPlayBtnClick) : movieDetailsPlayBtnRef.classList.add('isHidden'); // TODO - remove EventListener

  openModal();
  hideLoader();
}

function onMovieDetailsPlayBtnClick(e) {
  const movieDetailsVideoRef = refs.modal.querySelector(".movie-details__video");
  movieDetailsVideoRef.classList.toggle('isHidden');
  e.target.textContent === 'Show trailer'
    ? (e.target.textContent = 'Hide trailer')
    : (e.target.textContent = 'Show trailer');
}

async function onPaginationBtnClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  showLoader();
  refs.movieSection.scrollIntoView(true);

  const currentPage = getCurrentPage(e);
  const currentTypeOfQuery = refs.pagination.dataset.type;
  const currentSearchQuery = refs.pagination.dataset.query;
  const res = await getMovies(currentTypeOfQuery, currentPage, currentSearchQuery);

  currentMoviesList = res?.results;

  renderMovies(res.results);
  showPagBtns(Number(currentPage));
  setBtnDisabled('.paginationBtn', currentPage, e);
  setCurrentClass('.paginationBtn.current', currentPage, e);

  refs.pagination.setAttribute('data-currentpage', currentPage);
  hideLoader();
}

// ===== GET function ==================================================
async function getAllGenres() {
  const genresRes = await getMovies('genres');
  return genresRes.genres;
}

function getGenresNames(genresIds) {
  if (!genresIds || !genresIds.length) return 'Other';
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

    return {
      id,
      movieTitle,
      movieImg,
      releaseYear,
      genresNamesList
    };
  });

  return dataArrayToRender;
}

function getDataToRender(dataArray) {
  const {
    id,
    name,
    title,
    genres,
    genre_ids,
    poster_path,
    release_date,
    firstDate,
    first_air_date,
    vote_average,
    vote_count,
    overview,
  } = dataArray;

  const movieTitle = title || name;
  const genresNamesList = genres ? genres?.map(genr => genr.name).join(', ') : getGenresNames(genre_ids);
  const movieImg = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : './images/coming_soon.webp';
  const releaseDate = release_date
    ? release_date
    : firstDate
    ? firstDate
    : first_air_date;
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : '';
  const vote = vote_average.toFixed(1);

  return {
    id,
    movieTitle,
    movieImg,
    releaseYear,
    genresNamesList,
    vote,
    vote_count,
    overview,
  };
}

function getMovieDetailsVideoKey(data) {
  if (!data || !data.results || data.results.length < 1) return null;

  const { results } = data;
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

function checkMovieName(e, dataToCheck) {
  const currentTitle = e.target.parentElement.querySelector('.movie-card__title').textContent;
  const { name, title } = dataToCheck;
  const movieTitle = title || name;
  return (currentTitle !== movieTitle) ? false : true;
}