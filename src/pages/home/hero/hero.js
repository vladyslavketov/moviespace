import { getMovies } from '../../../api/api-tmdb';
export async function setBgHero(dataArray) {
  const res2 = await getMovies('trend', 2);
  const res3 = await getMovies('trend', 3);
  const resData = res2.results.concat(dataArray).concat(res3.results);
  const heroBgImgRef = document.querySelector('div.hero__bg-img-list');

  const heroBgImgMarkup = resData
    .map(({ name, title, poster_path }) => {
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
    })
    .join('');
  heroBgImgRef.innerHTML = heroBgImgMarkup;
}
