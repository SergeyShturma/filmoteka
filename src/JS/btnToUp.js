const btnToUp = document.querySelector('.btnToUp')
btnToUp.style.display = 'none';

document.addEventListener("scroll", () => {
        btnToUp.style.display = 'block';
})

