function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},s=n.parcelRequired7c6;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var s={id:e,exports:{}};return t[e]=s,n.call(s.exports,s,s.exports),s.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},n.parcelRequired7c6=s),s("frew9"),s("jC1QG");const i=document.querySelector(".js-watched"),a=document.querySelector(".js-queue");i.addEventListener("click",(function(){a.classList.remove("button--accent"),i.classList.add("button--accent")})),a.addEventListener("click",(function(){i.classList.remove("button--accent"),a.classList.add("button--accent")}));var c=s("7Y9D8");async function l(e){const n=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`);return await n.json()}s("iQIUW");const d={cardsArea:document.querySelector(".js-cards"),watchedBtn:document.querySelector(".js-watched"),queueBtn:document.querySelector(".js-queue")};d.watchedBtn.addEventListener("click",(function(){document.querySelector(".js-cards").innerHTML="";const n=JSON.parse(localStorage.getItem("movies-watched"));if(null===n)return e(c).Notify.failure("There is nothing in the Watch"),void r.classList.add("error_funny");n.map((e=>{l(e).then((e=>{u(e)}))}))})),d.queueBtn.addEventListener("click",(function(){document.querySelector(".js-cards").innerHTML="";const n=JSON.parse(localStorage.getItem("movies-queue"));if(null===n)return e(c).Notify.failure("There is nothing in the Queue"),void r.classList.add("error_funny");n.map((e=>l(e).then((e=>{u(e)}))))}));const r=document.getElementById("error_funny");function u(e){const{poster_path:n,title:t,id:o,release_date:s,genres:i,vote_average:a}=e,c=i.map((({name:e})=>e)).join(", "),l=`<li class='js-card' data-id="${o}">\n<button type="button" class='js-on-card'>\n<img src="https://image.tmdb.org/t/p/w500${n}" alt="" class='js-card-img'>\n</button>\n<div class='js-movie-descr'>\n<p class='js-movie-title'>${t.toUpperCase()}</p>\n<div class='js-movie-genres'>\n<p>${c} | ${s.slice(0,4)}</p>\n<span class='js-movie-reiting'>${String(a).slice(0,3)}</span>\n</div>\n</div>\n</li>`;d.cardsArea.insertAdjacentHTML("beforeend",l)}s("b2WXM");const m=document.querySelector(".js-movie-modal-backdrop"),v=document.querySelector(".js-cards"),p=document.querySelector(".js-movie-modal");function f(){p.classList.add("is-hidden"),m.classList.add("is-hidden"),m.innerHTML="",document.body.style="overflow-y: visible",document.removeEventListener("keydown",_)}function _(e){"Escape"===e.code&&f()}document.querySelector(".js-movie-modal-backdrop").addEventListener("click",f),v.addEventListener("click",(function(e){e.preventDefault();const n=e.target.closest(".js-card");console.log(n);const t=n.dataset.id;console.log(t),function(e){return fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}(t).then((e=>{!function(e){!function(e){const n=[];n.push(e);const t=n.map((({title:e,vote_average:n,vote_count:t,popularity:o,original_title:s,genres:i,overview:a,poster_path:c})=>`<div class="js-movie-modal__content">\n          <button class = "js-movie-modal__close-btn">\n          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n              <path d="M8 8L22 22" stroke="black" stroke-width="2"/>\n              <path d="M8 22L22 8" stroke="black" stroke-width="2"/>\n          </svg>              \n          </button>\n          <div class="js-movie-modal__poster">\n              <img class = "js-movie-modal__img" src="https://image.tmdb.org/t/p/w500${c}" alt="${e}">\n          </div>\n          <div class="movie-modal__info-about">\n              <h1 class="js-movie-modal__title">${e}</h1>\n      <div class="movie-modal__info">\n          <div class="movie-modal__info-name">\n              <p class="info-name">Vote / Votes</p>\n              <p class="info-name">Popularity</p>\n              <p class="info-name">Original Title</p>\n              <p class="info-name">Genre</p>\n          </div>\n          <div class="movie-modal__info-value">\n              <p class="js-info-value">\n                  <span class="js-info-value__vote">${n}</span>&ensp;/&ensp; \n                  <span class="js-info-value__votes">${t}</span>\n              </p>\n              <p class="js-info-value">${o}</p>\n              <p class="js-info-value">${s}</p>\n              <p class="js-info-value">${i.map((e=>e.name)).splice(0,3)}</p>\n          </div>\n      </div>\n      <h2 class="movie-modal__about">About </h2>\n      <p class="js-movie-modal__about-text">${a}</p>\n      <ul class = "movie-modal__btn-list">\n          <li class = "movie-modal__btn-list-item">\n              <button class="js-movie-modal__btn remove-watched" type="button">remove from Watched</button>\n          </li>\n          <li class = "movie-modal__btn-list-item">\n              <button class="js-movie-modal__btn remove-queue" type="button">remove from queue</button>\n          </li>\n      </ul>\n          </div>\n      </div>`)).join("");p.innerHTML=t}(e);document.querySelector(".js-movie-modal__close-btn").addEventListener("click",f),p.classList.remove("is-hidden"),m.classList.remove("is-hidden"),document.body.style="overflow-y: hidden",document.addEventListener("keydown",_)}(e)}))}));const b=document.querySelector(".remove-watched"),h=document.querySelector(".remove-queue");b.addEventListener("click",(function(){console.log("hello world")})),h.addEventListener("click",onRemoveQueueBtnClick);
//# sourceMappingURL=library.5da1fe76.js.map
