var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var s={id:e,exports:{}};return t[e]=s,n.call(s.exports,s,s.exports),s.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n),n.register("b2WXM",(function(e,t){const o=document.querySelector(".js-movie-modal-backdrop"),n=document.querySelector(".js-cards"),s=document.querySelector(".js-movie-modal");function i(){s.classList.add("is-hidden"),o.classList.add("is-hidden"),o.innerHTML="",document.body.style="overflow-y: visible",document.removeEventListener("keydown",d)}function d(e){"Escape"===e.code&&i()}document.querySelector(".js-movie-modal-backdrop").addEventListener("click",i),n.addEventListener("click",(function(e){e.preventDefault(),function(e){return fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}(e.target.closest(".js-card").dataset.id).then((e=>{!function(e){!function(e){const t=[];t.push(e);const o=t.map((({title:e,vote_average:t,vote_count:o,popularity:n,original_title:s,genres:i,overview:d,poster_path:a})=>{const l=i.map((e=>e.name));return`<div class="js-movie-modal__content">\n        <button class = "js-movie-modal__close-btn">\n        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M8 8L22 22" stroke="black" stroke-width="2"/>\n            <path d="M8 22L22 8" stroke="black" stroke-width="2"/>\n        </svg>              \n        </button>\n        <div class="js-movie-modal__poster">\n            <img class = "js-movie-modal__img" src="https://image.tmdb.org/t/p/w500${a}" alt="${e}">\n        </div>\n        <div class="movie-modal__info-about">\n            <h1 class="js-movie-modal__title">${e}</h1>\n    <div class="movie-modal__info">\n        <div class="movie-modal__info-name">\n            <p class="info-name">Vote / Votes</p>\n            <p class="info-name">Popularity</p>\n            <p class="info-name">Original Title</p>\n            <p class="info-name">Genre</p>\n        </div>\n        <div class="movie-modal__info-value">\n            <p class="js-info-value">\n                <span class="js-info-value__vote">${t.toFixed(1)}</span>&ensp;/&ensp; \n                <span class="js-info-value__votes">${o}</span>\n            </p>\n            <p class="js-info-value">${Math.ceil(n)}</p>\n            <p class="js-info-value">${s}</p>\n            <p class="js-info-value">${l.splice(0,3).join(", ")}</p>\n        </div>\n    </div>\n    <h2 class="movie-modal__about">About </h2>\n    <p class="js-movie-modal__about-text">${d}</p>\n    <ul class = "movie-modal__btn-list">\n        <li class = "movie-modal__btn-list-item">\n            <button class="js-movie-modal__btn add-watched" type="button">add to Watched</button>\n        </li>\n        <li class = "movie-modal__btn-list-item">\n            <button class="js-movie-modal__btn add-queue" type="button">add to queue</button>\n        </li>\n    </ul>\n        </div>\n    </div>`})).join("");s.innerHTML=o}(e);document.querySelector(".js-movie-modal__close-btn").addEventListener("click",i),s.classList.remove("is-hidden"),o.classList.remove("is-hidden"),document.body.style="overflow-y: hidden",document.addEventListener("keydown",d),function(e){const t=JSON.parse(localStorage.getItem("movies-watched"))||[],o=JSON.parse(localStorage.getItem("movies-queue"))||[],n=document.querySelector(".add-watched"),s=document.querySelector(".add-queue");n.addEventListener("click",i),s.addEventListener("click",d),t.find((t=>t.id===e.id))&&(n.classList.add("js-remove-from"),n.textContent="remove from watched");o.find((t=>t.id===e.id))&&(s.classList.add("js-remove-from"),s.textContent="remove from queue");function i(){if(!t.find((t=>t.id===e.id))){t.push(e.id),localStorage.setItem("movies-watched",JSON.stringify(t));const o=n.classList.toggle("js-remove-from");return void(n.textContent=(o?"remove from":"add to")+" watched ")}const o=t.findIndex((t=>t.id===e.id));t.splice(o,1),localStorage.setItem("movies-watched",JSON.stringify(t));const s=n.classList.toggle("js-remove-from");n.textContent=(s?"remove from":"add to")+" watched "}function d(){if(!o.find((t=>t.id===e.id))){o.push(e.id),localStorage.setItem("movies-queue",JSON.stringify(o));const t=s.classList.toggle("js-remove-from");return void(s.textContent=(t?"remove from":"add to")+" queue ")}const t=o.findIndex((t=>t.id===e.id));o.splice(t,1),localStorage.setItem("movies-queue",JSON.stringify(o));const n=s.classList.toggle("js-remove-from");s.textContent=(n?"remove from":"add to")+" queue "}}(e)}(e)}))}))})),n("b2WXM");
//# sourceMappingURL=index.66a7f779.js.map
