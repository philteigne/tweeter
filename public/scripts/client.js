/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

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
                        <a class="date">${tweetObject.created_at}</a>
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
    for (let i of tweets) {
      $('#tweets-container').append(createTweetElement(i));
    }
  };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);
});

