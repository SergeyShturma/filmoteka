import { Report } from 'notiflix';
import { spinnerPlay, spinnerStop } from './spinner';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const API_KEY = '671c14eb1babf71c7ecd9b35ab5716a8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
const MOVIE_ID = '619930';

const refs = {
  cardsArea: document.querySelector('.js-cards'),
  onloadMore: document.querySelector('.load-more-btn'),

  searchForm: document.querySelector(`.header__form`),
  clearTextContentInInput: document.querySelector('.js-input'),
};
refs.onloadMore.style.display = 'none';
let pageNum = 1;

renderTrendCardMarkup();

export function getTrendingMovies() {
  return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=ru
    &page=${pageNum}&include_adult=false`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(err => console.log(err));
}

async function getGenreNames() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  const genNames = await data.genres;
  return genNames;
}

async function renderTrendCardMarkup() {
  const genres = await getGenreNames();
  spinnerPlay();
  getTrendingMovies()
    .then(data => data.results)
    .then(cards =>
      cards.map(card => {
        const {
          genre_ids,
          poster_path,
          title,
          vote_average,
          release_date,
          id,
        } = card;
        let movieGenres = [];
        for (const genre of genres) {
          if (genre_ids.includes(genre.id)) {
            movieGenres.push(genre.name);
          }
          if (movieGenres.length > 3) {
            movieGenres = [...movieGenres.slice(0, 2), '...Other'];
          }
        }

        const cardMarkup = `<li class='js-card' data-id="${id}">
     <button type="button" class='js-on-card'>
     <img src="${IMG_BASE_URL}${poster_path}" alt="" class='js-card-img'>
     </button>
     <div class='js-movie-descr'>
     <p class='js-movie-title'>${title.toUpperCase()}</p>
     <div class='js-movie-genres'>
     <p>${movieGenres.join(", ")} | ${release_date.slice(0, 4)}</p>
     <span class='js-movie-reiting'>${String(vote_average).slice(0, 3)}</span>
     </div>
     </div>
     </li>`;

        refs.cardsArea.insertAdjacentHTML('beforeend', cardMarkup);
      })
    )
    .catch(err => console.log(err))
    .finally(() => {
      spinnerStop();
    });
}

function getSearchMovies() {
  return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru

    &page=${pageNum}&query=${searchQuery}&include_adult=false`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(err => console.log(err));
}

refs.searchForm.addEventListener(`submit`, onSearch);

let searchQuery = ``;
let page = 1;
const errorMessage = document.getElementById('header__error-message');

async function onSearch(evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.elements.searchQuery.value;
  page = 1;
  refs.cardsArea.innerHTML = '';
  console.log(searchQuery);
  if (!searchQuery) {
    errorMessage.classList.add('header__error-message');
    Notify.warning('Sorry, there is no result. Please try another keyword');
    
    setTimeout(function () {
      errorMessage.classList.remove('header__error-message');
    }, 5000);
    // alert('Please, enter your request');
   return;
  }
  await getSearchMovies().then(data => {
      if (data.total_results === 0) {
      errorMessage.classList.add('header__error-message');
      Notify.warning('Sorry, there is no result. Please try another keyword');
       return; 
      } 
      Notify.success(`We found for you ${searchQuery} movies`);
      creatMarkup();
    })
  // refs.clearTextContentInInput.value = '';
}

async function creatMarkup() {
  const genres = await getGenreNames();
  getSearchMovies()
    .then(data => data.results)
    .then(cards =>
      cards.map(card => {
        const {
          genre_ids,
          poster_path,
          title,
          vote_average,
          release_date,
          id,
        } = card;
        let movieGenres = [];
        for (const genre of genres) {
          if (genre_ids.includes(genre.id)) {
            movieGenres.push(genre.name);
          }
          if (movieGenres.length > 3) {
            movieGenres = [...movieGenres.slice(0, 2), '...Other'];
          }
        }

        const cardMarkup = `<li class='js-card' data-id="${id}">
     <button type="button" class='js-on-card'>
     <img src="${IMG_BASE_URL}${poster_path}" alt="" class='js-card-img'>
     </button>
     <div class='js-movie-descr'>
     <p class='js-movie-title'>${title.toUpperCase()}</p>
     <div class='js-movie-genres'>
     <p>${movieGenres.join(", ")} | ${release_date.slice(0, 4)}</p>
     <span class='js-movie-reiting'>${String(vote_average).slice(0, 3)}</span>
     </div>
     </div>
     </li>`;

        refs.cardsArea.insertAdjacentHTML('beforeend', cardMarkup);
      })
    )
    .catch(err => console.log(err));
}

function getMovieDetails() {
  return fetch(`${BASE_URL}/movie/${MOVIE_ID}?api_key=${API_KEY}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(err => console.log(err));
}

getMovieDetails()
  .then(data => data)
  .catch(err => console.log(err));

function getMovieVideos() {
  return fetch(`${BASE_URL}/movie/619930/videos?api_key=${API_KEY}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(err => console.log(err));
}

getMovieVideos()
  .then(data => data)
  .catch(err => console.log(err));

refs.onloadMore.addEventListener('click', onLoadMoreBtn);
setTimeout(() => {
  refs.onloadMore.style.display = 'block';
}, 2000);
function onLoadMoreBtn() {
  pageNum += 1;
  creatMarkup();
  renderTrendCardMarkup();
}
