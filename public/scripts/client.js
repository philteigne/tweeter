/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  //  add event listener that posts to /tweets
  $('#compose-tweet').on("submit", (event) => {
    if ($('#compose-tweet')[0][2].value < 0) {
      alert("Submitted tweet exceeds character limit");
      event.preventDefault();
      return;
    }

    if ($('#compose-tweet')[0][2].value >= 140 || $('#compose-tweet')[0][2].value === null) {
      alert("Cannot submit a blank tweet");
      event.preventDefault();
      return;
    }

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $('#compose-tweet').serialize(),
    })
      .then(loadTweets());

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
                          <h3>${tweetObject.user.name}</h3>
                        </div>
                        <h4>${tweetObject.user.handle}</h4>
                      </header>
                      <p>${tweetObject.content.text}</p>
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