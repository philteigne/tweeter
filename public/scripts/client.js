/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// @ts-ignore
$(document).ready(function() {

  //  escape non text user inputs to prevent XSS
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //  add event listener that posts to /tweets
  $('#compose-tweet').on("submit", (event) => {
    if ($('#compose-tweet')[0][2].value < 0) {
      console.log("long tweet");
      $('#error-message').empty();
      $('#error-message').text("Submitted tweet exceeds character limit");
      event.preventDefault();
      return;
    }

    if ($('#compose-tweet')[0][2].value >= 140 || $('#compose-tweet')[0][2].value === null) {
      console.log("empty tweet");
      $('#error-message').empty();
      $('#error-message').text("Cannot submit a blank tweet");
      $('#error-message').slideDown();
      event.preventDefault();
      return;
    }

    if ($('#compose-tweet')[0][2].value > 0 && $('#compose-tweet')[0][2].value <= 140) {
      $('#error-message').slideUp();
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $('#compose-tweet').serialize(),
    })
      .then(() => {
        $('#compose-tweet')[0].reset();
      })
      .then(() => {
        loadTweets();
      });

    event.preventDefault();
  });

  // fetch tweets from /tweets
  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
    })
      .then((allTweets) => {
        renderTweets(allTweets);
      });
  };

  //  Take in a tweet object and return a tweet <article> element containing the html structure of the tweet
  const createTweetElement = (tweetObject) => {
    let $tweet = `<article>
                    <div class="tweet-container">
                      <header class="tweet-author">
                        <div class="tweet-author">
                          <i class="fa-solid fa-person"></i>
                          <h3>${escape(tweetObject.user.name)}</h3>
                        </div>
                        <h4>${escape(tweetObject.user.handle)}</h4>
                      </header>
                      <p>${escape(tweetObject.content.text)}</p>
                      <footer>
                        <a class="date">${timeago.format(tweetObject.created_at)}</a>
                        <div class = "social-symbols">
                          <i class="fa-sharp fa-solid fa-flag"></i>
                          <i class="fa-solid fa-retweet"></i>
                          <i class="fa-solid fa-heart"></i>
                        </div>
                      </footer>
                    </div>
                  </article>`;
    
    return $tweet;
  };

  //  take in an array of tweet objects then append each one to the #tweets-container
  const renderTweets = (tweets) => {
    $('#tweets-container').empty();
    for (let i of tweets.reverse()) {
      $('#tweets-container').append(createTweetElement(i));
    }
  };

  loadTweets();
});