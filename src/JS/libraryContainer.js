import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

async function fetchById(id) {
  const responce = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`
  );
  const data = await responce.json();
  return data;
}
onWatchedBtn();
// const library = document.querySelector(`.header__list-link--accent`);
// library.addEventListener(`click`, onLibrary);
// function onLibrary() {
//   console.log(`hello`);
//   onWatchedBtn();
// }

const refs = {
  cardsArea: document.querySelector('.js-cards'),
  watchedBtn: document.querySelector(`.js-watched`),
  queueBtn: document.querySelector(`.js-queue`),
};
refs.watchedBtn.addEventListener('click', onWatchedBtn);
refs.queueBtn.addEventListener('click', onQueueBtn);

function onWatchedBtn() {
  document.querySelector('.js-cards').innerHTML = '';
  const parsedWathcedFilms = JSON.parse(localStorage.getItem('movies-watched'));
  if (!parsedWathcedFilms) {
    Notiflix.Notify.failure('There is nothing in the Watch');
    errorLibraryGiphy();
    return;
  } else {
    const arrLocalFilms = parsedWathcedFilms.map(data => {
      fetchById(data.id).then(res => {
        markup(res);
      });
    });
  }
}

function onQueueBtn() {
  document.querySelector('.js-cards').innerHTML = '';
  const parsedQueueFilms = JSON.parse(localStorage.getItem('movies-queue'));
  if (!parsedQueueFilms) {
    Notiflix.Notify.failure('There is nothing in the Queue');
    errorLibraryGiphy();
    return;
  } else {
    const arrLocalFilms = parsedQueueFilms.map(data => {
      return fetchById(data.id).then(res => {
        markup(res);
      });
    });
  }
}

function errorLibraryGiphy() {
  refs.cardsArea.innerHTML = `<div class="funny_wrapper"><iframe src="https://tenor.com/view/the-simpsons-homer-simpson-nothing-to-see-here-simpsons-bush-gif-16295909" frameBorder="0" class="funny gif-error" allowFullScreen></iframe>
    <span class="error-text">Nothing is here</span><a href="/library.html" class="btn-main__page">To main page</a></div>`;
  refs.watchedBtn.style.display = 'none';
  refs.queueBtn.style.display = 'none';
}

function updateMarkup() {
  if (refs.watchedBtn.classList.contains('button--accent')) {
    cardsArea.innerHTML = '';
    const parsedWathcedFilms = JSON.parse(
      localStorage.getItem('movies-watched')
    );

    const arrLocalFilms = parsedWathcedFilms.map(id => {
      return fetchById(id).then(res => {
        markup(res);
      });
    });
    return;
  }

  refs.cardsArea.innerHTML = '';
  const parsedQueueFilms = JSON.parse(localStorage.getItem('movies-queue'));
  const arrLocalFilms = parsedQueueFilms.map(filmId => {
    return fetchOneMovie(filmId).then(res => {
      markup(res);
    });
  });
}

function markup(res) {
  const { poster_path, title, id, release_date, genres, vote_average } = res;
  const movieGenres = genres.map(({ name }) => name).join(', ');
  const markup = `<li class='js-card' data-id="${id}">
<button type="button" class='js-on-card'>
<img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" class='js-card-img'>
</button>
<div class='js-movie-descr'>
<p class='js-movie-title'>${title.toUpperCase()}</p>
<div class='js-movie-genres'>
<p>${movieGenres} | ${release_date.slice(0, 4)}</p>
<span class='js-movie-reiting'>${String(vote_average).slice(0, 3)}</span>
</div>
</div>
</li>`;

  refs.cardsArea.insertAdjacentHTML('beforeend', markup);
}
