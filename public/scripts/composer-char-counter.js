//javascipt for counter under the Compose message box

$(document).ready(function() {
  const textbox = $("#tweet-text");
  textbox.on("keyup", function(event) {
    const charLength = $(this).val().length;
    let counter = $($(this).next().children()[1]);
    if ((140 - charLength) < 0) {
      counter.addClass("red-counter");
    } else {
      counter.removeClass("red-counter");
    }
    counter.val(140 - charLength);
  })
  
})



