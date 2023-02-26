export default function createMovieCardMarkup(data) {
  const { id, movieTitle, movieImg, releaseYear, genresNamesList } = data;
 
  return `
    <li class="movie-card animate__animated animate__zoomIn">
      <img
        class="movie-card__img"
        src=${movieImg}
        alt=${movieTitle}
        width="300"
        height="450"
      />
      <div class="movie-card__desc">
        <div class="movie-card__title-wrap">
          <span class="movie-card__title">${movieTitle}</span>
          <span class="movie-card__year">(${releaseYear})</span>
        </div>
        <p class="movie-card__ganres">${genresNamesList}</p>
      </div>
      <button type="button" class="movie-card__details-btn" data-id=${id} aria-label="to open movie details"></button>
    </li>
  `;
}

// TODO - додати data-filter=${category}