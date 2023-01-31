import nothingHereUrl from '../images/nothing.webp';
import { onWatchedBtnClick, onQueueBtnClick } from './lib-btn';

const refs = {
    cardsArea: document.querySelector('.js-cards'),
    watchedBtn: document.querySelector(`.js-watched`),
    queueBtn: document.querySelector(`.js-queue`)
}

// async function renderPageLibrary(event) {
//   event.preventDefault();

//   refs.watchedBtn.classList.remove('button--accent');
//   refs.queueBtn.classList.remove('button--accent');

  refs.watchedBtn.addEventListener(`click`, onWatchedBtn);
  refs.queueBtn.addEventListener(`click`, onQueueBtn);
// }



async function fetchById(id) {
  const responce = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`);
  const data = await responce.json();
  return data;
}
  
function onWatchedBtn(){
    console.log(`hello world`);
  document.querySelector('.js-cards').innerHTML = '';
    const parsedWathcedFilms = JSON.parse(localStorage.getItem('watchedMovies'));
    if (parsedWathcedFilms === null) {
        alert ( 'Your list is empty');
        return;
      } else {
        const arrLocalFilms = parsedWathcedFilms.map(id => {
          fetchById(id).then(res => {
            markup(res);
          });
        });
      }
}
function onQueueBtn() {
  
  document.querySelector('.js-cards').innerHTML = '';
  const parsedQueueFilms = JSON.parse(localStorage.getItem('queQueMovies'));

  if (parsedQueueFilms === null) {
    alert('You have to create a list first');
    return;
  } else {
    const arrLocalFilms = parsedQueueFilms.map(id => {
      return fetchById(id).then(res => {
        markup(res);
      });
    });
  }
}

// function renderAllList() {
//   document.querySelector('.js-cards').innerHTML = '';
//   let arrWatchId = [];
//   let arrQueueId = [];
//   if (load('watched')) {
//     arrWatchId = load('.js-watched');
//   }
//   if (load('queue')) {
//     arrQueueId = load('.js-queue');
//   }
//    const arrAllId = [...arrWatchId, ...arrQueueId];
//   if (arrWatchId.length === 0 && arrQueueId.length === 0) {
//     showBlankLibrary();
//   } else {
//     for (let id of arrAllId) {
//       fetchById(id).then(response => {
//         markup(response.data, id);
//       });
//     }
//   }
// }

// function showBlankLibrary() {
//   '.js-cards'.innerHTML = 
//     `
//   <li></li>
//   <li>
//    <a>
//       <p class="library__text"> There are no films yet !</p>
//       <img class="library__picture" src="${nothingHereUrl}" alt="blank cinema">
//     </a>
//     </li>
//   `;
//   pagination.style.display = 'none';
// }

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

