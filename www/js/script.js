//main slider
//a
document.addEventListener('DOMContentLoaded', activeSlide);
let count = 0;
let slides = document.querySelectorAll('.slide');
let scrollItems = document.querySelectorAll('.slider-scroll_item');

function activeSlide() {

    if (count > slides.length - 1) {
        count = 0;
    } else if (count < 0) {
        count = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        if (count == i) {
            slides[i].classList.add('active');
            scrollItems[i].classList.add('active');

        } else {
            slides[i].classList.remove('active');
            scrollItems[i].classList.remove('active');
        }
    }
    count++;

}


let int = setInterval(activeSlide, 7000);

//end main slider

let item;
let itemMenu = document.querySelector('.menu-container');
let itemsMenu = document.querySelectorAll('.menu-container li');
itemsMenu.forEach((item) => {
    if (item.querySelector('.sub-menu')) {
        item.children[0].insertAdjacentHTML('beforeend', ' <i class="fas fa-chevron-down"></i>');
    }
})

function getcoord(elem) {
    let ccord = elem[0].offsetLeft;
    let trick = document.querySelector('.sub-menu.display .trick');
    trick.style.left = ccord + 7 + 'px';
    let styleLeft = getComputedStyle(trick.parentElement).left;
    if (parseFloat(styleLeft) != 0) {
        trick.style.left = ccord + 7 - parseFloat(styleLeft) + 'px';
    }

}
let prevElement;
$(document).ready(function () {
    $('.articles_list').slick({

        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 2560,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 475,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1.3,
                    slidesToScroll: 1
                }
            },

        ]
    });







    // open and close main submenu
    $(".menu_list > li > a").on("click", function (e) {
        var overbg = $(".overlay-bg");
        var elem = $(this).parent().children("div");
        var elemD = $(this).parent().children("div").hasClass('display');
        let prevElementDisplay = $(prevElement).hasClass('display');
        // console.log(w)
        if (elem.hasClass('sub-menu')) {
            e.preventDefault();

            if (elemD) {
                console.log('elemD')

                //add class for animation elements of sub ,mnu
                $("li.open li").each(function (index) {
                    $(this).removeClass('active-open');
                });
                $(".sub-menu_container_title").each(function (index) {
                    $(this).removeClass('title-open');
                });

                $(".menu_list > li > div").each(function (index) {
                    $(this).removeClass('display');
                    $(this).parent().removeClass('open');
                });
                overbg.removeClass('display');

            } else {
                //если при открытом выпадающем меню кликнуть на дургое, то предыдущее закрывается
                if (!prevElementDisplay == elemD) {
                    $(".menu_list > li > div").each(function (index) {
                        $(this).removeClass('display');
                        $(this).parent().removeClass('open');
                    });
                }
                //
                elem.addClass('display');
                overbg.addClass('display');
                $(this).parent().addClass('open');
                setTimeout(function () {
                    $(".sub-menu_container_title").each(function (index) {
                        $(this).addClass('title-open');
                    });
                    $("li.open li").each(function (index) {
                        $(this).addClass('active-open');
                    });
                }, 100)
                var trick = $("li.open i");
                getcoord(trick);

                prevElement = elem;
            }
        }

    });
    // open and close profile submenu
    $(".menu-profile_list > li > a").on("click", function (e) {
        var overbg = $(".overlay-bg");
        var elem = $(this).parent().children("div");
        var elemD = $(this).parent().children("div").hasClass('display');
        if (elem.hasClass('sub-menu')) {
            e.preventDefault();
            if (elemD) {
                overbg.removeClass('display');
                $(".menu-profile_list > li > div").each(function (index) {
                    $(this).removeClass('display');
                    $(this).parent().removeClass('open');
                });
            } else {
                elem.addClass('display');
                overbg.addClass('display');
                $(this).parent().addClass('open');
                var trick = $("li.open i")
                getcoord(trick);
            }
        }
    });
    // open and close mob main submenu
    $(".menu-mob_list > li > a").on("click", function (e) {
        var elem = $(this).parent().children("ul");
        var elemD = $(this).parent().children("ul").hasClass('display');
        if (elem.hasClass('sub-menu-mob_list')) {
            e.preventDefault();

            if (elemD) {
                $(".menu-mob_list > li > ul").each(function (index) {
                    $(this).removeClass('display');
                    $(this).parent().removeClass('open');
                });
            } else {
                elem.addClass('display');
                $(this).parent().addClass('open');
            }
        }
    });

    // close main menu onclick other area
    $(document).mouseup(function (e) { // событие клика по веб-документу
        var overbg = $(".overlay-bg");
        var menuList = $(".menu_list"); // тут указываем ID элемента

        if (!menuList.is(e.target) // если клик был не по нашему блоку
            &&
            menuList.has(e.target).length === 0) { // и не по его дочерним элементам

            setTimeout(function () {
                $("li.open li").each(function (index) {

                    $(this).removeClass('active-open');
                });
                $(".menu_list > li > div").each(function (index) {
                    $(this).removeClass('display');
                });

                $(".menu_list > li").each(function (index) {
                    $(this).removeClass('open');
                });
            }, 100);
            if (e.target != menuList && menuList.children().hasClass('open')) {
                overbg.removeClass('display');
            }
        }



        // close profile menu onclick other area
        var menuProfileList = $(".menu-profile_list"); // тут указываем ID элемента
        if (!menuProfileList.is(e.target) // если клик был не по нашему блоку
            &&
            menuProfileList.has(e.target).length === 0) { // и не по его дочерним элементам
            // overbg.removeClass('display');
            setTimeout(function () {
                $(".menu-profile_list > li > div").each(function (index) {
                    $(this).removeClass('display');
                });

                $(".menu-profile_list > li").each(function (index) {
                    $(this).removeClass('open');
                });
            }, 100);
            if (e.target != menuProfileList && menuProfileList.children().hasClass('open')) {
                overbg.removeClass('display');

            }
        }

        // close mob menu onclick other area
        var menuMob = $(".menu-mob");
        var menuProfileMob = $(".menu-profile-mob");
        var menuProfileList = $(".menu-profile_list"); // тут указываем ID элемента
        var togg1 = document.querySelector(".mob-menu-profle-toggle");
        var togg2 = document.querySelector(".mob-menu-toggle");
        var disp2 = getComputedStyle(togg2).display;
        var disp1 = getComputedStyle(togg1).display;
        if (!menuMob.is(e.target) // если клик был не по нашему блоку
            &&
            menuMob.has(e.target).length === 0) { // и не по его дочерним элементам
            menuMob.removeClass('display');
            setTimeout(function () {
                $(".menu-mob .sub-menu-mob_list").each(function (index) {
                    $(this).removeClass('display');
                });

                $(".menu-mob .sub-menu-mob_list").parent().each(function (index) {
                    $(this).removeClass('open');
                });
            }, 100);

            if (disp2 == 'flex' && disp1 == 'block') {
                if (e.target != menuMob && !menuProfileMob.is(e.target)) {
                    overbg.removeClass('display');

                }
            } else if (disp2 == 'flex' && disp1 == 'none') {
                if (e.target != menuMob && menuProfileList.has(e.target).length === 0) {
                    overbg.removeClass('display');
                }

            }
        }
        //end close mob menu onclick other area

        // close mob-profile menu onclick other area
        var menuMobProfile = $(".menu-profile-mob"); // тут указываем ID элемента
        if (!menuMobProfile.is(e.target) // если клик был не по нашему блоку
            &&
            menuMobProfile.has(e.target).length === 0) { // и не по его дочерним элементам
            menuMobProfile.removeClass('display');

        }

        //end mob-profile menu onclick other area

    });




});



