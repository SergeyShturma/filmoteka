const API_KEY = '671c14eb1babf71c7ecd9b35ab5716a8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
const MOVIE_ID = '619930';

let genre = '';

const refs = {
    cardsArea: document.querySelector('.js-cards')
};

createTrendCardMarkup()

function getTrendingMovies() {
    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            } return resp.json()
        })
        
};


function createTrendCardMarkup() {
getTrendingMovies()
    .then(data => data.results)
    .then(cards => cards.map(card => { 
    console.log(card.genre_ids);    
      
    genre = card.genre_ids
        
        const cardMarkup = `<li class='js-card'>
    <img src="${IMG_BASE_URL}${card.poster_path}" alt="" class='js-card-img'>
    <p class='js-movie-title'>${card.title.toUpperCase()}</p>
    <p class='js-movie-descr'>${genre} | ${card.release_date.slice(0, 4)}
    <span class='js-movie-reiting'>${String(card.vote_average).slice(0, 3)}</span>
    </p>
    </li>`
    
        refs.cardsArea.insertAdjacentHTML('beforeend', cardMarkup)
    }))
    .catch(err => console.log(err));   
}
    
function getGenres() {
    return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            } return resp.json()
    })
    .catch(err => console.log(err))
}

getGenres()
    .then(r => r.genres)
    .then(data => console.log(data))
 
// function getSearchMovies() {
//     return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru
//     &page=1&include_adult=false`)
//     .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.statusText)
//             } return resp.json()
//     })
//     .catch(err => console.log(err))
// }

// console.log(getSearchMovies());

// function getMovieDetails() {
//     return fetch(`${BASE_URL}/movie/${MOVIE_ID}?api_key=${API_KEY}`)
//     .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.statusText)
//             } return resp.json()
//         })
// };

// getMovieDetails()
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// function getMovieVideos() {
//     return fetch(`${BASE_URL}/movie/619930/videos?api_key=${API_KEY}`)
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.statusText)
//             } return resp.json()
//         })
// }

// console.log(getMovieVideos());