// // document.addEventListener('scroll', () => {
// //   btnToUp.style.display = 'block';
// // });

const btnToUp = document.querySelector('.btnToUp');
btnToUp.style.display = 'none';

function showArr() {
  let viewportHeight = document.documentElement.clientHeight;
  let htmlHeight = document.documentElement.scrollHeight;
  btnToUp.style.display = 'block';
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
  setTimeout(() => {
    btnToUp.style.display = 'none';
  }, 1000);
});
