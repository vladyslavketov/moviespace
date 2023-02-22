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
        <p class="movie-card__title">${movieTitle}</p>
        <p class="movie-details__genres">${genresNamesList}</p>
        <p class="movie-card__year">${releaseYear}</p>
      </div>
      <button type="button" class="movie-card__details-btn" data-id=${id} aria-label="to open movie details"></button>
    </li>
  `;
}

// TODO - додати data-filter=${category}