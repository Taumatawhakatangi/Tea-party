$(function () {

  // Прелоадер

  // $(window).on('load', function () {
  //   $('.preloader-wrapper').delay(650).fadeOut('slow');
  //   $('body').delay(450).css({
  //     'overflow': 'visible'
  //     });
  //   });

  // Menu mobile burger

  $('.burger, .menu__item').on('click', function() {
    $('.burger span').toggleClass('change');
    $('.menu').toggleClass('active');
    $('body').toggleClass('lock');
  })

  // фиксированная шапка и кнопка наверх

  $(window).scroll(function () {
    const scrolled = $(this).scrollTop();
      if (scrolled > 700) {
        $('.jsFixedMenu').addClass('nav-fixed');
        $('.jsHeaderTop, .jsOrder').addClass('compensation');
        $('.back-to-top').fadeIn(500);
      } else if (scrolled < 600) {
        $('.jsFixedMenu').removeClass('nav-fixed');
        $('.jsHeaderTop, .jsOrder').removeClass('compensation');
        $('.back-to-top').fadeOut(500);
      }
      if (scrolled > 10) {
        $('.jsMobile').addClass('header-fixed');
      } else if (scrolled < 10) {
        $('.jsMobile').removeClass('header-fixed');
      }
  });

  $('.back-to-top a').on("click", function () {
      $('body,html').animate({scrollTop: 0}, 800);
      return false;
  });

  // слайдер в шапке

  $('.slider').slick({    
    prevArrow: '<button class="slider__btn-prev slider-btns"><img src="assets/img/icons/slider-prev.svg" alt="arrow"></button>',
    nextArrow: '<button class="slider__btn-next slider-btns"><img src="assets/img/icons/slider-next.svg" alt="arrow"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false
        }
      },
    ]
  });

  // счетчик у слайдера. Нумерация

  $(".slider").on('afterChange', function(event, slick, currentSlide){
     $(".slider__current-numb").text(currentSlide + 1);
  });

  // слайдер с подарками и поплулярными товарами
  
  $('.gift-slider__wrapper').slick( {
    prevArrow: '<button class="carts-wrapper__btn-prev slider-btns"><img src="assets/img/icons/slider-prev.svg" alt="arrow"></button>',
    nextArrow: '<button class="carts-wrapper__btn-next slider-btns"><img src="assets/img/icons/slider-next.svg" alt="arrow"></button>',
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1431,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }  
      },
      {
        breakpoint: 1050,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });


  // для того чтобы отрабатывал maxlength в инпутах

	$('body').on('input', 'input[type="number"][maxlength]', function(){
		if (this.value.length > this.maxLength){
			this.value = this.value.slice(0, this.maxLength);
		}
	});

  // табы

  $('.jsTabBtn').on('click', function() {
    const tabLabel = $(this).attr('data-tab');
    const contentLabel = $('.jsTabContent[data-tab="'+ tabLabel +'"]');  

    $('.jsTabBtn.active').removeClass('active');
    $(this).addClass('active');
 
    $('.jsTabContent.active').removeClass('active');
    contentLabel.addClass('active'); 
  });


  // Модальное окно

  $('.order-btn').on('click', function() {
    $('.modal-wrapper, .modal-window').fadeIn();
  });
  $('.modal-wrapper').on('click', function() {
    $(this).fadeOut();
    $(this).children().fadeOut()
  });
  $('.modal-close-btn').on('click', function() {
    $('.modal-wrapper, .modal-window').fadeOut();
  });
  $('.modal-wrapper').children().on('click', function(e) {
    e.stopPropagation();
  })
  $('.transparent-btn_thanks').on('click', function() {
    $('.modal-wrapper, .thanks-window').fadeOut();
  });
  // $('.subscribe-form__btn').on('click', function() {
  //    $('.modal-wrapper, .thanks-window-subscribe').fadeIn();
  // });

  // Validation

  $('[data-submit-contact]').on('click', function(e) {
    e.preventDefault();
    $(this).parent('form').submit();
  })
  $.validator.addMethod("regex", function(value, element, regexp) {
      let regExp = new RegExp(regexp);
      return this.optional(element) || regExp.test(value)
  }, 'Please check your input');
  

  function valEl(el) {
     el.validate({
      rules: {
        firstName: {
          required: true,
          regex : "[А-я]"   
        },

        email : {
          required : true
        },

        phoneNumber: {
            digits : true,
            required: true,
            minlength: 10,
            maxlength: 12,
            regex: "[0-9]+"
        },

        build: {
            digits : true,
            required: true,
            minlength: 1,
            maxlength: 10,
            regex: "[0-9]+"
        },

        flat: {
            digits : true,
            required: true,
            minlength: 1,
            maxlength: 100,
            regex: "[0-9]+"
        },

        country: {
          required: true,
          regex : "[A-Za-z]"   
        },

        town: {
          required: true,
          regex : "[A-Za-z]"   
        },

        street: {
          required: true,
          regex : "[A-Za-z]"   
        },
    },

    messages: {
        phoneNumber : {
          required: 'Введите ваш телефон',
          regex: 'Неправильно набран номер'
        },
        firstName : {
          required: 'Введите ваше имя',
          regex: 'Неправильно написано имя'
        },
        email : {
          required: 'Введите вашу почту',
          regex: 'Неправильно введена почта'
        },
        country : {
          required: 'Страна',
          regex: 'Неправильно написана страна'
        },
        town : {
          required: 'Город',
          regex: 'Неправильно написан город'
        },
        street : {
          required: 'Введите вашу улицу',
          regex: 'Неправильно написана улица'
        },
        build : {
          required: 'Номер дома',
          regex: 'Неверный номер дома'
        },
        flat : {
          required: 'Номер квартиры',
          regex: 'Неверный номер квартиры'
        },
    },

    submitHandler: function(form){
         $('.preloader-wrapper').fadeIn();
         let $form = $(form);
         let $formId = $(form).attr('id');
         switch ($formId) {
          case 'modalForm' :
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done(function() {
              console.log('Succes');
            })
            .fail(function() {
              console.log('Fail');
            })
            .always(function() {
              setTimeout(function() {
                $form.trigger('reset');
                $('.modal-window').fadeOut();
              }, 1000);
               setTimeout(function() {
                $('.preloader-wrapper').fadeOut();
              }, 1400);
                setTimeout(function() {
                $('.thanks-window').fadeIn();
              }, 1700);
            });
            break;
            case 'contactForm' :
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
              })
              .done(function() {
                console.log('Succes');
              })
              .fail(function() {
                console.log('Fail');
              })
              .always(function() {
                console.log('Always');
                setTimeout(function() {
                   $form.trigger('reset');
                }, 1000);
                 setTimeout(function() {
                  $('.preloader-wrapper').fadeOut();
                }, 1400);
                 setTimeout(function() {
                  $('.status').fadeIn();
                 }, 1700);
               });
               break;
               case 'orderForm' :
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
              })
              .done(function() {
                console.log('Succes');
              })
              .fail(function() {
                console.log('Fail');
              })
              .always(function() {
                console.log('Always');
                setTimeout(function() {
                   $form.trigger('reset');
                }, 1000);
                 setTimeout(function() {
                  $('.preloader-wrapper').fadeOut();
                }, 1400);
                 setTimeout(function() {
                  $('.modal-wrapper, .thanks-window').fadeIn();
                 }, 1700);
               });
               break;
             } 
             return false;   
           }
         })
       };
       $('.js-form').each(function() {
        valEl($(this));
       })




    











}); //end Jquery
