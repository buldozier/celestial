// Swipers

const slider = document.querySelector('.swiper')
const cards = document.querySelector(".advantages-swiper")

const swiper = new Swiper(slider, {    // Свайпер для баннеров
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
    },
});

const swiperCards = new Swiper(cards, {   // Свайпер для преимуществ
    spaceBetween: 11,
    freeMode: {
        enabled: true,
        momentumBounce: false
    },
    momentumBounce: false,
    slidesPerView: "auto"
});

// Yandex Map

const center = [56.81026238291606,60.702395378276364];  // изначальное положение карты
const simaLand = [56.76026624427634,60.75189737924261];  // положение точки СимаЛенда
const bluchera = [56.86513061727475,60.668144852443696]  // положение точки на Блюхера
const simaLandData = {
    header: "Магазин на Черняховского",
    address: "улица Черняховского, 99",
    phone: "+7 (999) 012-34-56",
    workTime: "Ежедневно с 09:00 до 22:00"
}

const blucheraData = {
    header: "Магазин на Блюхера",
    address: "улица Блюхера, 99",
    phone: "+7 (999) 012-34-56 (доб. 02)",
    workTime: "Ежедневно с 10:00 до 21:00"
}

function init() {
    let map = new ymaps.Map('map', {    // создание карты
        center: center,
        zoom: 10
    });

    let simaLandMark = new ymaps.Placemark(simaLand, {}, {  // создание точки для СимаЛенда
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/pin_logo.svg',
        iconImageSize: [72, 81],
        hideIconOnBalloonOpen: false,
    });

    let blucheraMark = new ymaps.Placemark(bluchera, {}, {  // создание точки для Блюхера
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/pin_logo.svg',
        iconImageSize: [72, 81],

    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил, что нарушает правила пользования картами

    map.geoObjects
        .add(simaLandMark)
        .add(blucheraMark)

    const balloonHeader = document.querySelector(".balloon__header")
    const balloonAddress = document.querySelector(".balloon__content-address")
    const balloonPhone = document.querySelector(".balloon__content-phone")
    const balloonWorkTime = document.querySelector(".balloon__content-workTime")

    simaLandMark.events.add('click', function () {     // добавляем слушатель нажатия для открытия баллуна
        balloonHeader.innerHTML = simaLandData.header
        balloonAddress.innerHTML = simaLandData.address
        balloonPhone.innerHTML = simaLandData.phone
        balloonWorkTime.innerHTML = simaLandData.workTime
        balloonInit()
    });

    blucheraMark.events.add('click', function () {     // добавляем слушатель нажатия для открытия баллуна
        balloonHeader.innerHTML = blucheraData.header
        balloonAddress.innerHTML = blucheraData.address
        balloonPhone.innerHTML = blucheraData.phone
        balloonWorkTime.innerHTML = blucheraData.workTime
        balloonInit()
    });
}

ymaps.ready(init);

// Menu

const menuBtn = document.querySelector(".header-mobile__menu")
const menu = document.querySelector(".mobile-menu")
const main = document.querySelector("main")

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('mobile-menu-active')
    main.classList.toggle('main-hidden')
})

// Catalog

const goBack = document.querySelector(".catalog__header-back")

goBack.addEventListener("click", () => {
    console.log("click")
})

// Balloon

const balloon = document.querySelector(".balloon")
const balloonCloseBtn = document.querySelector('.balloon__close-btn')

function balloonInit() {  // добавляем открытие баллуна и запрещаем скролл при открытом баллуне
    balloon.classList.add("balloon-active")
    document.body.style.overflow = 'hidden';
    document.body.addEventListener("click", () => {     // закрытие баллуна при нажатии не на него
        closeBalloon();
    })
}

balloon.addEventListener('click', (event) => {
    event.stopPropagation(); // остановим событие на дочернем элементе
});

balloonCloseBtn.addEventListener('click', closeBalloon);

function closeBalloon () {  // закрываем баллун и разрешаем скролл
    balloon.classList.remove('balloon-active')
    document.body.style.overflow = '';
}