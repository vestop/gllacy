(function () {
  const feedbackLink = document.querySelector(".map__feedback-btn");
  const feedbackPopup = document.querySelector("#feedback-popup");
  const searchLink = document.querySelector(".user-search-link");
  const enterLink = document.querySelector(".user-enter-link");
  const basketLink = document.querySelector(".user-basket-link_products");
  const mapСontent = document.querySelector("#map");

  const page = document.querySelector(".page_index");
  const pageIndex = document.querySelector(".page_index");
  const showcase = document.querySelector(".showcase");
  const showcaseSlides = Array.from(document.querySelectorAll(".showcase__slide"));
  const showcaseControls = Array.from(document.querySelectorAll(".showcase__controls .slider__control"));
  const controlActiveClass = 'slider__control_active';
  const slideActiveClass = 'showcase__slide_active';

  var pageOverlay = document.createElement('div');
  pageOverlay.classList.add('page-overlay', 'page-overlay_hide');
  page.prepend(pageOverlay);

  if (pageIndex && showcaseSlides.length > 0) {
    showSliderBackgound(pageIndex, showcaseSlides[0]);
    showcaseSlides[0].classList.add(slideActiveClass);
  }

  function showSliderBackgound (pageElem, slideElem) {
    var image = slideElem.dataset.image;
    var backgroundColor = slideElem.dataset.background;

    pageElem.style.backgroundImage = image;
    pageElem.style.backgroundColor = backgroundColor || '';
  };

  function bindShowcaseEvents (container, controls, controlActiveClass, slides, slideActiveClass) {
    controls.forEach(function (control, index) {
      control.addEventListener('click', function (evt) {
        evt.preventDefault();

        var target = evt.target;

        if (!target.classList.contains(controlActiveClass)) {
          var currentIndex = index;
          var currentSlide = slides[currentIndex];

          container.querySelector(`.${controlActiveClass}`).classList.remove(controlActiveClass);
          container.querySelector(`.${slideActiveClass}`).classList.remove(slideActiveClass);

          target.classList.add(controlActiveClass);
          currentSlide.classList.add(slideActiveClass);
          showSliderBackgound(pageIndex, currentSlide);
        }
      })
    });
  };

  if (showcaseControls.length > 0) {
    bindShowcaseEvents(showcase, showcaseControls, controlActiveClass, showcaseSlides, slideActiveClass);
  }

  if(feedbackPopup) {
    var feedbackClose = feedbackPopup.querySelector(".popup__close");
    var feedbackForm = feedbackPopup.querySelector(".feedback");
    var clientName = feedbackForm.querySelector("#feedback-name");
    var clientEmail = feedbackForm.querySelector("#feedback-email");
    var clientMessage = feedbackForm.querySelector("#feedback-message");

    var storageName = localStorage.getItem("clientName");
    var storageEmail = localStorage.getItem("clientEmail");
  };

  if (basketLink) {
    basketLink.addEventListener("click", function(event) {
      event.preventDefault();
      basketLink.classList.toggle("user-basket-link_opened");
    });

    window.addEventListener("keydown", function(event) {
      if (event.keyCode === 27) {
        if (basketLink.classList.contains("user-basket-link_opened")) {
          basketLink.classList.remove("user-basket-link_opened");
        };
      };
    });
  };

  if (searchLink) {
    searchLink.addEventListener("click", function(event) {
      event.preventDefault();
      searchLink.classList.toggle("user-search-link_opened");
    });

    window.addEventListener("keydown", function(event) {
      if (event.keyCode === 27) {
        if (searchLink.classList.contains("user-search-link_opened")) {
          searchLink.classList.remove("user-search-link_opened");
        };
      };
    });
  };

  if (enterLink) {
    enterLink.addEventListener("click", function(event) {
      event.preventDefault();
      enterLink.classList.toggle("user-enter-link_opened");
    });

    window.addEventListener("keydown", function(event) {
      if (event.keyCode === 27) {
        if (enterLink.classList.contains("user-enter-link_opened")) {
          enterLink.classList.remove("user-enter-link_opened");
        };
      };
    });
  };

  if (feedbackLink && feedbackPopup) {
    feedbackLink.addEventListener("click", function(event) {
    event.preventDefault();
    if (pageOverlay && pageOverlay.classList.contains("page-overlay_hide")) {
       pageOverlay.classList.remove("page-overlay_hide");
       pageOverlay.classList.add("page-overlay_show");
    };
    feedbackPopup.classList.remove("popup_closed");
    feedbackPopup.classList.add("popup_opened");
    clientName.focus();

    if (storageName && !storageEmail) {
         clientName.value = storageName;
         clientEmail.focus();
     } else if (storageName && storageEmail) {
         clientName.value = storageName;
         clientEmail.value = storageEmail;
         clientMessage.focus();
     } else {
         clientName.focus();
     };
  });

  feedbackForm.addEventListener("submit", function(event) {
    if (clientName.value && clientEmail.value && clientMessage.value) {
      localStorage.setItem('clientName', clientName.value);
      localStorage.setItem('clientEmail', clientEmail.value);
    }
  });

  feedbackClose.addEventListener("click", function(event) {
    event.preventDefault();
    feedbackPopup.classList.remove("popup_opened");
    feedbackPopup.classList.add("popup_closed");
    feedbackPopup.classList.remove("popup_error");

    if (pageOverlay && pageOverlay.classList.contains("page-overlay_show")) {
      pageOverlay.classList.remove("page-overlay_show");
      pageOverlay.classList.add("page-overlay_hide");
    };
  });

  if (pageOverlay) {
    pageOverlay.addEventListener("click", function(event) {
      event.preventDefault();
      if (feedbackPopup.classList.contains("popup_opened")) {
        feedbackPopup.classList.remove("popup_opened");
        feedbackPopup.classList.add("popup_closed");
        feedbackPopup.classList.remove("popup_error");
      };
      if (pageOverlay.classList.contains("page-overlay_show")) {
        pageOverlay.classList.remove("page-overlay_show");
        pageOverlay.classList.add("page-overlay_hide");
      };
    });
  };

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (feedbackPopup.classList.contains("popup_opened")) {
        feedbackPopup.classList.remove("popup_opened");
        feedbackPopup.classList.add("popup_closed");
        feedbackPopup.classList.remove("popup_error");
      };
      if (pageOverlay.classList.contains("page-overlay_show")) {
        pageOverlay.classList.remove("page-overlay_show");
        pageOverlay.classList.add("page-overlay_hide");
      };
    };
  });
 };

 if (mapСontent) {
   ymaps.ready(function () {
     var map = new ymaps.Map('map', {
       center: [59.939390, 30.329545],
       zoom: 16,
       scrollZoom: false,//зум при скролле мышью отключен
       controls: []//элементы контролов отсутствуют (строка поиска, кнопки зума, кнопки типа карты и тд)
     }, {
       searchControlProvider: 'yandex#search'
     }),
     Placemark = new ymaps.Placemark([59.938706, 30.323149], {
       balloonContent: 'Санкт-Петербург, Большая Конюшенная улица, 19/8'
     }, {
       // Опции.
       iconLayout: 'default#image',
       // Своё изображение иконки метки.
       iconImageHref: 'img/icons/pin.svg',
       // Размеры метки.
       iconImageSize: [80, 140],
       // Смещение левого верхнего угла иконки относительно
       // её "ножки" (точки привязки).
       iconImageOffset: [-40, -140],
       // Добавляем иконку тени и задаем аналогичные параметры.
       iconShadow: true,
       iconShadowLayout: 'default#image',
       iconShadowImageHref: 'img/icons/pin-shadow.png',
       iconShadowImageSize: [182, 110],
       iconShadowImageOffset: [0, -110]
     });

     map.geoObjects.add(Placemark);
     map.behaviors.disable('scrollZoom');
     map.controls.add('zoomControl');
     var roadcontrolState = map.controls.get('zoomControl').state.get('size');
     map.controls.get('zoomControl').options.set('size', 'small');
   });
 };
})();
