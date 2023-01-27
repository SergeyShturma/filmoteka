const API_KEY = '671c14eb1babf71c7ecd9b35ab5716a8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
const MOVIE_ID = '619930';

const refs = {
    cardsArea: document.querySelector('.js-cards')
};

renderTrendCardMarkup()

function getTrendingMovies() {
    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            } return resp.json()
        })
        .catch(err => console.log(err));
};

async function getGenreNames() {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  const genNames = await data.genres
  return genNames
 
}

async function  renderTrendCardMarkup() {
const genres = await getGenreNames()
getTrendingMovies()
    .then(data => data.results)
    .then(cards => cards.map(card => { 
    const { genre_ids, poster_path, title, vote_average, release_date } = card;
    let movieGenres = []; 
    for (const genre of genres) {
    if (genre_ids.includes(genre.id)) {
            movieGenres.push(genre.name)
        }
    if (movieGenres.length > 3) {
        movieGenres = [...movieGenres.slice(0, 2), '...Other'];
        }
        }   
          
    const cardMarkup = `<li class='js-card'>
     <img src="${IMG_BASE_URL}${poster_path}" alt="" class='js-card-img'>
     <div class='js-movie-descr'>
     <p class='js-movie-title'>${title.toUpperCase()}</p>
     <div class='js-movie-genres'>
     <p>${movieGenres} | ${release_date.slice(0, 4)}</p>
     <span class='js-movie-reiting'>${String(vote_average).slice(0, 3)}</span>
     </div>
     </div>
     </li>`
    
    refs.cardsArea.insertAdjacentHTML('beforeend', cardMarkup)
    }))
    .catch(err => console.log(err));   
}

function getSearchMovies() {
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru
    &page=1&include_adult=false`)
    .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            } return resp.json()
        })
    .catch (err => console.log(err));
}



function getMovieDetails() {
    return fetch(`${BASE_URL}/movie/${MOVIE_ID}?api_key=${API_KEY}`)
    .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            } return resp.json()
    })
    .catch(err => console.log(err));
};

getMovieDetails()
    .then(data => data)
    .catch(err => console.log(err));

function getMovieVideos() {
    return fetch(`${BASE_URL}/movie/619930/videos?api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            } return resp.json()
        })
        .catch(err => console.log(err));
}

getMovieVideos()
    .then(data => data)
    .catch(err => console.log(err));