const e={addTo:document.querySelector(".modal_txt"),closeModalBtn:document.querySelector("[data-modal-close]"),backdrop:document.querySelector(".js-backdrop"),watchedBtn:document.querySelector(".button_card_add"),list:document.querySelector(".js-cards")};function t(){document.removeEventListener("keydown",n),document.body.classList.remove("show-modal")}function n(e){"Escape"===e.code&&t()}e.closeModalBtn.addEventListener("click",t),e.backdrop.addEventListener("click",(function(e){e.currentTarget===e.target&&t()})),e.list.addEventListener("click",(function(t){t.preventDefault();const a=t.target.closest(".js-card"),o=a.dataset.id;a&&(document.addEventListener("keydown",n),document.body.classList.add("show-modal"),function(e){return fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}(o).then((t=>{!function(t){const n=[];n.push(t);const a=n.map((({title:e,vote_average:t,vote_count:n,popularity:a,original_title:o,genres:s,overview:c,poster_path:i})=>`<img src="https://image.tmdb.org/t/p/w500${i}" alt="phonesize_image_movie" class="image_movie_card">\n                <div class="movie_card_info">\n                    <h1 class="movie_title_card_modal">${e}</h1>\n                    <div class="rates_info_card_movie">\n\n        <div class="rates_info_card_movie_titles">\n            <p class="rates_info_card_movie_titles_name">Vote / Votes</p> \n                    <p class="rates_info_card_movie_titles_name">Popularity</p> \n                    <p class="rates_info_card_movie_titles_name">Original Title</p> \n                    <p class="rates_info_card_movie_titles_name">Genre</p> \n\n        </div>\n                    \n<div class="rates_info_card_movie_datas">\n    <p class="votes_number_card"> <span class="span_votes_number_card">${t}</span>/${n}</p>\n                    <p class="votes_number_card">${a}</p>\n                    <p class="votes_number_card">${o}</p>\n                    <p class="votes_number_card">${s.map((e=>e.name)).slice(0,3)}</p>\n</div>\n                    \n\n                    </div>\n                  \n                    <h2 class="about-film-card-info">About</h2>\n\n                 <p class="description-movie-card"> ${c}</p>  \n                </div>`)).join("");e.addTo.innerHTML=a}(t)})))}));
//# sourceMappingURL=index.b3f4ef3e.js.map