//slider info blizzard

let itemsSliderBannerBlizzard = document.querySelectorAll('.banner-blizzard_slide');
let counter = 0;

function doSlider() {

    if (counter > itemsSliderBannerBlizzard.length - 1) {
        counter = 0;
    }
    for (let i = 0; i < itemsSliderBannerBlizzard.length; i++) {
        if (counter == i) {
            itemsSliderBannerBlizzard[i].style.opacity = 1;
        } else {
            itemsSliderBannerBlizzard[i].style.opacity = 0;
        }
    }
    counter++;
}
setInterval(doSlider, 4000);
// end slider info blizzard


//slider games
let sliderGamesContainer = document.querySelector('.slider-games_list');
let sliderGamesItems = document.querySelectorAll('.slider-games_list li');
let nextbtnSliderGames = document.querySelector('.slider-games a.next')
let prevbtnSliderGames = document.querySelector('.slider-games a.prev')
sliderGamesItems.forEach(element => {
    element.style.left = "0px"
})
prevbtnSliderGames.style.display = 'none'
nextbtnSliderGames.addEventListener('click', (e) => {
    e.preventDefault()
    sliderGamesItems.forEach(element => {
        let currentItems = parseFloat(sliderGamesContainer.getBoundingClientRect().width) / (parseFloat(getComputedStyle(element).marginRight) + element.getBoundingClientRect().width);
        let widthElemWithMargin = parseFloat(getComputedStyle(element).marginRight) + element.getBoundingClientRect().width;
        let max = (sliderGamesItems.length - Math.floor(currentItems) - 1) * widthElemWithMargin;
        if (-parseFloat(element.style.left) > max) {
            return
        }
        if (!element.style.left) {
            element.style.left = element.style.left - 187 + 'px';
        } else if (element.style.left) {
            element.style.left = parseFloat(element.style.left) - 187 + 'px';
            prevbtnSliderGames.style.display = ''
        }

    });
})

