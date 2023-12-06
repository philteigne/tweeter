$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    let wordCount = $(this).val().length;
    console.log("wordCount", wordCount);
    if (wordCount > 140) {
      $('output').css("color", "red");
    }
    if (wordCount < 140) {
      $('output').css("color", "black");
    }
    
    console.log($(this.parentNode).find('.counter').val(140 - wordCount));
  });
});

