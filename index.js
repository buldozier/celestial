// Inputs

const allInputs = document.querySelectorAll("input")
const signBlock = document.querySelector(".sign")
const inputPassword = document.querySelector('.password input')
const showPasswordBtn = document.querySelector(".show-password")
const showPasswordSvg = document.querySelector("#hide")
const hidePasswordSvg = document.querySelector("#show")
const showSignBtn = document.querySelector("#show-sign")
const closeSignBtn = document.querySelector('#close-sign')

allInputs.forEach(el => {
    el.addEventListener("input", () => {
        if (el.value === '') {
            el.classList.remove("filled")
        } else {
            el.classList.add("filled")
            removeError(el)
        }
    })
})

showPasswordBtn.addEventListener('click', () => {
    showPasswordSvg.classList.toggle('show')
    hidePasswordSvg.classList.toggle('show')

    if (showPasswordSvg.classList.contains("show")) {
        inputPassword.setAttribute("type", "text")
    } else {
        inputPassword.setAttribute("type", "password")
    }
})

showSignBtn.addEventListener("click", () => {
    toggleSignBlock()
})

closeSignBtn.addEventListener("click", () => {
    toggleSignBlock()
})

function toggleSignBlock() {
    signBlock.classList.toggle('sign-show')
    if (signBlock.classList.contains("sign-show")) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}




// Validation

const signForm = document.querySelector("#sign-form")

signForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("отправка формы...")

    if (validationForm(signForm) === true) {
        console.log("Форма успешно отправлена!")
        signForm.querySelectorAll("input").forEach(el => {
            el.value = ''
            el.classList.remove("filled")
        })
        toggleSignBlock()
    } else {
        console.log("Валидация не пройдена!")
    }

    document.body.style.overflow = '';
})

function validationForm(form) {
    let result = true

    form.querySelectorAll("input").forEach(el => {
        const emailDiv = el.parentNode.classList.contains('email')
        const passwordDiv = el.parentNode.classList.contains('password')

        removeError(el)

        if (el.value === '') {
            if (emailDiv) {
                createError(el, "Некорректная почта")
            }

            if (passwordDiv) {
                createError(el, "Некорректный пароль")
            }

            result = false
        }
    })

    return result
}


function removeError(input) {
    const parent = input.parentNode

    if (input.classList.contains("input-error")) {
        parent.querySelector(".error-helper").remove()
        input.classList.remove("input-error")

    }
}

function createError(input, errorText) {
    const parent = input.parentNode
    const errorLabel = document.createElement("p")

    parent.classList.add("error")
    input.classList.add('input-error')
    errorLabel.classList.add("error-helper")
    errorLabel.innerText = errorText

    parent.append(errorLabel)
}
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

const menuBtn = document.querySelector(".menu-btn")
const openBtn = document.querySelector(".header-mobile__menu_open")
const closeBtn = document.querySelector(".header-mobile__menu_close")
const menu = document.querySelector(".mobile-menu")
const main = document.querySelector("main")

menuBtn.addEventListener('click', () => {  // изменение кнопки меню, сокрытие главной страницы, открытие блока меню
    toggleMenuVision()
    main.classList.toggle('main-hidden')
})

function toggleMenuVision() {
    window.scrollTo(0, 0)
    menu.classList.toggle('mobile-menu-active') // открытие,закрытие меню
    openBtn.classList.toggle('btn-hidden') // показ, сокрытие кнопки меню
    closeBtn.classList.toggle('btn-hidden') // показ, сокрытие кнопки закрытия меню
    menuBtn.classList.toggle('menu-active') // изменение цвета кнопки
}




// Catalog

const catalogGoBackBtn = document.querySelector("#catalog-back")
const catalog = document.querySelector(".catalog")
const menuCatalog = document.querySelector(".mobile-menu__catalog")
const closeCatalogBtn = document.querySelector("#catalog-close")

catalogGoBackBtn.addEventListener("click", () => {
    toggleCatalogVision()
    toggleMenuVision()
})
menuCatalog.addEventListener("click", () => {
    toggleCatalogVision()
    toggleMenuVision()
})
closeCatalogBtn.addEventListener("click", () => {
    toggleCatalogVision()
    toggleMenuVision()
})

function toggleCatalogVision () {
    catalog.classList.toggle("catalog-hidden") // открытие, закрытие каталога
}




// Category

const category = document.querySelector(".category")
const subcategory = document.querySelector(".subcategory")
const catalogLinks = document.querySelectorAll(".catalog__item")
let categoryTitle = document.querySelector(".category__title")
const categoryUl = document.querySelector(".category__list")

const subcategoryTitleTop = document.querySelector(".subcategory__header-title_top")
const subcategoryTitleBottom = document.querySelector(".subcategory__header-title_bottom")
const subcategoryUl = document.querySelector(".subcategories__list")

const categoryGoBackBtn = document.querySelector("#category-back")
const closeCategoryBtn = document.querySelector("#category-close")
const subcategoryGoBackBtn = document.querySelector("#subcategory-back")
const subcategoryCloseBtn = document.querySelector("#subcategory-close")

