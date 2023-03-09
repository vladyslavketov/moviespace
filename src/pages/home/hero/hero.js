export function setBgHero(dataArray) {
  const heroBgImgRef = document.querySelector('div.hero__bg-img-list');
  const heroBgImgMarkup = dataArray.map(({ name, title, poster_path }) => {
    const movieTitle = title || name;
    const movieImg = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : './images/coming_soon.webp';

    return `
      <img
        class="hero__bg-img"
        src=${movieImg}
        alt=${movieTitle}
        width="60"
        height="90"
      />
    `;
  }).join('');
  heroBgImgRef.innerHTML = heroBgImgMarkup;
}