const e={cardsArea:document.querySelector(".js-cards"),onloadMore:document.querySelector(".load-more-btn")};let t=1;async function a(){const a=await async function(){const e=await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=671c14eb1babf71c7ecd9b35ab5716a8&language=en-US"),t=await e.json();return await t.genres}();fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=671c14eb1babf71c7ecd9b35ab5716a8&language=ru\n    &page=${t}&include_adult=false`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).catch((e=>console.log(e))).then((e=>e.results)).then((t=>t.map((t=>{const{genre_ids:n,poster_path:o,title:s,vote_average:c,release_date:r,id:i}=t;let l=[];for(const e of a)n.includes(e.id)&&l.push(e.name),l.length>3&&(l=[...l.slice(0,2),"...Other"]);const d=`<li class='js-card' data-id="${i}">\n     <button type="button" class='js-on-card'>\n     <img src="https://image.tmdb.org/t/p/w500/${o}" alt="" class='js-card-img'>\n     </button>\n     <div class='js-movie-descr'>\n     <p class='js-movie-title'>${s.toUpperCase()}</p>\n     <div class='js-movie-genres'>\n     <p>${l} | ${r.slice(0,4)}</p>\n     <span class='js-movie-reiting'>${String(c).slice(0,3)}</span>\n     </div>\n     </div>\n     </li>`;e.cardsArea.insertAdjacentHTML("beforeend",d)})))).catch((e=>console.log(e)))}a(),fetch("https://api.themoviedb.org/3/movie/619930?api_key=671c14eb1babf71c7ecd9b35ab5716a8").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).catch((e=>console.log(e))).then((e=>e)).catch((e=>console.log(e))),fetch("https://api.themoviedb.org/3/movie/619930/videos?api_key=671c14eb1babf71c7ecd9b35ab5716a8").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).catch((e=>console.log(e))).then((e=>e)).catch((e=>console.log(e))),e.onloadMore.addEventListener("click",(function(){t+=1,a()}));
//# sourceMappingURL=index.c5c0ff92.js.map