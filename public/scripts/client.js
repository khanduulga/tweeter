/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */ 

//creates and returns a string using given tweet object
function createTweetElement(tweet) {
  const $tweet = `
  <article class="tweet">
  <header>
  <h3>${escape(tweet.user.name)}</h3>
  <h3 class="handle">${escape(tweet.user.handle)}</h3>
  </header>  
  <p>${escape(tweet.content.text)}</p>
  <footer>
  <div>${escape(tweet.created_at)}</div>
  <div>Share and Subscribe</div>
  </footer>  
  </article>  
  `;  
  return $tweet;
}  

//helper function for createTweetElement to help escape and secure text inputs
function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderTweets(tweets) {
  for(const tweet of tweets) {
    $("#all-tweets").prepend(createTweetElement(tweet));
  }  
}  

//helper function for submitTweet, clears the section element that holds tweets
function clearTweets() {
  $("#all-tweets").empty();
}

function submitTweet(event) {
  event.preventDefault();
  const tweet = $(".new-tweet-box").serialize();
  const tweetForLengthCheck = tweet.replaceAll("%20", "+");
  const tweetLength = tweetForLengthCheck.length - 5;           //for "text="

  //check if tweet is empty or too lengthy
  if (tweetLength < 141 && tweetForLengthCheck.length !== 5) {
    //animate away error message
    $(".new-tweet #error").slideUp("slow");

    //send to new tweet
    $.ajax("/tweets", {method: "POST", data: tweet})
    .then((res) => {
      clearTweets();
      loadTweets();
    })
  } else if (tweetLength > 140) {
    //For being too long
    $(".new-tweet #error").text("Too Long! A tweet needs to be 140 characters in total!");
    $(".new-tweet #error").slideDown("slow", () => {
      $(".new-tweet #error").css("display", "flex");
    });    
  } else {
    //For being empty
    $(".new-tweet #error").text("Empty?! A tweet needs to be atleast 1 characters long!");
    $(".new-tweet #error").slideDown("slow", () => {
      $(".new-tweet #error").css("display", "flex");
    });

  }
}

//get request for /tweets 
//receives an array of tweets as JSON
function loadTweets() {
  $.ajax("/tweets", {method: "GET"})
  .then((res) => {
    renderTweets(res);
  });
}

//Main func calls after DOM is ready
$(document).ready(function() {
  $(".new-tweet-box").submit(submitTweet); 
  loadTweets();
})