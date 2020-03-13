$(document).ready(function() {
    var sidebarInner = $(".sidebar__inner"),
        mainInner = $(".main__inner");
    initialSidebarTopPos = sidebarInner.offset().top,
        initialMainBotPos = mainInner.offset().top + mainInner.height(),
        progressBar = $(".focused .progress-bar"),
        dropDownList = $('.dropdown-list');


    $('.button-js').click(function(e) {
        e.preventDefault();
        // alert('hi')
        $(this).toggleClass('active');
        dropDownList.toggleClass('active')
        dropDownList.mCustomScrollbar({

        });
    })


    $('.close-layer').mouseup(function(e) { // отслеживаем событие клика по веб-документу

        if (!$(e.target).hasClass('dropdown-list')) { // проверка условия если клик не по его дочерним элементам
            dropDownList.removeClass('active');
            $('.button-js').removeClass('active');
        }
    });





    $(window).scroll(function(e) {
        setSideBarPos()

    });


    $(window).on("load", function() {
        sidebarInner.mCustomScrollbar({
            scrollbarPosition: 'outside'
        });
    });

    function setScrolledPercent() {
        var mainInnerHeight = mainInner.height(),
            mainInnerTop = mainInner.offset().top,
            sidebarInnerTop = sidebarInner.offset().top + sidebarInner.height(),
            widthPercent = ((sidebarInnerTop - mainInnerTop) / mainInnerHeight) * 100;
        progressBar.css("width", widthPercent + "%");

    }

    function setSideBarPos() {
        var sidebarBotPos = sidebarInner.offset().top + sidebarInner.height(),
            mainBotPos = mainInner.offset().top + mainInner.height(),
            windowBotOffset = $(window).scrollTop() + $(window).height();




        if ($(window).scrollTop() > initialSidebarTopPos) {
            $('.sidebar').removeClass("max");
            sidebarInner.addClass("fixed");
            setScrolledPercent();
        } else {
            sidebarInner.removeClass("fixed");
            progressBar.css("width", 0);
        }
        if (windowBotOffset >= mainBotPos) {

            sidebarInner.removeClass("fixed");
            $('.sidebar').addClass("max");
        }
    }
    setSideBarPos()
});



//open mob menu on btn
let mobMenuBtn = document.querySelector('.mob-menu-toggle');
mobMenuBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let mobMenu = document.querySelector('.menu-mob');
        mobMenu.classList.toggle('display')
        let overBg = document.querySelector('.overlay-bg')
        overBg.classList.add('display')
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
    })
    //close mob-profile menu on btn
closeMenuProfile.addEventListener('click', (e) => {
    e.preventDefault()
    let mobMenu = document.querySelector('.menu-profile-mob');

    mobMenu.classList.remove('display')

})
let prevElement;
$(".menu_list > li > a").on("click", function(e) {
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
            $("li.open li").each(function(index) {
                $(this).removeClass('active-open');
            });
            $(".sub-menu_container_title").each(function(index) {
                $(this).removeClass('title-open');
            });

            $(".menu_list > li > div").each(function(index) {
                $(this).removeClass('display');
                $(this).parent().removeClass('open');
            });
            overbg.removeClass('display');

        } else {
            //если при открытом выпадающем меню кликнуть на дургое, то предыдущее закрывается
            if (!prevElementDisplay == elemD) {
                $(".menu_list > li > div").each(function(index) {
                    $(this).removeClass('display');
                    $(this).parent().removeClass('open');
                });
            }
            //
            elem.addClass('display');
            overbg.addClass('display');
            $(this).parent().addClass('open');
            setTimeout(function() {
                $(".sub-menu_container_title").each(function(index) {
                    $(this).addClass('title-open');
                });
                $("li.open li").each(function(index) {
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
$(".menu-profile_list > li > a").on("click", function(e) {
    var overbg = $(".overlay-bg");
    var elem = $(this).parent().children("div");
    var elemD = $(this).parent().children("div").hasClass('display');
    if (elem.hasClass('sub-menu')) {
        e.preventDefault();
        if (elemD) {
            overbg.removeClass('display');
            $(".menu-profile_list > li > div").each(function(index) {
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
$(".menu-mob_list > li > a").on("click", function(e) {
    var elem = $(this).parent().children("ul");
    var elemD = $(this).parent().children("ul").hasClass('display');
    if (elem.hasClass('sub-menu-mob_list')) {
        e.preventDefault();

        if (elemD) {
            $(".menu-mob_list > li > ul").each(function(index) {
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
$(document).mouseup(function(e) { // событие клика по веб-документу
    var overbg = $(".overlay-bg");
    var div = $(".menu_list"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        &&
        div.has(e.target).length === 0) { // и не по его дочерним элементам
        overbg.removeClass('display');
        setTimeout(function() {
            $("li.open li").each(function(index) {
                $(this).removeClass('active-open');
            });
            $(".menu_list > li > div").each(function(index) {
                $(this).removeClass('display');
            });

            $(".menu_list > li").each(function(index) {
                $(this).removeClass('open');
            });
        }, 100);

    }
});
// close profile menu onclick other area
$(document).mouseup(function(e) { // событие клика по веб-документу
    var overbg = $(".overlay-bg");
    var div = $(".menu-profile_list"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        &&
        div.has(e.target).length === 0) { // и не по его дочерним элементам
        overbg.removeClass('display');
        setTimeout(function() {
            $(".menu-profile_list > li > div").each(function(index) {
                $(this).removeClass('display');
            });

            $(".menu-profile_list > li").each(function(index) {
                $(this).removeClass('open');
            });
        }, 100);

    }
});
// close mob menu onclick other area
$(document).mouseup(function(e) { // событие клика по веб-документу
    var overbg = $(".overlay-bg");
    var div = $(".menu-mob"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        &&
        div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.removeClass('display');
        overbg.removeClass('display');
        setTimeout(function() {
            $(".menu-mob .sub-menu-mob_list").each(function(index) {
                $(this).removeClass('display');
            });

            $(".menu-mob .sub-menu-mob_list").parent().each(function(index) {
                $(this).removeClass('open');
            });
        }, 100);

    }
});
// close mob-profile menu onclick other area
$(document).mouseup(function(e) { // событие клика по веб-документу
    var overbg = $(".overlay-bg");
    var div = $(".menu-profile-mob"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        &&
        div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.removeClass('display');
        overbg.removeClass('display');


    }
});

let itemsMenu = document.querySelectorAll('.menu-container li');
itemsMenu.forEach((item) => {
    if (item.querySelector('.sub-menu')) {
        item.children[0].insertAdjacentHTML('beforeend', ' <i class="fas fa-chevron-down"></i>');
    }
})