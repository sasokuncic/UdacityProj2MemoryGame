/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];
// prepare the deck of all cards in the game
const deck = document.getElementById("cards-deck");

// opened cards array
let cardsOpened = [];

// number of moves
let cardMoves = 0;
let cardMovesCounter = document.querySelector(".moves");

// @description start new game when page is refreshed
document.body.onload = startGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// @description start a new game 
function startGame(){
    cards = shuffle(cards);
    // remove existing deck DOM
    deck.innerHTML = '';
    // remove all exisiting classes from each card
    // attach each card to the deck
    cards.forEach.call(cards, function(card) {
        card.classList.remove('show', 'open', 'match', 'disabled');
        //card.classList.add('open'); // DBG (debug statement)
        deck.appendChild(card);
    });    
    // reset moves
    cardMoves = 0;
    cardMovesCounter.innerHTML = cardMoves;
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', function (event) {
    // The event target is our clicked item
    let clicked = event.target;

    // Do not allow the grid section itself to be selected; only select divs inside the grid
    if (clicked.nodeName === 'SECTION') { console.log('deck clicked'); return; }    // DBG
  
    if (cards.length > cardsOpened.length) {
        clicked.classList.add('open', 'show');
        cardsOpened.push(clicked);        
        console.log(clicked.type);  // DBG
    };
    cardsSelections();
    if (cards.length == cardsOpened.length) {
        console.log ('All cards clicked!'); // DBG
    }
 });

 // @description count player's moves
function cardsSelections(){
    cardMoves++;
    cardMovesCounter.innerHTML = cardMoves;

    //start timer on first click
    if(cardMoves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
        console.log(timer.innerHTML); // DBG
    },1000);
}
