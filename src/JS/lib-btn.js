const watchedBtn = document.querySelector('.js-watched');
const queueBtn = document.querySelector('.js-queue');

watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);

function onWatchedBtnClick() {
  queueBtn.classList.remove('button--accent');
  watchedBtn.classList.add('button--accent');
}

function onQueueBtnClick() {
  watchedBtn.classList.remove('button--accent');
  queueBtn.classList.add('button--accent');
}

// add-to-watched/watched-btn
export { onWatchedBtnClick, onQueueBtnClick };