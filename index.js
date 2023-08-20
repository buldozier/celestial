// Search input

const searchInput = document.querySelector("#search")
const clearSearch = document.querySelector(".clear-search-value")

clearSearch.addEventListener("click", () => {
    searchInput.value = ""
})


// Sign in

const allInputs = document.querySelectorAll("input")
const signBlock = document.querySelector(".sign")
const inputPassword = document.querySelector(".password input")
const showPasswordBtn = document.querySelector(".show-password")
const showPasswordSvg = document.querySelector("#hide")
const hidePasswordSvg = document.querySelector("#show")
const showSignBtns = document.querySelectorAll(".show-sign-in")
const closeSignBtn = document.querySelector("#close-sign")
const profileSignInBtn = document.querySelectorAll(".sign-in-profile")
const notification = document.querySelectorAll(".notification")


let profileSignIn = false


allInputs.forEach(el => {  // если в инпутах есть текст, то добавляется стиль
    el.addEventListener("input", () => {
        if (el.value === "") {
            el.classList.remove("filled")
        } else {
            el.classList.add("filled")
            removeError(el)
        }
    })
})

showPasswordBtn.addEventListener("click", () => {  // показываем или скрываем пароль
    showPasswordSvg.classList.toggle("show")
    hidePasswordSvg.classList.toggle("show")

    if (showPasswordSvg.classList.contains("show")) {
        inputPassword.setAttribute("type", "text")
    } else {
        inputPassword.setAttribute("type", "password")
    }
})

showSignBtns.forEach(el => {
    el.addEventListener("click", () => {  // слушатель на кнопку показа формы регистрации
        toggleSignBlock()
    })
})

signBlock.addEventListener("click", () => {  // закрытие формы на компьютерах при нажатии вне формы

    if (window.innerWidth >= 1510) {
        toggleSignBlock()
    }
})

const signInner = document.querySelector(".sign__inner")

signInner.addEventListener("click", (e) => {
    e.stopPropagation()
})

closeSignBtn.addEventListener("click", () => {  // слушатель на кнопку закрытия формы регистрации
    toggleSignBlock()
})

function toggleSignBlock() {  // показ или сокрытие формы регистрации, в случае закрытия - очищение инпутов
    signBlock.classList.toggle("sign-show")
    signBlock.querySelectorAll("input").forEach(el => {
        removeError(el)
        el.value = ""
        el.classList.remove("filled")
    })
    if (signBlock.classList.contains("sign-show")) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = ""
    }

    if (profileSignIn === true) {
        showSignBtns.forEach(el => {
            el.remove()
        })
        profileSignInBtn.forEach(el => {
            el.classList.remove("sign-in-profile-hidden")
        })
        notification.forEach(el => {
            el.classList.remove("notification-hidden")
        })
    }

}


// Validation

const signForm = document.querySelector("#sign-form")

signForm.addEventListener("submit", (e) => {  // отправка формы
    e.preventDefault()

    if (validationForm(signForm) === true) {
        profileSignIn = true
        toggleSignBlock()
    }

})

