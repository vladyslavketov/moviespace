export default function createMovieCardMarkup(data) {
  const { id, title, name, poster_path, release_date, firstDate } = data;
  const movieTitle = title || name;
  const movieImg = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const movieCategory = 'rock';
  const releaseDate = release_date ? release_date : firstDate;
  const year = releaseDate ? releaseDate.slice(0, 4) : '';

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
        <p class="movie-card__category">${movieCategory}</p>
        <p class="movie-card__year">${year}</p>
      </div>
      <button type="button" class="movie-details__btn" data-id=${id} aria-label="to open movie details"></button>
    </li>
  `;
}

// TODO - додати data-filter=${category}