async function fetchById(id) {
  const responce = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=671c14eb1babf71c7ecd9b35ab5716a8`);
  const data = await responce.json();
  return data;
}
const refs = {
    cardsArea: document.querySelector('.js-cards'),
    watchedBtn: document.querySelector(`.js-watched`),
    queueBtn: document.querySelector(`.js-queue`)
}
refs.watchedBtn.addEventListener('click', onWatchedBtn);
refs.queueBtn.addEventListener('click', onQueueBtn);


function onWatchedBtn(){
      console.log(`hello world`);
      document.querySelector('.js-cards').innerHTML = '';
      const parsedWathcedFilms = JSON.parse(localStorage.getItem('movies-watched'));
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
    const parsedQueueFilms = JSON.parse(localStorage.getItem('movies-queue'));
  
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


function updateMarkup() {
  if (refs.watchedBtn.classList.contains('button--accent')) {
    cardsArea.innerHTML = '';
    const parsedWathcedFilms = JSON.parse(localStorage.getItem('movies-watched'));
    
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
