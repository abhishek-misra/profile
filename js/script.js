 jQuery(document).ready(function () {
    "use strict";

    /*======================================
     Site Header
     ======================================*/
    $('#header-main-menu li a, .home-buttons a').on("click", function (e) {
        if ($(e.target).is('.header-main-menu a, .home-buttons a')) {
            $('.header-main-menu li a').removeClass('active');
            $(this).addClass('active');
            $(".sub-page").hide();
            if (location.pathname.replace(/^\//, '') == e.target.pathname.replace(/^\//, '') && location.hostname == e.target.hostname) {
                var target = $(e.target.hash);
                target = target.length ? target : $('[name=' + e.target.hash.slice(1) + ']');
                if (target.length) {
                    var gap = 0;
                    $(e.target.hash, 'html', 'body').animate({
                        opacity: 'show',
                        duration: "slow",
                        scrollTop: target.offset().top - gap
                    });
                }
            }
            if ($(e.target).is('.home-buttons a')) {
                $("#header-main-menu li a[href='#contact']").addClass('active');
            }
        }
    });


    /*************************
     Responsive Menu
     *************************/
    $('.responsive-icon').on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.header').animate({'margin-left': 285}, 300);
        } else {
            $(this).removeClass('active');
            $('.header').animate({'margin-left': 0}, 300);
        }
        return false;
    });

    $('.header a').on("click", function (e) {
        $('.responsive-icon').removeClass('active');
        $('.header').animate({'margin-left': 0}, 300);

    });

    /*======================================
     Typing Text
     ======================================*/
    $(".typed").typed({
        stringsElement: $('.typed-strings'),
        typeSpeed: 20,
        backDelay: 500,
        loop: true,
        autoplay: true,
        autoplayTimeout: 500,
        contentType: 'html',
        loopCount: true,
        resetCallback: function () {
            newTyped();
        }
    });

    /*======================================
     LightBox
     ======================================*/
    $('[data-rel^=lightcase]').lightcase({
        maxWidth: 1100,
        maxHeight: 800
    });


    /*======================================
     WOW Animation
     ======================================*/
    $('.wow').scrollSpy();
    WOW.prototype.addBox = function(element){
        this.boxes.push(element);
    };
    var wow=new WOW();
    wow.init();
    

    $('.wow').on('scrollSpy:exit',function(){
        var element = $(this);
        element.css({
            'visibility' : 'hidden',
            'animation-name' : 'none'
        }).removeClass('animated');
        wow.addBox(this);
    });

    /*======================================
     Preloader
     ======================================*/
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });

     /*======================================
      Tooltip
     ======================================*/
    $('[data-toggle="tooltip"]').tooltip();   

    /*======================================
      Auto Menu Navigation
     ======================================*/
     autoNavigate();

     setCopyrightYear();
     setExperienceMonth();
     setExperienceYear();
});

var menuArray = ['home','about','resume','education','skills','blog','contact'];

function autoNavigate (){
    var currentUrl= window.location.href;
    var index= currentUrl.indexOf("#");
    if(index > -1){
        var menuName = currentUrl.substring(index+1);
        var isValidMenu = menuArray.includes(menuName);
        if(isValidMenu){
            $('#mnu'+menuName).trigger('click');
        }else{
            var homeMenu = currentUrl.substring(0,index)
            window.location.href = homeMenu;
        }
    }
}

function setCopyrightYear(){
    var currentYear = new moment().format('YYYY');
    $("#copyrightYear").text(currentYear);
}

function setExperienceYear(){
    var starDate=moment().set({'year': 2017, 'month': 6,'date':1});
    var today= new moment();
    var diffYear= today.diff(starDate,'years');
    var diffMonth = today.diff(starDate,'months');
    var remaininigMonth = (diffMonth+1) - (12*diffYear);
    let finalText=""
    if(remaininigMonth > 0){
        finalText = diffYear + "." + remaininigMonth;
    }else{
        finalText = diffYear;
    }
    $("#expTextYear").text(finalText);
}

function setExperienceMonth(){
    var starDate=moment().set({'year': 2017, 'month': 6,'date':1});
    var today= new moment();
    var diffMonth = today.diff(starDate,'months');
    $("#expTextMonth").text(diffMonth+1);
}
 
