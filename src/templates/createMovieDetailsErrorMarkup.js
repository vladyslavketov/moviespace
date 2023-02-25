export default function createMovieDetailsErrorMarkup() {
  return `
    <div class="movie-details animate__animated animate__zoomIn">
      <img
        class="movie-details__img"
        src='./images/coming_soon.webp'
        alt='Error image'
      />
      <div class="movie-details__desc">
        <p class="movie-details__title">Ooops! Sorry, but we dont find information</p>
      </div>
    </div>
  `;
}