function validationForm(form) {  // валидация формы, проверка на непустое значение
    let result = true

    form.querySelectorAll("input").forEach(el => {
        const emailDiv = el.parentNode.classList.contains("email")
        const passwordDiv = el.parentNode.classList.contains("password")

        removeError(el)

        if (el.value === "") {
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


function removeError(input) {  // убираем вспомогательные ошибки под инпутами
    const parent = input.parentNode

    if (input.classList.contains("input-error")) {
        parent.querySelector(".error-helper").remove()
        input.classList.remove("input-error")

    }
}

function createError(input, errorText) {  // создаем вспомогательные ошибки под инпутами
    const parent = input.parentNode
    const errorLabel = document.createElement("p")

    parent.classList.add("error")
    input.classList.add("input-error")
    errorLabel.classList.add("error-helper")
    errorLabel.innerText = errorText

    parent.append(errorLabel)
}

// Swipers

const slider = document.querySelector(".swiper")
const cards = document.querySelector(".advantages-swiper")
const catalogSwiper = document.querySelector(".catalog__swiper")

new Swiper(slider, {    // Свайпер для баннеров
    spaceBetween: 20, navigation: {
        nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev"
    }, pagination: {
        el: ".swiper-pagination",
    }, breakpoints: {
        1510: {
            spaceBetween: 10,
        }
    }, autoplay: {
        enabled: true, delay: 3000
    }
});

new Swiper(cards, {   // Свайпер для преимуществ
    spaceBetween: 11, freeMode: {
        enabled: true, momentumBounce: false
    }, momentumBounce: false, slidesPerView: "auto",
});

new Swiper(catalogSwiper, {   // Свайпер для каталога
    spaceBetween: 10, navigation: {
        nextEl: ".catalog-swiper-button-next", prevEl: ".catalog-swiper-button-prev"
    }, pagination: {
        el: ".catalog-swiper-pagination",
    }, autoplay: {
        enabled: true, delay: 3000
    }
});


// Yandex Map

const center = [56.81026238291606, 60.702395378276364];  // изначальное положение карты
const simaLand = [56.76026624427634, 60.75189737924261];  // положение точки СимаЛенда
const bluchera = [56.86513061727475, 60.668144852443696];  // положение точки на Блюхера
let zoom = 10

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
    let map = new ymaps.Map("map", {    // создание карты
        center: center, zoom: zoom
    });

    let simaLandMark = new ymaps.Placemark(simaLand, {}, {  // создание точки для СимаЛенда
        iconLayout: "default#image", iconImageHref: "img/icons/pin_logo.svg", iconImageSize: [72, 81],
    });

    let blucheraMark = new ymaps.Placemark(bluchera, {}, {  // создание точки для Блюхера
        iconLayout: "default#image", iconImageHref: "img/icons/pin_logo.svg", iconImageSize: [72, 81],

    });

    map.controls.remove("geolocationControl"); // удаляем геолокацию
    map.controls.remove("searchControl"); // удаляем поиск
    map.controls.remove("trafficControl"); // удаляем контроль трафика
    map.controls.remove("typeSelector"); // удаляем тип
    map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove("zoomControl"); // удаляем контрол зуммирования
    map.controls.remove("rulerControl"); // удаляем контрол правил, что нарушает правила пользования картами

    map.geoObjects
        .add(simaLandMark)
        .add(blucheraMark)

    const balloonHeader = document.querySelector(".balloon__header")
    const balloonAddress = document.querySelector(".balloon__content-address")
    const balloonPhone = document.querySelector(".balloon__content-phone")
    const balloonWorkTime = document.querySelector(".balloon__content-workTime")

    simaLandMark.events.add("click", () => {
        balloonData(map, balloonHeader, balloonAddress, balloonPhone, balloonWorkTime, simaLandData, simaLand)
    })

    blucheraMark.events.add("click", () => {
        balloonData(map, balloonHeader, balloonAddress, balloonPhone, balloonWorkTime, blucheraData, bluchera)
    })

    const shop1 = document.querySelector("#shop1")
    const shop2 = document.querySelector("#shop2")

    shop1.addEventListener("click", () => {  // переход к точке на карте
        map.setCenter(simaLand, 15)
    })

    shop2.addEventListener("click", () => {  // переход к точке на карте
        map.setCenter(bluchera, 15)
    })

    const zoomIn = document.querySelector("#zoomIn")
    const zoomOut = document.querySelector("#zoomOut")

    zoomIn.addEventListener("click", () => {  // зум на карте
        map.setZoom(map.getZoom() + 1)
    })

    zoomOut.addEventListener("click", () => {  // отдаление на карте
        map.setZoom(map.getZoom() - 1)
    })
}

function balloonData(map, balloonHeader, balloonAddress, balloonPhone, balloonWorkTime, Data, position) {     // добавляем слушатель нажатия для открытия баллуна
    balloonHeader.innerHTML = Data.header
    balloonAddress.innerHTML = Data.address
    balloonPhone.innerHTML = Data.phone
    balloonWorkTime.innerHTML = Data.workTime
    balloonInit()
    map.setCenter(position, 15)
}

ymaps.ready(init)


// Menu

const menuBtn = document.querySelector(".menu-btn")
const openBtn = document.querySelector(".header-mobile__menu_open")
const closeBtn = document.querySelector(".header-mobile__menu_close")
const menu = document.querySelector(".mobile-menu")
const main = document.querySelector("main")

menuBtn.addEventListener("click", () => {  // изменение кнопки меню, сокрытие главной страницы, открытие блока меню
    toggleMenuVision()
    main.classList.toggle("main-hidden")
})

function toggleMenuVision() {
    window.scrollTo(0, 0)
    menu.classList.toggle("mobile-menu-active") // открытие,закрытие меню
    openBtn.classList.toggle("btn-hidden") // показ, сокрытие кнопки меню
    closeBtn.classList.toggle("btn-hidden") // показ, сокрытие кнопки закрытия меню
    menuBtn.classList.toggle("menu-active") // изменение цвета кнопки
}


// Catalog

const catalogGoBackBtn = document.querySelector("#catalog-back")
const catalog = document.querySelector(".catalog")
const menuCatalog = document.querySelector(".mobile-menu__catalog")
const closeCatalogBtn = document.querySelector("#catalog-close")

const catalogBtnDesktop = document.querySelectorAll(".right__catalog-button")
const openCatalogDesktop = document.querySelector(".open-catalog")
const closeCatalogDesktop = document.querySelector(".close-catalog")
const desktopCatalog = document.querySelector(".desktop-catalog")

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

catalogBtnDesktop.forEach(el => {  // открытие и закрытие каталога на пк версии
    el.addEventListener("click", () => {
        if (desktopCatalog.classList.contains("desktop-catalog-hidden")) {
            openCatalogDesktop.classList.add("catalog-svg-hidden")
            closeCatalogDesktop.classList.remove("catalog-svg-hidden")
            desktopCatalog.classList.remove("desktop-catalog-hidden")
            main.classList.add("main-hidden")
        } else {
            openCatalogDesktop.classList.remove("catalog-svg-hidden")
            closeCatalogDesktop.classList.add("catalog-svg-hidden")
            desktopCatalog.classList.add("desktop-catalog-hidden")
            main.classList.remove("main-hidden")
        }
    })

})


function toggleCatalogVision() {
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
    "Новогодние товары": [{
        text: "Все товары категории", haveArrow: false
    }, {
        text: "Гирлянды и освещение", haveArrow: true
    }, {
        text: "Ёлки искусственные", haveArrow: true
    }, {
        text: "Украшения для ёлки", haveArrow: true
    }, {
        text: "Сувениры новогодние", haveArrow: true
    }, {
        text: "Посуда новогодняя", haveArrow: true
    }, {
        text: "Текстиль новогодний", haveArrow: true
    }, {
        text: "Карнавальные товары", haveArrow: true
    }, {
        text: "Игрушки новогодние", haveArrow: false
    }, {
        text: "Галантерея новогодняя", haveArrow: false
    }, {
        text: "Упаковка новогодняя", haveArrow: true
    }, {
        text: "Новогодние книжки", haveArrow: false
    }, {
        text: "Канцтовары новогодние", haveArrow: true
    }, {
        text: "Атрибуты праздника", haveArrow: true
    }, {
        text: "Одежда и обувь новогодние", haveArrow: true
    }, {
        text: "Товары для дома новогодние", haveArrow: false
    }, {
        text: "Открытки новогодние", haveArrow: false
    }, {
        text: "Предыдущие коллекции", haveArrow: true
    },]
}

const subcategoryListData = {  // список подкатегорий
    "Гирлянды и освещение": [{
        text: "Гирлянды для дома", haveArrow: false
    }, {
        text: "Гирлянды уличные", haveArrow: false
    }, {
        text: "Гирлянды на батарейках,USB", haveArrow: false
    }, {
        text: "Верхушки с подсветкой", haveArrow: false
    }, {
        text: "Световые приборы", haveArrow: false
    }, {
        text: "Фигуры световые", haveArrow: false
    }, {
        text: "Удлинители для гирлянд", haveArrow: false
    }, {
        text: "Ленты светодиодные", haveArrow: false
    },]
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
                text: "Все товары категории", haveArrow: false
            }, "category__item"))
        }
        window.scrollTo(0, 0)
        openCategory()
        toggleCatalogVision()
    })
})

