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
  console.log(selectedFilm);
  const filmId = selectedFilm.dataset.id;
  console.log(filmId);

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
                <span class="js-info-value__vote">${vote_average}</span>&ensp;/&ensp; 
                <span class="js-info-value__votes">${vote_count}</span>
            </p>
            <p class="js-info-value">${popularity}</p>
            <p class="js-info-value">${original_title}</p>
            <p class="js-info-value">${genreList.splice(0, 3)}</p>
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
console.log(localStorage.length);

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
      moviesWatched.push(data.id);
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
      moviesQueue.push(data.id);
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
