export default function createMovieDetailsMarkup(dataToRender, videoKey) {
  const {
    id,
    movieTitle,
    movieImg,
    releaseYear,
    genresNamesList,
    vote,
    vote_count,
    overview,
  } = dataToRender;

  const movieIframe = !videoKey
    ? ''
    : ` <iframe
          src="https://www.youtube.com/embed/${videoKey}?cc_load_policy=1?rel=0&showinfo=0&autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowfullscreen
          autoplay="0"
        ></iframe>`;

  return `
    <div class="movie-details animate__animated animate__zoomIn">
      <div class="movie-details__box">
        <img
          class="movie-details__img"
          src=${movieImg}
          alt=${movieTitle}
        />
        <ul class="movie-details__btns-list">
          <li class="movie-details__btns-item">
            <button type="button" class="movie-details__video-play-btn movie-details__btns" data-id=${id} aria-label="to open movie details">Show trailer</button>
          </li>
        </ul>
    </div>
    <div class="movie-details__box">
      <div class="movie-details__desc">
        <p class="movie-details__title">${movieTitle} <span>(${releaseYear})</span></p>
        <ul class="movie-details__desc-list">
          <li class="movie-details__desc-item">
            <span class="movie-details__desc-label">Vote / Votes:</span><span class="movie-details__desc-info"><span>${vote}</span> / <span>${vote_count}</span></span>
          </li>
          <li class="movie-details__desc-item">
            <span class="movie-details__desc-label">Genres:</span><span class="movie-details__desc-info">${genresNamesList}</span>
          </li>
            <li class="movie-details__desc-item">
            <span class="movie-details__desc-label">About:</span>
          </li>
        </ul>
        <span class="movie-details__desc-info">${overview}</span>
      </div>
    </div>
    <div class="movie-details__video isHidden">${movieIframe}</div>
  </div>
  `;
}