function openCategory() {  // показать блок категории
    category.classList.remove("category-hidden")
    const categoryList = document.querySelectorAll(".category__item")
    categoryTitle = document.querySelector(".category__title")

    if (!category.classList.contains("category-hidden") && subcategory.classList.contains("subcategory-hidden")) {  // создаем обработчики для перехода к подкатегориям
        categoryList.forEach(el => {
            el.addEventListener("click", (e) => {
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
    category.classList.add("category-hidden")
}

function removeLinks(elClass) {  // очищаем список
    const links = document.querySelectorAll(elClass)
    links.forEach(el => {
        el.remove()
    })
}


function createCategoryItem(category, elClass) {  // создаем категории
    const li = document.createElement("li")
    li.classList.add(elClass)
    li.classList.add("list-item")

    if (category.haveArrow) {
        li.classList.add("arrow__item")
    }
    const p = document.createElement("p")
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
const balloonCloseBtn = document.querySelector(".balloon__close-btn")

balloon.addEventListener("click", (event) => {
    event.stopPropagation()  // остановим событие на дочернем элементе
});

balloonCloseBtn.addEventListener("mousedown", () => {
    closeBalloon()
});

function balloonInit() {  // добавляем открытие баллуна и запрещаем скролл при открытом баллуне
    balloon.classList.add("balloon-active")
    if (window.innerWidth <= 1510) {
        document.body.style.overflow = "hidden"
    }
    setTimeout(() => {
        document.body.addEventListener("click", closeBalloon)
    }, 200)

}

function closeBalloon() {  // закрываем баллун и разрешаем скролл
    balloon.classList.remove("balloon-active")
    document.body.style.overflow = ""
    document.body.removeEventListener("click", closeBalloon)
}
