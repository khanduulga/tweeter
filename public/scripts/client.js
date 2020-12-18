/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//helper for converting dates to strings
//TAKEN FROM STACKOVERFLOW BY Masih Jahangiri
function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

//creates and returns a string using given tweet object
function createTweetElement(tweet) {
  const $tweet = `
  <article class="tweet">
    <header>
      <div>
        <img src="${tweet.user.avatars}" class="avatar">
        <h4>${escape(tweet.user.name)}</h4>
      </div>
      <div>
        <h4 class="handle">${escape(tweet.user.handle)}</h4>
      </div>
    </header>  
      <p>${escape(tweet.content.text)}</p>
    <footer>
      <div>${escape(timeSince(tweet.created_at))}</div>
      <div>F R L</div>
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
  for (const tweet of tweets) {
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
  const tweetLength = decodeURIComponent(tweet).length - 5;           //for "text="

  //check if tweet is empty or too lengthy
  if (tweetLength < 141 && tweetLength !== 0) {
    //animate away error message
    $(".new-tweet #error").slideUp("slow");

    //send to new tweet
    $.ajax("/tweets", {method: "POST", data: tweet})
      .then(() => {
        clearTweets();
        loadTweets();
        $(".new-tweet #tweet-text").val("");
        $(".new-tweet output").val(140);
      });
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
});