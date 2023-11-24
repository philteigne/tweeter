$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    let wordCount = $(this).val().length;
    console.log($(this.parentNode).find('.counter').val(140 - wordCount));
  });
});

