function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},c={},s=t.parcelRequired7c6;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in c){var t=c[e];delete c[e];var s={id:e,exports:{}};return n[e]=s,t.call(s.exports,s,s.exports),s.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){c[e]=t},t.parcelRequired7c6=s),s("frew9"),s("jC1QG");const i=document.querySelector(".js-watched"),r=document.querySelector(".js-queue");i.addEventListener("click",(function(){r.classList.remove("button--accent"),i.classList.add("button--accent")})),r.addEventListener("click",(function(){i.classList.remove("button--accent"),r.classList.add("button--accent")}));var a=s("7Y9D8");async function o(e){const t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`);return await t.json()}s("iQIUW");const d={cardsArea:document.querySelector(".js-cards"),watchedBtn:document.querySelector(".js-watched"),queueBtn:document.querySelector(".js-queue")};function u(e){const{poster_path:t,title:n,id:c,release_date:s,genres:i,vote_average:r}=e,a=i.map((({name:e})=>e)).join(", "),o=`<li class='js-card' data-id="${c}">\n<button type="button" class='js-on-card'>\n<img src="https://image.tmdb.org/t/p/w500${t}" alt="" class='js-card-img'>\n</button>\n<div class='js-movie-descr'>\n<p class='js-movie-title'>${n.toUpperCase()}</p>\n<div class='js-movie-genres'>\n<p>${a} | ${s.slice(0,4)}</p>\n<span class='js-movie-reiting'>${String(r).slice(0,3)}</span>\n</div>\n</div>\n</li>`;d.cardsArea.insertAdjacentHTML("beforeend",o)}d.watchedBtn.addEventListener("click",(function(){document.querySelector(".js-cards").innerHTML="";const t=JSON.parse(localStorage.getItem("movies-watched"));if(null===t)return void e(a).Notify.failure("There is nothing in the Watch");t.map((e=>{o(e).then((e=>{u(e)}))}))})),d.queueBtn.addEventListener("click",(function(){document.querySelector(".js-cards").innerHTML="";const t=JSON.parse(localStorage.getItem("movies-queue"));if(null===t)return void e(a).Notify.failure("There is nothing in the Queue");t.map((e=>o(e).then((e=>{u(e)}))))})),s("b2WXM");
//# sourceMappingURL=library.33f9413a.js.map
