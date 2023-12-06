$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    let wordCount = $(this).val().length;
    if (wordCount > 140) {
      $('output').css("color", "red");
    }
    if (wordCount < 140) {
      $('output').css("color", "black");
    }
    
    $(this.parentNode).find('.counter').val(140 - wordCount);
  });
});

