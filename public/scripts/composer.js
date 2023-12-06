$(document).ready(function() {

  $(document).scroll(() => {
    //  hide top-return if user is at the top of the page
    if ($(this).scrollTop() === 0) {
      $('.top-return').css("display", "none");
      $('nav').slideDown();
      return;
    }
    
    //  show the top return and hide nav bar if the user scrolls down
    $('.top-return').css("display", "flex");
    $('nav').slideUp();

  });

  //  top return click listener
  $('.top-return').on('click', () => {
    window.scrollTo(0, 0);
    if ($('.write-tweet').css('display') === "none") {
      $('.write-tweet').slideDown();
      return;
    }
  });

});

