const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const API_KEY = '671c14eb1babf71c7ecd9b35ab5716a8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
const MOVIE_ID = '619930';



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
    let movieGenres = []; 
    for (const genre of genres) {
    if (card.genre_ids.includes(genre.id)) {
            movieGenres.push(genre.name)
                }
    }
    if (movieGenres.length > 3) {
        movieGenres = [movieGenres.slice(0, 3),' ...other']
    }
    const cardMarkup = `<li class='js-card'>
    <img src="${IMG_BASE_URL}${card.poster_path}" alt="" class='js-card-img'>
    <p class='js-movie-title'>${card.title.toUpperCase()}</p>
    <div class='js-movie-descr'>
    <p>${movieGenres} | ${card.release_date.slice(0, 4)}</p>
    <span class='js-movie-reiting'>${String(card.vote_average).slice(0, 3)}</span>
    </div>
    </li>`
    
    refs.cardsArea.insertAdjacentHTML('beforeend', cardMarkup)
    }))
    .catch(err => console.log(err));   
}
    




// function getGenres() {
//     return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
//     .then(resp => {
//             if (!resp.ok) {
//                 throw new Error(resp.statusText)
//             } return resp.json()
//     })
//     .catch(err => console.log(err))
// }



      
// getTrendingMovies()
//     .then(data => data.results)  
//     .then(cards => cards.map(card => {
//     getGenres()
//     .then(r => r.genres)
//     .then(data => { 
//         movieGenres = [];
//         for (const value of data) {
//         if (card.genre_ids.includes(value.id)) {
//             movieGenres.push(value.name)
//                 } 
//             }
             
//         })
//     })).then(arr => console.log(arr))
   

    
    
    
    
    
    
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