const categoryListData = {  // список необходимых подкатегорий для определнной категории
    "Новогодние товары": [
        {
            text: "Все товары категории",
            haveArrow: false
        },
        {
            text: "Гирлянды и освещение",
            haveArrow: true
        },
        {
            text: "Ёлки искусственные",
            haveArrow: true
        },
        {
            text: "Украшения для ёлки",
            haveArrow: true
        },
        {
            text: "Сувениры новогодние",
            haveArrow: true
        },
        {
            text: "Посуда новогодняя",
            haveArrow: true
        },
        {
            text: "Текстиль новогодний",
            haveArrow: true
        },
        {
            text: "Карнавальные товары",
            haveArrow: true
        },
        {
            text: "Игрушки новогодние",
            haveArrow: false
        },
        {
            text: "Галантерея новогодняя",
            haveArrow: false
        },
        {
            text: "Упаковка новогодняя",
            haveArrow: true
        },
        {
            text: "Новогодние книжки",
            haveArrow: false
        },
        {
            text: "Канцтовары новогодние",
            haveArrow: true
        },
        {
            text: "Атрибуты праздника",
            haveArrow: true
        },
        {
            text: "Одежда и обувь новогодние",
            haveArrow: true
        },
        {
            text: "Товары для дома новогодние",
            haveArrow: false
        },
        {
            text: "Открытки новогодние",
            haveArrow: false
        },
        {
            text: "Предыдущие коллекции",
            haveArrow: true
        },
    ]
}

const subcategoryListData = {  // список подкатегорий
    "Гирлянды и освещение": [
        {
            text: "Гирлянды для дома",
            haveArrow: false
        },
        {
            text: "Гирлянды уличные",
            haveArrow: false
        },
        {
            text: "Гирлянды на батарейках,USB",
            haveArrow: false
        },
        {
            text: "Верхушки с подсветкой",
            haveArrow: false
        },
        {
            text: "Световые приборы",
            haveArrow: false
        },
        {
            text: "Фигуры световые",
            haveArrow: false
        },
        {
            text: "Удлинители для гирлянд",
            haveArrow: false
        },
        {
            text: "Ленты светодиодные",
            haveArrow: false
        },
    ]
}

categoryGoBackBtn.addEventListener("click", () => {  // возвращаемя обратно к списку категорий
    closeCategory()
    removeLinks(".category__item")
    toggleCatalogVision()
})

closeCategoryBtn.addEventListener("click", () => {  // возвращаемся к меню
    closeCategory()
    removeLinks(".category__item")
    toggleMenuVision()
})

catalogLinks.forEach((el) => {  // обработчик нажатия на каждую отдельную категорию
    el.addEventListener("click", (e) => {
        const titleHeader = e.target.innerText
        categoryTitle.innerHTML = titleHeader
        subcategoryTitleTop.innerHTML = titleHeader
        if (categoryListData[titleHeader] !== undefined) {  // создаем список подкатегорий
            categoryListData[titleHeader].forEach(el => {
                categoryUl.append(createCategoryItem(el, "category__item"))
            })
        } else {
            categoryUl.append(createCategoryItem({  // если списка нет, выводим просто все товары
                text: "Все товары категории",
                haveArrow: false
            }, "category__item"))
        }
        window.scrollTo(0, 0)
        openCategory()
        toggleCatalogVision()
    })
})

function openCategory() {  // показать блок категории
    category.classList.remove('category-hidden')
    const categoryList = document.querySelectorAll('.category__item')
    categoryTitle = document.querySelector(".category__title")

    if (!category.classList.contains('category-hidden') && subcategory.classList.contains('subcategory-hidden')) {  // создаем обработчики для перехода к подкатегориям
        categoryList.forEach(el => {
            el.addEventListener('click', (e) => {
                const titleHeader = e.target.innerText
                subcategoryTitleBottom.innerHTML = titleHeader
                if (subcategoryListData[titleHeader] !== undefined) {  // создаем список подкатегорий
                    subcategoryListData[titleHeader].forEach(el => {
                        subcategoryUl.append(createCategoryItem(el, "subcategory__item"))
                    })
                }
                window.scrollTo(0, 0)
                toggleSubcategoryVision()
                closeCategory()
            })
        })
    }
}

function closeCategory() {  // скрыть блок категории
    category.classList.add('category-hidden')
}

function removeLinks(elClass) {  // очищаем список
    const links = document.querySelectorAll(elClass)
    links.forEach(el => {
        el.remove()
    })
}


function createCategoryItem(category, elClass) {  // создаем категории
    const li = document.createElement("li");
    li.classList.add(elClass)
    li.classList.add("list-item");

    if (category.haveArrow) {
        li.classList.add("arrow__item");
    }
    const p = document.createElement("p");
    p.innerText = category.text
    li.append(p)
    return li
}





// SubCategory

subcategoryGoBackBtn.addEventListener("click", () => {  // возвращаемя обратно к списку категорий
    openCategory()
    removeLinks(".subcategory__item")
    toggleSubcategoryVision()
})

subcategoryCloseBtn.addEventListener("click", () => {  // возвращаемся к меню
    toggleMenuVision()
    toggleSubcategoryVision()
    removeLinks(".category__item")
    removeLinks(".subcategory__item")
})

function toggleSubcategoryVision() {  // показать, скрыть блок подкатегории
    subcategory.classList.toggle("subcategory-hidden")

}




// Balloon

const balloon = document.querySelector(".balloon")
const balloonCloseBtn = document.querySelector('.balloon__close-btn')

balloon.addEventListener('click', (event) => {
    event.stopPropagation(); // остановим событие на дочернем элементе
});

balloonCloseBtn.addEventListener('click', () => {
    closeBalloon()
});

function balloonInit() {  // добавляем открытие баллуна и запрещаем скролл при открытом баллуне
    balloon.classList.add("balloon-active")
    document.body.style.overflow = 'hidden';
    document.body.addEventListener("click", () => {
        closeBalloon()
    })
}

function closeBalloon () {  // закрываем баллун и разрешаем скролл
    balloon.classList.remove('balloon-active')
    document.body.style.overflow = '';
}