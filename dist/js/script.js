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
            nav: false,
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


// Делаем переключение табов на jquery
$(document).ready(function(){
$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
    .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
    .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

// Делаем переключение по ссылкам Подробнее и Назад
// $('.catalog-item__link').each(function(i) {
//     $(this).on('click', function(e) {
//         // Очищаем поведение браузера по умолчанию по отношению к ссылке 
//         e.preventDefault();
//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
//     })
// })

// $('.catalog-item__back').each(function(i) {
//     $(this).on('click', function(e) {
//         // Очищаем поведение браузера по умолчанию по отношению к ссылке 
//         e.preventDefault();
//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
//     })
// })

// Оптимизируем код переключение контента выше
function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            // Очищаем поведение браузера по умолчанию по отношению к ссылке 
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })
}

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

//Modal 
// Для красивого анимированного скрытия элементов со страницы исп. fadeOut
// $('[data-modal=consultation]').fadeOut();

    $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    // $('.button_mini').on('click', function(){
    //     $('.overlay, #order').fadeIn('slow');
    // });
    $('.button_mini').each(function(i) {
        $(this).on('click',function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // Validation forms

    // $('#consultation-form').validate();
    // $('#consultation form').validate({
    //     rules: {
    //         name: {
    //             required: true,
    //             minlength: 2
    //         },
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //             }
    //         },
    //         messages: {
    //             name: {
    //                 required: "Пожалуйста, введите своё имя",
    //                 minlength: jQuery.validator.format("Введите {0} символа!")
    //             },
    //             phone: "Пожалуйста, введите свой номер телефона",
    //             email: {
    //               required: "Пожалуйста, введите свою почту",
    //               email: "Неправильно введён адрес почты"
    //             }
    //           }
    // });
    // $('#order form').validate();

    // Validation forms optimized
    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                    }
                },
                messages: {
                    name: {
                        required: "Пожалуйста, введите своё имя",
                        minlength: jQuery.validator.format("Введите {0} символа!")
                    },
                    phone: "Пожалуйста, введите свой номер телефона",
                    email: {
                      required: "Пожалуйста, введите свою почту",
                      email: "Неправильно введён адрес почты"
                    }
                  }
        });
    };
    
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    //Masked Input Plugin for jQuery
    $('input[name=phone]').mask("+7 (999) 999-9999");

    //Отправка писем
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    // Делаем скролинг плавным с помощью функции animate
     //$("a[href^='#']").click(function(){
     $("a[href='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
 // Запускаем библиотеку WOW для анимации при скролинге до элемента заанимирванного в биб-ке animate.css
  new WOW().init();
});