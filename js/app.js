var openCards = [];
var matchedCards = [];
var scoreCounter = 0;
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
};

/*
 This is a list of all of the cards that I want to have matched on the page. I assigned each card the same name as it would be for its font awesome assignment
 */
var cardList = ["fa-diamond", "fa-diamond", "fa-anchor", "fa-anchor", "fa-bomb", "fa-bomb", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-paper-plane-o", "fa-paper-plane-o", "fa-bicycle", "fa-bicycle"];



//this function displays all of the cards in html. It also adds a child DOM element of "i" which will hold the class fa for each card. It was easier to do it this way after deleting it from the html than to input it all in html again.
function displayCards() {
  for (var x = 0; x < cardList.length; x++) {
    $(".deck").append('<li class="card"> </li>');
  };
};

displayCards();

 //the function "shuffles" the card list and then provides the html to display the cards on the page face down, each with a random card assigned to it

function shuffleCards() {
  $(".card").each(function(){
    $(this).append("<i>");
  });


  var cards = $(".card i");
  var shuffledList = shuffle(cardList);
  for (var x = 0; x < shuffledList.length; x++) {

    $(cards[x]).addClass("fa " + shuffledList[x]);

  };
};

shuffleCards()

//Flips cards back to blank state
function flipBack(){
  $('.open').toggleClass('open show');
};

//Restart function that sets all of the card settings back to not open and reshuffles the game
$(".restart").on('click', function resetGame(){
  $('.card').removeClass('open show');
  $('.card').removeClass('match');
  $('.card i').remove();
  resetOpenCards();
  shuffleCards();
  scoreCounter = 0;
  $('.moves').html(scoreCounter);
  matchedCards = [];
  resetStars();
});


function flipCards(){

  if (openCards.length === 0) {
      $(this).toggleClass('open show');
      openCards.push($(this));
    } else if (openCards.length === 1 && (!$(this).hasClass('open show')) && (!$(this).hasClass('match'))) {
      $(this).toggleClass('open show');
      openCards.push($(this));
      doesMatch();
      scoreCounter++;
      moveCounted();
      starRating();
      winChecker();
    };
  };


function doesMatch(){
  //if the two match in matchChecker push both to matched Cards and add the matched class to the html for those elements
  // if they do not match then it resets them back to the default state
  if (openCards.length === 2){
    if (openCards[0].html() === openCards[1].html()) {
      $(openCards[0].removeClass('open show'));
      $(openCards[1].removeClass('open show'));
      $(openCards[0].addClass('match'));
      $(openCards[1].addClass('match'));
      matchedCards.push(openCards[0, 1]);
      resetOpenCards();
    } else if (openCards[0].html() != openCards[1].html()) {
      setTimeout(flipBack, 500);
      setTimeout(resetOpenCards, 500);
    };
  };
};
//


function resetOpenCards(){
  openCards = [];
};

function playGame() {
  $('.card').on('click', flipCards);
};


//Counts each move and edits the html to show the score
function moveCounted() {
  $('.moves').html(scoreCounter);
};

//Changes the star rating based on overall score
function starRating() {
  if (scoreCounter === 15) {
    $('.stars li .fa.fa-star').last().replaceWith('<i class = "fa fa-star-o"> </i>');
  } else if (scoreCounter === 20) {
    $('.stars li .fa.fa-star').last().replaceWith('<i class = "fa fa-star-o"> </i>');
  } else if (scoreCounter === 25) {
    $('.stars li .fa.fa-star').last().replaceWith('<i class = "fa fa-star-o"> </i>');
  }
};

function resetStars() {
  $('.stars li .fa.fa-star-o').replaceWith('<i class = "fa fa-star"> </i>')
}

function winPopUp() {
  $('.modal').css({display: "block"});
  $('.close-button').on('click', function resetGame(){
    $('.card').removeClass('open show');
    $('.card').removeClass('match');
    $('.card i').remove();
    resetOpenCards();
    shuffleCards();
    scoreCounter = 0;
    $('.moves').html(scoreCounter);
    matchedCards = [];
    $('.modal').css({display: 'none'});
    resetStars();
  });
};

function winChecker(){
  //checks the length of matchedCards array to see if it equals the same length as cardList. If it does then the won game popup appears and if not then you continue the game
  if (matchedCards.length === 8) {
    $('#score-number').html("Final Score: " + scoreCounter + " Moves");
    $('.stars').clone().appendTo('#star-score');
    winPopUp();
  }
};

playGame();
