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

function movieClick(evt) {
  evt.preventDefault();

  const selectedFilm = evt.target.closest('.js-card');
  // console.log(selectedFilm);
  const filmId = selectedFilm.dataset.id;
  // console.log(filmId);

  fetchOneMovie(filmId).then(data => {
    // console.log(data);
    showModal(data);
  });
}

const backdrop = document.querySelector('.js-movie-modal-backdrop');
const list = document.querySelector('.js-cards');
const filmModal = document.querySelector('.js-movie-modal');
const filmModalbackdrop = document.querySelector('.js-movie-modal-backdrop');

filmModalbackdrop.addEventListener('click', closeModal);
list.addEventListener('click', movieClick);

function showBackdrop() {
  backdrop.classList.remove('is-hidden');
  document.body.style = `overflow-y: hidden`;
}

function closeBackdrop() {
  backdrop.classList.add('is-hidden');
  backdrop.innerHTML = '';
  document.body.style = `overflow-y: visible`;
}

function showModal(data) {
  renderModal(data);
  const closeBtn = document.querySelector('.js-movie-modal__close-btn');
  closeBtn.addEventListener('click', closeModal);
  filmModal.classList.remove('is-hidden');

  showBackdrop();
  document.addEventListener('keydown', onEscKeyPress);

  locStorage(data);
}

function closeModal() {
  filmModal.classList.add('is-hidden');

  closeBackdrop();
  document.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function renderModal(data) {
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
      }) => {
        const genreList = genres.map(genre => genre.name);

        return `<div class="js-movie-modal__content">
        <button class = "js-movie-modal__close-btn">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
            <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
        </svg>              
        </button>
        <div class="js-movie-modal__poster">
        
    <button class='btn-trailer' type='button' aria-label='play movie trailer'>
      <svg class='btn-trailer__svg' width='68' height='48' viewBox='0 0 68 48'>
        <path
          class='btn-trailer__path'
          d='M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z'
          fill='#212121'
        ></path>
        <path d='M 45,24 27,14 27,34' fill='#fff'></path>
      </svg>
    </button>

            <img class = "js-movie-modal__img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
        </div>
        <div class="movie-modal__info-about">
            <h1 class="js-movie-modal__title">${title}</h1>
    <div class="movie-modal__info">
        <div class="movie-modal__info-name">
            <p class="info-name">Vote / Votes</p>
            <p class="info-name">Popularity</p>
            <p class="info-name">Original Title</p>
            <p class="info-name">Genre</p>
        </div>
        <div class="movie-modal__info-value">
            <p class="js-info-value">
                <span class="js-info-value__vote">${vote_average.toFixed(1)}</span>&ensp;/&ensp; 
                <span class="js-info-value__votes">${vote_count}</span>
            </p>
            <p class="js-info-value">${Math.ceil(popularity)}</p>
            <p class="js-info-value">${original_title}</p>
            <p class="js-info-value">${genreList.splice(0, 3).join(', ')}</p>
        </div>
    </div>
    <h2 class="movie-modal__about">About </h2>
    <p class="js-movie-modal__about-text">${overview}</p>
    <ul class = "movie-modal__btn-list">
        <li class = "movie-modal__btn-list-item">
            <button class="js-movie-modal__btn add-watched" type="button">add to Watched</button>
        </li>
        <li class = "movie-modal__btn-list-item">
            <button class="js-movie-modal__btn add-queue" type="button">add to queue</button>
        </li>
    </ul>
        </div>
    </div>`;
      }
    )
    .join('');
  filmModal.innerHTML = markup;
}

// ------LOCAL STORAGE

function locStorage(data) {
  const moviesWatched =
    JSON.parse(localStorage.getItem('movies-watched')) || [];
  const moviesQueue = JSON.parse(localStorage.getItem('movies-queue')) || [];
  const addWatched = document.querySelector('.add-watched');
  const addQueue = document.querySelector('.add-queue');

  addWatched.addEventListener('click', onWatchedClick);
  addQueue.addEventListener('click', onQueueClick);

  if (moviesWatched.find(item => item.id === data.id)) {
    addWatched.classList.add('js-remove-from');
    addWatched.textContent = 'remove from watched';
  }

  if (moviesQueue.find(item => item.id === data.id)) {
    addQueue.classList.add('js-remove-from');
    addQueue.textContent = 'remove from queue';
  }

  function onWatchedClick() {
    if (!moviesWatched.find(item => item.id === data.id)) {
      moviesWatched.push(data);
      localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));

      const res = addWatched.classList.toggle('js-remove-from');
      addWatched.textContent = `${res ? 'remove from' : 'add to'} watched `;
      return;
    }

    const index = moviesWatched.findIndex(object => object.id === data.id);

    moviesWatched.splice(index, 1);
    localStorage.setItem('movies-watched', JSON.stringify(moviesWatched));

    const res = addWatched.classList.toggle('js-remove-from');
    addWatched.textContent = `${res ? 'remove from' : 'add to'} watched `;
  }

  function onQueueClick() {
    if (!moviesQueue.find(item => item.id === data.id)) {
      moviesQueue.push(data);
      localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));

      const res = addQueue.classList.toggle('js-remove-from');
      addQueue.textContent = `${res ? 'remove from' : 'add to'} queue `;
      return;
    }

    const index = moviesQueue.findIndex(object => object.id === data.id);

    moviesQueue.splice(index, 1);
    localStorage.setItem('movies-queue', JSON.stringify(moviesQueue));

    const res = addQueue.classList.toggle('js-remove-from');
    addQueue.textContent = `${res ? 'remove from' : 'add to'} queue `;
  }
}
