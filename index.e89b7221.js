const e=document.querySelector(".btnToUp");e.style.display="none";const t=document.querySelector(".header");window.addEventListener("scroll",(function(){let t=document.documentElement.clientHeight;document.documentElement.scrollHeight,e.style.display="block",pageYOffset<t&&e.classList.add("arrow--show")})),e.addEventListener("click",(function(){var o;o=t,window.scroll({left:0,top:o.offsetTop,behavior:"smooth"}),setTimeout((()=>{e.style.display="none"}),1e3)}));
//# sourceMappingURL=index.e89b7221.js.map