$(document).ready(function() {

  $(document).scroll(() => {
    if ($(this).scrollTop() === 0) {
      $('.top-return').css("display", "none");
      $('nav').slideDown();
      return;
    }
    
    $('.top-return').css("display", "flex");
    $('nav').slideUp();

  });

  $('.top-return').on('click', () => {
    window.scrollTo(0, 0);
    if ($('.write-tweet').css('display') === "none") {
      $('.write-tweet').slideDown();
      return;
    }
  });

});

