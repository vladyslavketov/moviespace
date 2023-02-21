var e={body:document.querySelector("body"),header:document.querySelector("header"),loader:document.querySelector(".loader"),modal:document.querySelector(".modal"),modalCloseBtn:document.querySelector(".backdrop .modal__close-btn"),pagination:document.querySelector("div.pagination"),btnUp:document.querySelector(".btn-up"),moviesList:document.querySelector(".movies__list")};function t(){e.body.classList.remove("isLoading"),e.loader.parentElement.classList.add("isHidden")}window.addEventListener("load",(()=>{window.scrollTo(0,0),t()})),window.addEventListener("scroll",(function(){const t=window.pageYOffset;t>40?(e.body.classList.add("isScrolling"),t>500?e.btnUp.classList.remove("isHidden"):t<=500&&e.btnUp.classList.add("isHidden")):t<=40&&e.body.classList.remove("isScrolling")})),e.btnUp.addEventListener("click",(function(){window.scrollTo(0,0)}));async function n(e,t,n){let i,a="";switch(e){case"search":i="search/movie",a=`&query=${n}`;break;case"details":i=`movie/${t}`;break;case"video":i=`movie/${t}/videos`;break;case"cast":i=`movie/${t}/credits`;break;case"reviews":i=`movie/${t}/reviews`;break;case"trend":i="trending/all/week";break;case"genres":i="genre/movie/list";break;default:console.log("Invalid typeOfQuery")}return fetch(`https://api.themoviedb.org/3/${i}?api_key=9cb79068ade378f45d510f1b7326cccd${a}`).then((e=>e.json()))}function i(e){const{id:t,title:n,name:i,poster_path:a,release_date:s,firstDate:o}=e,r=n||i,d=s||o;return`\n    <li class="movie-card animate__animated animate__zoomIn">\n      <img\n        class="movie-card__img"\n        src=${`https://image.tmdb.org/t/p/w500${a}`}\n        alt=${r}\n        width="300"\n        height="450"\n      />\n      <div class="movie-card__desc">\n        <p class="movie-card__title">${r}</p>\n        <p class="movie-details__genres">rock</p>\n        <p class="movie-card__year">${d?d.slice(0,4):""}</p>\n      </div>\n      <button type="button" class="movie-card__details-btn" data-id=${t} aria-label="to open movie details"></button>\n    </li>\n  `}function a(e,t){const{id:n,title:i,name:a,poster_path:s,release_date:o,firstDate:r,genres:d}=e,l=i||a,c=`https://image.tmdb.org/t/p/w500${s}`,m=d?.map((e=>e.name)).join(", "),v=o||r;return`\n    <div class="movie-details animate__animated animate__zoomIn">\n      <img\n        class="movie-details__img"\n        src=${c}\n        alt=${l}\n      \n      />\n      <div class="movie-details__desc">\n        <p class="movie-details__title">${l}</p>\n        <p class="movie-details__desc-row movie-details__genres"><span>Genre</span>${m}</p>\n        <p class="movie-details__desc-row movie-details__year"><span>Year</span>${v?v.slice(0,4):""}</p>\n        <button type="button" class="movie-details__video-play-btn" data-id=${n} aria-label="to open movie details">Show official trailer</button>\n      </div>\n      <div class="movie-details__video isHidden">${t?` <iframe\n          src="https://www.youtube.com/embed/${t}?cc_load_policy=1?rel=0&showinfo=0&autoplay=1"\n          title="YouTube video player"\n          frameborder="0"\n          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"\n          allowfullscreen\n          autoplay="0"\n        ></iframe>`:""}</div>\n    </div>\n  `}function s(e){let t="";return 1===e&&(t="current"),`\n    <button class="paginationBtn ${t}" data-page="${e}" aria-label="to open page number ${e}">${e}</button>\n  `}function o(e){if(e<2)return"";let t=[];for(let n=0;n<e;n+=1)t.push(n+1);return t.map((e=>s(e))).join("")}const r=e.modal.parentElement;function d(e){e.currentTarget===e.target&&c()}function l(e){r.classList.contains("isHidden")||"Escape"===e.code&&c()}function c(){r.classList.add("isHidden"),e.body.classList.remove("modalIsOpen"),e.modal.innerHTML="",r.removeEventListener("click",d),window.removeEventListener("keydown",l),e.modalCloseBtn.removeEventListener("click",c)}function m(t){e.modal.querySelector(".movie-details__video").classList.toggle("isHidden"),"Show official trailer"===t.target.textContent?t.target.textContent="Hide official trailer":t.target.textContent="Show official trailer"}!async function(){const t=await n("trend"),a=(s=t.results,r=i,!Array.isArray(s)||!s.length>0?"Нажаль данні не завантажились( Спробуйте пізніше":s.map((e=>r(e))).join(""));var s,r;e.moviesList.innerHTML=a,async function(t){if(!t||t<2)return e.pagination.innerHTML="";e.pagination.innerHTML=o(t)}(t.total_pages),async function(e){const t=await n("genres");console.log(t.genres)}()}(),e.moviesList.addEventListener("click",(async function(i){if(!i.target.classList.contains("movie-card__details-btn"))return;e.body.classList.add("isLoading"),e.loader.parentElement.classList.remove("isHidden");const s=i.target.dataset.id,o=n("video",s),v=await async function(e){const{results:t}=await e;if(!t||t.length<1)return null;const n=t.find((e=>"official trailer"===e.name.toLowerCase())),i=t.find((e=>e.name.toLowerCase().includes("trailer")));return n?.key&&i?.key}(o),u=a(await n("details",s),v);e.modal.innerHTML=u,r.classList.remove("isHidden"),e.body.classList.add("modalIsOpen"),r.addEventListener("click",d),window.addEventListener("keydown",l),e.modalCloseBtn.addEventListener("click",c);const p=e.modal.querySelector(".movie-details__video-play-btn");v&&p.addEventListener("click",m),!v&&p.classList.add("isHidden"),t()}));
//# sourceMappingURL=index.8454273b.js.map