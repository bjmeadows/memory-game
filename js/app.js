var openCards = [];
var matchedCards = [];
var scoreCounter = 0;
var timerValue = 1;
var timerOn = false;
var timedStart;

function shuffle(array) {
	// Shuffle function from http://stackoverflow.com/a/2450976
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

function timerFunction() {
	// This function creates the timer for the game
	timedStart = setInterval(function() {
		$('.timer').html(timerValue);
		timerValue++;
	}, 1000);
}


function stopTimer(){
	// This function stops the timer
	clearInterval(timedStart);
}

function startTimer(){
	// This function starts the timer, and is called below with an event listener
	if (timerOn != true){
		timerOn = true;
		timerFunction();
	}
}

/*
 This is a list of all of the cards that I want to have matched on the page. 
 I assigned each card the same name as it would be for its font awesome assignment
 */
var cardList = ["fa-diamond", "fa-diamond", "fa-anchor", "fa-anchor", "fa-bomb", "fa-bomb", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-paper-plane-o", "fa-paper-plane-o", "fa-bicycle", "fa-bicycle"];

function displayCards() {
	/* This function displays all of the cards in html. It also adds a child 
	DOM element of "i" which will hold the class fa for each card. It was 
	easier to do it this way after deleting it from the html than to input it 
	all in html again. */
	for (var x = 0; x < cardList.length; x++) {
		$(".deck").append('<li class="card"> </li>');
	}
}

displayCards();

/* The function "shuffles" the card list and then provides the html to display
the cards on the page face down, each with a random card assigned to it */

function shuffleCards() {
	$(".card").each(function() {
		$(this).append("<i>");
	});

	var cards = $(".card i");
	var shuffledList = shuffle(cardList);
	for (var x = 0; x < shuffledList.length; x++) {

		$(cards[x]).addClass("fa " + shuffledList[x]);

	}
}

shuffleCards()

function flipBack(){
	// Flips cards back to blank state
	$('.open').toggleClass('open show');
}

function resetTimer(){
	// Simple function to reset the timer to 0
	timerValue = 0;
	$('.timer').html(timerValue);
	timerOn = false;
	stopTimer();
}

$(".restart").on('click', function resetGame(){
	// Restart function that sets all of the card settings back to not open and reshuffles the game
	$('.card').removeClass('open show');
	$('.card').removeClass('match');
	$('.card i').remove();
	resetOpenCards();
	shuffleCards();
	scoreCounter = 0;
	$('.moves').html(scoreCounter);
	matchedCards = [];
	resetStars();
	resetTimer();
});

function flipCards() {
	// This function flips the cards over on click when called below
	/* The first part of the if statement starts the timer and will open a card 
	when clicked. It will push the opened card to the openCards array to check
	if there is a match once a second card is clicked
	*/
	if (openCards.length === 0) {
		$(this).toggleClass('open show');
		openCards.push($(this));
		timeStart = true;
	}
	/* The second part of this if statement will only happen if there is already
	one card open. It also will not occur if you click the same card twice.
	Once a second card is opened it will compare whether or not the two cards
	match, it will increase the score, and will check if all of the cards are
	matched. */
	else if (openCards.length === 1 && (!$(this).hasClass('open show')) && (!$(this).hasClass('match'))) {
		$(this).toggleClass('open show');
		openCards.push($(this));
		doesMatch();
		scoreCounter++;
		moveCounted();
		starRating();
		winChecker();
	}
}

function doesMatch() {
	/* If the two match in matchChecker push both to matched Cards and add the
	matched class to the html for those elements */
	// If they do not match then it resets them back to the default state
	if (openCards.length === 2) {
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
		}
	}
}

function resetOpenCards() {
	// Simple function to return the open cards array to empty.
	openCards = [];
}

function moveCounted() {
	// Counts each move and edits the html to show the score
	$('.moves').html(scoreCounter);
}

function starRating() {
	// Changes the star rating based on overall score
	if (scoreCounter === 20) {
		$('.stars li .fa.fa-star').last().replaceWith('<i class = "fa fa-star-o"> </i>');
	} else if (scoreCounter === 25) {
		$('.stars li .fa.fa-star').last().replaceWith('<i class = "fa fa-star-o"> </i>');
	} else if (scoreCounter === 30) {
		$('.stars li .fa.fa-star').last().replaceWith('<i class = "fa fa-star-o"> </i>');
	}
}

function resetStars() {
	// Resets the stars back to 3 stars once the game is reset
	$('.stars li .fa.fa-star-o').replaceWith('<i class = "fa fa-star"> </i>')
	$('#star-score').html('Stars: ');
}

function winChecker() {
	/* Checks the length of matchedCards array to see if it equals the same
	length as cardList. If it does then the won game popup appears and if not
	then you continue the game */
	if (matchedCards.length === 8) {
		$('#score-number').html("Final Score: " + scoreCounter + " Moves");
		$('.stars').clone().appendTo('#star-score');
		$('#time-score').html('Time: ' + timerValue + " seconds");
		stopTimer();
		winPopUp();
	}
}

function winPopUp() {
	/* This triggers the modal when you win. If you click play again it resets 
	the game. If you click the "x" button it will close the modal. */
	$('.modal').css({display: "block"});
	$('.play-again').on('click', function resetGame(){
		$('.card').removeClass('open show');
		$('.card').removeClass('match');
		$('.card i').remove();
		resetTimer();
		resetOpenCards();
		shuffleCards();
		scoreCounter = 0;
		$('.moves').html(scoreCounter);
		matchedCards = [];
		$('.modal').css({display: 'none'});
		resetStars();
	});
	$('.close-button').on('click', function closeWindow(){
		$('.modal').css({display: "none"});
	});
}

function playGame() {
	//This function starts the game with an event listener, as well as is the listener to start the timer.
	$('.card').on('click', flipCards);
	$('.card').on('click',startTimer);
}

playGame();
