const refs = {
  addTo: document.querySelector('.modal_txt'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  backdrop: document.querySelector('.js-backdrop'),
  watchedBtn: document.querySelector('.watched-btn'),
  list: document.querySelector('.js-cards'),
  quequeBtn: document.querySelector('.quequeBtn'),
};

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);
refs.watchedBtn.addEventListener('click', addToLocalStorage);
refs.list.addEventListener('click', movieClick);
refs.quequeBtn.addEventListener('click', addToQueQueStorage);

function movieClick(evt) {
  evt.preventDefault();

  const selectedFilm = evt.target.closest('.js-card');
  const filmId = selectedFilm.dataset.id;

  if (selectedFilm) {
    onOpenModal();
    fetchOneMovie(filmId).then(data => {
      createMarkupCard(data);
    });
  }
}

function fetchOneMovie(filmId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function onOpenModal() {
  document.addEventListener('keydown', onEscapeClick);
  document.body.classList.add('show-modal');
  // createMarkupCard();
  // document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
}

function onCloseModal() {
  document.removeEventListener('keydown', onEscapeClick);
  document.body.classList.remove('show-modal');
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
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
  const markup = arr
    .map(
      ({
        title,
        vote_average,
        vote_count,
        popularity,
        original_title,
        genres,
        overview,
        poster_path,
        id,
      }) => {
        const genreList = genres.map(genre => genre.name);

        return `<img src="https://image.tmdb.org/t/p/w500${poster_path}" data-id="${id}" alt="phonesize_image_movie" class="image_movie_card">

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
    <p class="votes_number_card"> <span class="span_votes_number_card">${String(
      vote_average
    ).slice(0, 3)}</span>/${vote_count}</p>
                    <p class="votes_number_card">${Math.ceil(popularity)}</p>
                    <p class="votes_number_card">${original_title}</p>
                    <p class="votes_number_card">${genreList.slice(0, 3)}</p>
</div>
                    

                    </div>
                  
                    <h2 class="about-film-card-info">About</h2>

                 <p class="description-movie-card"> ${overview}</p>  

                </div>`;
      }
    )
    .join('');
  refs.addTo.innerHTML = markup;
  refs.watchedBtn.textContent = 'Add to watched';
}

const arrayOfWatchedMovies = [];
const arrayOfQueQue = [];

function addToLocalStorage() {
  const imageEl = document.querySelector('.image_movie_card');
  const idFilmUnique = Number(imageEl.dataset.id);

  if (arrayOfWatchedMovies.includes(idFilmUnique)) {
    refs.watchedBtn.textContent = 'Add to watched';
    const filmIndex = arrayOfWatchedMovies.indexOf(idFilmUnique);
    const removeFilm = arrayOfWatchedMovies.splice(filmIndex, 1);

    localStorage.removeItem('watchedMovies');

    return;
  }

  refs.watchedBtn.textContent = 'remove';

  arrayOfWatchedMovies.push(idFilmUnique);
  localStorage.setItem('watchedMovies', JSON.stringify(arrayOfWatchedMovies));
}

function addToQueQueStorage() {
  const imageEl = document.querySelector('.image_movie_card');
  const idQueQue = Number(imageEl.dataset.id);

  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  // console.log(JSON.parse(watchedMovies));

  if (arrayOfQueQue.includes(idQueQue)) {
    return;
  }

  arrayOfQueQue.push(idQueQue);
  localStorage.setItem('queQueMovies', JSON.stringify(arrayOfQueQue));
}
