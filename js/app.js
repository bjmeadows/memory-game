// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 This is a list of all of the cards that I want to have matched on the page. I assigned each card the same name as it would be for its font awesome assignment
 */
var cardList = ["fa-diamond", "fa-diamond", "fa-anchor", "fa-anchor", "fa-bomb", "fa-bomb", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-paper-plane-o", "fa-paper-plane-o", "fa-bicycle", "fa-bicycle"];



 //the function "shuffles" the card list and then provides the html to display the cards on the page face down, each with a random card assigned to it
function displayCards() {
  for (var x = 0; x < cardList.length; x++) {
    $(".deck").append('<li class="card"> </li>');
  };

  $(".card").each(function(){
    $(this).append("<i>");
  });

  var shuffledList = shuffle(cardList);
  var cards = $(".card i");

  for (var x = 0; x < shuffledList.length; x++) {

    $(cards[x]).addClass("fa " + shuffledList[x]);

  };
};

displayCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //This function flips the cards when they are clicked on as an event listener

$(".card").on('click', function flip(){
  $(this).addClass('open show');
  return specificClick = $(".fa > a");
});

//Restart function that sets all of the settings back to default
$(".restart").on('click', function(){
  $('.card').remove();
  displayCards();
});
