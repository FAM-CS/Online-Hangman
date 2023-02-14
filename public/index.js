#!/usr/bin/env js

/*********************************************************************
 ** Global Variables
 *********************************************************************/
var guess_bank = document.querySelector(".guess-bank")
var keyboard = document.querySelector(".keyboard")
//~ WORD HANDLING
var word_container = document.querySelectorAll(".word-container .letter-guess")     // use .childNodes to access bits
var INCORRECT_TRIES = 0
var REVEALED_LETTERS = 0
var correct_word = "agile"


/*********************************************************************
 ** Global Constants
 *********************************************************************/
const keys = document.querySelectorAll(".keyboard button")
const ASCII_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


// LISTEN for key presses if in alphabet
document.addEventListener("keydown", function(event) {
    // ?Source: https://javascript.info/keyboard-events
    console.log("Key: ", event.key)
    console.log("type: ", typeof(event.key))
    if (ASCII_LETTERS.includes(event.key)) {
        handle_player_guess(event.key)
    }
})

// LISTEN for key button clicks
keyboard.addEventListener("click", function(event) {
    console.log("Clicked on keyboard: ", event.target)

    if (event.target.nodeName == "BUTTON") {
        const letter = event.target.textContent
        handle_player_guess(letter)
    }
})


 /*********************************************************************
  * Determine if guess was correct and call appropriate action
  *
  * @param {string} guessed_letter - letter that was guessed (uppercase)
  * @returns None
  */
function handle_player_guess(guessed_letter) {
    // Check if letter is in correct word
    if (correct_word.includes(guessed_letter.toLowerCase())) {
        correct_guess(guessed_letter.toLowerCase())
    }
    // Else, add to guess bank
    else {
        incorrect_guess(guessed_letter.toUpperCase())
    }
}


 /*********************************************************************
  * Handle correct guess and update word appearance, detect if game ends (win)
  *
  * @param {string} guessed_letter - letter that was guessed (lowercase)
  * @returns None
  */
function correct_guess(guessed_letter) {
    word_container.forEach((curr_letter, index) => {
        // console.log("LOOP: , i: ", curr_letter, index);
        if (correct_word[index] == guessed_letter && curr_letter.textContent != guessed_letter) {
            curr_letter.textContent = guessed_letter
            REVEALED_LETTERS++
        }
    })

    if (REVEALED_LETTERS === correct_word.length) {
        //! Alert triggered before image could change, fix with timeout
        // https://stackoverflow.com/questions/41936043/javascript-alert-supersedes-preceding-code
        setTimeout(function () {
            alert("You won! Hit OK to play again")
            reset_game()
        }, 200)
    }
}


 /*********************************************************************
  * Handle incorrect guess and update bob's appearance, detect if game ends
  *
  * @param {string} guessed_letter - letter that was guessed (uppercase)
  * @returns None
  */
function incorrect_guess(guessed_letter) {
    // Only add letter if it was not already guessed
    var guesses_text = document.querySelector(".guess-bank").textContent
    //
    if (!guesses_text.includes(guessed_letter)) {
        var unused_letter = document.createElement("div")
        unused_letter.classList.add("unused-letter")
        unused_letter.textContent = guessed_letter.toUpperCase()

        guess_bank.appendChild(unused_letter)

        // Update hangman image
        INCORRECT_TRIES++
        var hangman_img = document.getElementById("bob-id")
        hangman_img.src = "/OUT/BobV" + INCORRECT_TRIES + ".png"
    }

    // Check if game is over
    if (INCORRECT_TRIES === 6) {
        //! Alert triggered before image could change, fix with timeout
        // https://stackoverflow.com/questions/41936043/javascript-alert-supersedes-preceding-code
        setTimeout(function () {
            alert("Gameover! Hit OK to play again")
            reset_game()
        }, 200)
    }
}

 /*********************************************************************
  * Reset game
  *
  * @param None
  * @returns None
  */
function reset_game() {
    INCORRECT_TRIES = 0
    REVEALED_LETTERS = 0

    var guesses = document.querySelector(".guess-bank")
    guesses.textContent = ""

    word_container.forEach(curr_letter => {
            curr_letter.textContent = ""
    })

    var hangman_img = document.getElementById("bob-id")
    hangman_img.src = "/OUT/BobV0.png"
}
