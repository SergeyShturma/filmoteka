var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var s={id:e,exports:{}};return o[e]=s,n.call(s.exports,s,s.exports),s.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){t[e]=o},e.parcelRequired7c6=n),n.register("b2WXM",(function(e,o){const t=document.querySelector(".js-movie-modal-backdrop"),n=document.querySelector(".js-cards"),s=document.querySelector(".js-movie-modal");function i(){s.classList.add("is-hidden"),t.classList.add("is-hidden"),t.innerHTML="",document.body.style="overflow-y: overlay",document.removeEventListener("keydown",a)}function a(e){"Escape"===e.code&&i()}document.querySelector(".js-movie-modal-backdrop").addEventListener("click",i),n.addEventListener("click",(function(e){e.preventDefault();const o=e.target.closest(".js-card");console.log(o);const n=o.dataset.id;console.log(n),function(e){return fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}(n).then((e=>{!function(e){!function(e){const o=[];o.push(e);const t=o.map((({title:e,vote_average:o,vote_count:t,popularity:n,original_title:s,genres:i,overview:a,poster_path:d})=>`<div class="js-movie-modal__content">\n        <button class = "js-movie-modal__close-btn">\n        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M8 8L22 22" stroke="black" stroke-width="2"/>\n            <path d="M8 22L22 8" stroke="black" stroke-width="2"/>\n        </svg>              \n        </button>\n        <div class="js-movie-modal__poster">\n            <img class = "js-movie-modal__img" src="https://image.tmdb.org/t/p/w500${d}" alt="${e}">\n        </div>\n        <div class="movie-modal__info-about">\n            <h1 class="js-movie-modal__title">${e}</h1>\n    <div class="movie-modal__info">\n        <div class="movie-modal__info-name">\n            <p class="info-name">Vote / Votes</p>\n            <p class="info-name">Popularity</p>\n            <p class="info-name">Original Title</p>\n            <p class="info-name">Genre</p>\n        </div>\n        <div class="movie-modal__info-value">\n            <p class="js-info-value">\n                <span class="js-info-value__vote">${o}</span>&ensp;/&ensp; \n                <span class="js-info-value__votes">${t}</span>\n            </p>\n            <p class="js-info-value">${n}</p>\n            <p class="js-info-value">${s}</p>\n            <p class="js-info-value">${i.map((e=>e.name)).splice(0,3)}</p>\n        </div>\n    </div>\n    <h2 class="movie-modal__about">About </h2>\n    <p class="js-movie-modal__about-text">${a}</p>\n    <ul class = "movie-modal__btn-list">\n        <li class = "movie-modal__btn-list-item">\n            <button class="js-movie-modal__btn add-watched" type="button">add to Watched</button>\n        </li>\n        <li class = "movie-modal__btn-list-item">\n            <button class="js-movie-modal__btn add-queue" type="button">add to queue</button>\n        </li>\n    </ul>\n        </div>\n    </div>`)).join("");s.innerHTML=t}(e);document.querySelector(".js-movie-modal__close-btn").addEventListener("click",i),s.classList.remove("is-hidden"),t.classList.remove("is-hidden"),document.body.style="overflow-y: hidden",document.addEventListener("keydown",a),function(e){const o=JSON.parse(localStorage.getItem("movies-watched"))||[],t=JSON.parse(localStorage.getItem("movies-queue"))||[],n=document.querySelector(".add-watched"),s=document.querySelector(".add-queue");n.addEventListener("click",i),s.addEventListener("click",a),o.find((o=>o.id===e.id))&&(n.classList.add("js-remove-from"),n.textContent="remove from watched");t.find((o=>o.id===e.id))&&(s.classList.add("js-remove-from"),s.textContent="remove from queue");function i(){if(!o.find((o=>o.id===e.id))){o.push(e.id),localStorage.setItem("movies-watched",JSON.stringify(o));const t=n.classList.toggle("js-remove-from");return void(n.textContent=(t?"remove from":"add to")+" watched ")}const t=o.findIndex((o=>o.id===e.id));o.splice(t,1),localStorage.setItem("movies-watched",JSON.stringify(o));const s=n.classList.toggle("js-remove-from");n.textContent=(s?"remove from":"add to")+" watched "}function a(){if(!t.find((o=>o.id===e.id))){t.push(e.id),localStorage.setItem("movies-queue",JSON.stringify(t));const o=s.classList.toggle("js-remove-from");return void(s.textContent=(o?"remove from":"add to")+" queue ")}const o=t.findIndex((o=>o.id===e.id));t.splice(o,1),localStorage.setItem("movies-queue",JSON.stringify(t));const n=s.classList.toggle("js-remove-from");s.textContent=(n?"remove from":"add to")+" queue "}}(e)}(e)}))})),console.log(localStorage.length)})),n("b2WXM");
//# sourceMappingURL=index.be946643.js.map