prevbtnSliderGames.addEventListener('click', (e) => {
    e.preventDefault()

    sliderGamesItems.forEach(element => {
        if (element.style.left == '187px' || element.style.left == '0px') {
            prevbtnSliderGames.style.display = 'none';
            return;
        } else if (parseFloat(element.style.left) == -187) {
            prevbtnSliderGames.style.display = 'none';
            element.style.left = parseFloat(element.style.left) + 187 + 'px';
        } else {
            element.style.left = parseFloat(element.style.left) + 187 + 'px';

        }

    });

});
//end slider games



//open mob menu on btn
let mobMenuBtn = document.querySelector('.mob-menu-toggle');
mobMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let mobMenu = document.querySelector('.menu-mob');
    mobMenu.classList.toggle('display');
    let overBg = document.querySelector('.overlay-bg');
    overBg.classList.add('display');
})
//open mob-profile menu on btn
let mobMenuProfileBtn = document.querySelector('.mob-menu-profle-toggle');
mobMenuProfileBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let mobMenuProfile = document.querySelector('.menu-profile-mob');
    mobMenuProfile.classList.toggle('display')
    let overBg = document.querySelector('.overlay-bg')
    overBg.classList.add('display')
})
//close mob menu on btn
let closeMenuBtn = document.querySelector('.close');
let closeMenuProfile = document.querySelector('.close-profile');
closeMenuBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let mobMenu = document.querySelector('.menu-mob');
    mobMenu.classList.remove('display')
    let overBg = document.querySelector('.overlay-bg')
    overBg.classList.remove('display')
})
//close mob-profile menu on btn
closeMenuProfile.addEventListener('click', (e) => {
    e.preventDefault()
    let mobMenu = document.querySelector('.menu-profile-mob');
    mobMenu.classList.remove('display')
    let overBg = document.querySelector('.overlay-bg')
    overBg.classList.remove('display')

})

let btnSlideContainer = document.querySelector('.slider-scroll_container');
let btnSlideItems = document.querySelectorAll('.slider-scroll_item');

function slideSwitcher() {

    let slides = document.querySelectorAll('.slide');
    clearInterval(activeSlide);
    btnSlideContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('slider-scroll_item')) {
            slides.forEach((slide) => {
                if (slide.classList.contains(e.target.id)) {
                    slide.classList.add('active')
                    e.target.classList.remove('active')
                    e.target.classList.add('active-full')
                } else {
                    slide.classList.remove('active')
                    btnSlideItems.forEach(item => {
                        if (item != e.target) {
                            item.classList.remove('active')
                            item.classList.remove('active-full')
                        }

                    })

                }

            })

            clearInterval(int);
        }
    })

}
slideSwitcher()