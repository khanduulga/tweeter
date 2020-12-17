/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */ 


// Test / driver code (temporary). Eventually will get this from the server.
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
]


function createTweetElement(tweet) {
  const $tweet = `
    <article class="tweet">
      <header>
        <h3>${tweet.user.name}</h3>
        <h3 class="handle">${tweet.user.handle}</h3>
      </header>  
      <p>${tweet.content.text}</p>
      <footer>
        <div>${tweet.created_at}</div>
        <div>Share and Subscribe</div>
      </footer>  
    </article>  
  `;  
  return $tweet;
}  

function renderTweets(tweets) {
  for(const tweet of tweets) {
    $("#all-tweets").append(createTweetElement(tweet));
  }  
}  

function submitTweet(event) {
  event.preventDefault();
  const tweet = $(".new-tweet-box").serialize();
  $.ajax("/tweets", {method: "POST", data: tweet})
  .then((res) => {
    console.log(res);
  })
}

$(document).ready(function() {
  renderTweets(data);
  $(".new-tweet-box").submit(submitTweet);

  // form.submit(function(event) {
    // event.preventDefault();
  //   console.log('THIS', serialForm);
  //   $.ajax("/tweets", { 
  //     method: "POST",
  //     data: serialForm
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  // })
})