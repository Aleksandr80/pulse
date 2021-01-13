// Карусель слайдер на основе JQ плагина Slick
//$(document).ready(function(){
//     $('.carousel__inner').slick({
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         speed: 1200,
//         // adaptiveHeight: true,
//         // JS работает непосредственно на странице и поэтому ему путь прописывать нужно как для страницы с которой запущен скрипт
//         // prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     arrows: false,
//                     dots: true
//                 }
//             }
//         ]
//         // autoplay: true,
//         // autoplaySpeed: 2000
//         // Эффект проявления слайда
//         // fade: true,
//         // cssEase: 'linear'
//       });
//   });

// Слайдер на основе JS на tiny-slider
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    speed: 1200,
    // Переключение слайда мышкой
    mouseDrag: true,
    // Убираем точки меню навигации (dots)
    nav: false,
    responsive: {
        320: {
            nav: true,
            navPosition: 'bottom'
        },
        992: {
          nav: false
        }
    }
    // controlsText: [
    //     '<img src="icons/left.svg"></img>',
    //     '<img src="icons/right.svg"></img>'
    // ]
});

// document.querySelector('.prev').onclick = function () {
//     slider.goTo('prev');
//   };

// Более современная запись кода выше
document.querySelector('.prev').addEventListener('click',function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click',function () {
    slider.goTo('next');
});

// window.addEventListener('DOMContentLoaded', () => {
//     const menu = document.querySelector('.menu'),
//     menuItem = document.querySelectorAll('.menu_item'),
//     hamburger = document.querySelector('.hamburger');

//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('hamburger_active');
//         menu.classList.toggle('menu_active');
//     });

//     menuItem.forEach(item => {
//         item.addEventListener('click', () => {
//             hamburger.classList.toggle('hamburger_active');
//             menu.classList.toggle('menu_active');
//         })
//     })
// })