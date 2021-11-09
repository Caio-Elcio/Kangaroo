$('.slides').slick({
  lazyLoad: 'ondemand',
  centerMode: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
});

// EFEITO MENU

type = "text/javascript" >
  jQuery(function () {
    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 50) {
        $("#menu").addClass("menu-diferente");
      } else {
        $("#menu").removeClass("menu-diferente");
      }
    });
  });
  
jQuery(function () {
  jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 50) {
      $("#menu").css('background-color', 'rgba(54,74,107,1)');
    } else {
      $("#menu").css('background-color', 'rgba(255,255,255,0)');
      $("#menu").css('animation', 'linear');
    }
  });
});