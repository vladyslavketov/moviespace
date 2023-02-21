export default function createMovieDetailsMarkup(detailsRes, videoKey) {
  const { id, title, name, poster_path, release_date, firstDate, genres, } = detailsRes;
  const movieTitle = title || name;
  const movieImg = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const movieGenres = genres?.map(genr => genr.name).join(", ");
  const releaseDate = release_date ? release_date : firstDate;
  const year = releaseDate ? releaseDate.slice(0, 4) : '';
  
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
      <img
        class="movie-details__img"
        src=${movieImg}
        alt=${movieTitle}
      
      />
      <div class="movie-details__desc">
        <p class="movie-details__title">${movieTitle}</p>
        <p class="movie-details__desc-row movie-details__genres"><span>Genre</span>${movieGenres}</p>
        <p class="movie-details__desc-row movie-details__year"><span>Year</span>${year}</p>
        <button type="button" class="movie-details__video-play-btn" data-id=${id} aria-label="to open movie details">Show official trailer</button>
      </div>
      <div class="movie-details__video isHidden">${movieIframe}</div>
    </div>
  `;
}


// `width="448" height="672"`
// `width="336" height="504"`
// `width="368" height="552"`


// `width="332" height="498"`????