 

const refs = {
      openModalBtn: document.querySelector('[data-modal-open]'),
      addTo: document.querySelector(".modal_txt"),
     closeModalBtn: document.querySelector('[data-modal-close]'),
      backdrop: document.querySelector('.js-backdrop'),
    addBtn: document.querySelector(".button_card_add"), 
    list: document.querySelector('.js-cards')
}


// refs.openModalBtn.addEventListener('click', onOpenModal);
 refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick); 
//   refs.addBtn.addEventListener("click", addToLocalStorage)
refs.list.addEventListener('click', movieClick)


function movieClick(evt) {
    evt.preventDefault();

    // if (evt.target.nodeName !== 'IMG') {
    //     return;
    // }
   const selectedFilm = evt.target.closest('.js-card');
    const filmId = selectedFilm.dataset.id;
    console.log(filmId);
    
    if (selectedFilm) {
        onOpenModal();
        fetchOneMovie(filmId)
            .then(data => createMarkupCard(data))
    }
} 

function fetchOneMovie(filmId) {
    return fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`)
        .then(resp => {
             if (!resp.ok) {
                 throw new Error(resp.statusText);
             }
            return resp.json()
        })
  
}

// console.log( fetchOneMovie().then(data=>console.log(data)))

function onOpenModal() {
    document.addEventListener('keydown', onEscapeClick)
    document.body.classList.add('show-modal');
    // createMarkupCard();
}

function onCloseModal() {
    document.removeEventListener('keydown', onEscapeClick)
    document.body.classList.remove('show-modal');
}

function onBackdropClick(evt) {
    if (evt.currentTarget === evt.target) {
        onCloseModal();
    }
}

function onEscapeClick(evt) {
    if (evt.code === 'Escape') {
        onCloseModal();
    }
}


function createMarkupCard(data) {
    const arr = [];
    arr.push(data);
    const markup = arr.map(({ title, vote_average, vote_count, popularity, original_title, genres, overview, poster_path }) => {
        const genreList = genres.map(genre => genre.name);

     return `<img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="phonesize_image_movie" class="image_movie_card">
                <div class="movie_card_info">
                    <h1 class="movie_title_card_modal">${title}</h1>
                    <div class="rates_info_card_movie">

        <div class="rates_info_card_movie_titles">
            <p class="rates_info_card_movie_titles_name">Vote / Votes</p> 
                    <p class="rates_info_card_movie_titles_name">Popularity</p> 
                    <p class="rates_info_card_movie_titles_name">Original Title</p> 
                    <p class="rates_info_card_movie_titles_name">Genre</p> 

        </div>
                    
<div class="rates_info_card_movie_datas">
    <p class="votes_number_card"> <span class="span_votes_number_card">${vote_average}</span>/${vote_count}</p>
                    <p class="votes_number_card">${popularity}</p>
                    <p class="votes_number_card">${original_title}</p>
                    <p class="votes_number_card">${genreList}</p>
</div>
                    

                    </div>
                  
                    <h2 class="about-film-card-info">About</h2>

                 <p class="description-movie-card"> ${overview}</p>  
                </div>`}).join('');
    refs.addTo.innerHTML = markup;
}

// console.log(createMarkupCard());