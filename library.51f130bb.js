var e;"function"!=typeof(e=window.Element.prototype).matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,c=(t.document||t.ownerDocument).querySelectorAll(e),o=0;c[o]&&c[o]!==t;)++o;return Boolean(c[o])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null}),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".js-open-modal"),t=document.querySelector(".js-overlay-modal"),c=document.querySelectorAll(".js-modal-close");e.forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault();var c=this.getAttribute("data-modal");document.querySelector('.modal[data-modal="'+c+'"]').classList.add("active"),t.classList.add("active"),document.body.style.top=`-${window.scrollY}px`}))})),c.forEach((function(e){e.addEventListener("click",(function(e){this.closest(".modal").classList.remove("active"),t.classList.remove("active");const c=document.body.style.top;document.body.style.position="",document.body.style.top="",window.scrollTo(0,-1*parseInt(c||"0"))}))})),document.body.addEventListener("keyup",(function(e){27==e.keyCode&&(document.querySelector(".modal.active").classList.remove("active"),document.querySelector(".overlay").classList.remove("active"))}),!1),t.addEventListener("click",(function(){document.querySelector(".modal.active").classList.remove("active"),this.classList.remove("active")}))}));const t=document.querySelector("#theme-switch-toggle"),c="default-theme",o="dark-theme";function n(){document.body.classList.toggle(o),document.body.classList.toggle(c),document.body.classList.contains(c)?(t.setAttribute("checked",!1),localStorage.setItem("active-theme",c)):document.body.classList.contains(o)&&(t.setAttribute("checked",!0),localStorage.setItem("active-theme",o))}document.body.classList.add(c),t.addEventListener("change",n),localStorage.getItem("active-theme")===o&&n();const s=document.querySelector(".js-watched"),a=document.querySelector(".js-queue");s.addEventListener("click",(function(){a.classList.remove("button--accent"),s.classList.add("button--accent")})),a.addEventListener("click",(function(){s.classList.remove("button--accent"),a.classList.add("button--accent")}));const r={cardsArea:document.querySelector(".js-cards"),watchedBtn:document.querySelector(".js-watched"),queueBtn:document.querySelector(".js-queue")};async function i(e){const t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`);return await t.json()}function d(e){const{poster_path:t,title:c,id:o,release_date:n,genres:s,vote_average:a}=e,i=s.map((({name:e})=>e)).join(", "),d=`<li class='js-card' data-id="${o}">\n  <button type="button" class='js-on-card'>\n  <img src="https://image.tmdb.org/t/p/w500${t}" alt="" class='js-card-img'>\n  </button>\n  <div class='js-movie-descr'>\n  <p class='js-movie-title'>${c.toUpperCase()}</p>\n  <div class='js-movie-genres'>\n  <p>${i} | ${n.slice(0,4)}</p>\n  <span class='js-movie-reiting'>${String(a).slice(0,3)}</span>\n  </div>\n  </div>\n  </li>`;r.cardsArea.insertAdjacentHTML("beforeend",d)}r.watchedBtn.addEventListener("click",(function(){console.log("hello world"),document.querySelector(".js-cards").innerHTML="";const e=JSON.parse(localStorage.getItem("watchedMovies"));if(null===e)return void alert("Your list is empty");e.map((e=>{i(e).then((e=>{d(e)}))}))})),r.queueBtn.addEventListener("click",(function(){document.querySelector(".js-cards").innerHTML="";const e=JSON.parse(localStorage.getItem("queQueMovies"));if(null===e)return void alert("You have to create a list first");e.map((e=>i(e).then((e=>{d(e)}))))}));
//# sourceMappingURL=library.51f130bb.js.map
