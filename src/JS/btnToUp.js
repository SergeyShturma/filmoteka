const btnToUp = document.querySelector('.btnToUp');
btnToUp.style.display = 'none';

function showArr() {
  let viewportHeight = document.documentElement.clientHeight;
  btnToUp.style.display = 'block';
  if (window.scrollY < 250) {
    btnToUp.style.display = 'none';
  }
  if (pageYOffset < viewportHeight) {
    btnToUp.classList.add('arrow--show');
  }
}

function scrollTo(e) {
  window.scroll({
    left: 0,
    top: e.offsetTop,
    behavior: 'smooth',
  });
}

const header = document.querySelector('.header');

window.addEventListener('scroll', showArr);

btnToUp.addEventListener('click', function () {
  scrollTo(header);
});
