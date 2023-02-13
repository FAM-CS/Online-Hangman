/*******************************************************************************
 * Program Filename: index.js
 * Description:
 *     File for client side html and logic
 *******************************************************************************/


/*********************************************************************
 ** Global Variables
 *********************************************************************/
var geuss_bank = document.querySelector(".guess-bank")
const keyboard = document.querySelector(".keyboard")
const keys = document.querySelectorAll(".keyboard button")

// WORD HANDLING
var word_container = document.querySelectorAll(".word-container .letter-guess")     // use .childNodes to access bits
var correct_word = "agile"
var INCORRECT_TRIES = 0
var REVEALED_LETTERS = 0


keyboard.addEventListener("click", function(event) {
    console.log("Clicked on keyboard: ", event.target)

    if (event.target.nodeName == "BUTTON") {
        const letter = event.target.textContent
        handle_player_guess(letter)
    }
})


function handle_player_guess(guessed_letter) {
    // Check if letter is in correct word
    if (correct_word.includes(guessed_letter.toLowerCase())) {
        correct_guess(guessed_letter.toLowerCase())
    }
    // Else, add to guess bank
    else {
        incorrect_guess(guessed_letter)
    }
}


function correct_guess(guessed_letter) {
    word_container.forEach((curr_letter, index) => {
        // console.log("LOOP: , i: ", curr_letter, index);
        if (correct_word[index] == guessed_letter && curr_letter.textContent != guessed_letter) {
            curr_letter.textContent = guessed_letter
            REVEALED_LETTERS++

            if (REVEALED_LETTERS === correct_word.length) {
                alert("You won! Hit OK to play again")
                reset_game()
            }
        }
    })
}


function incorrect_guess(guessed_letter) {
    // Only add letter if not already guessed
    var guesses_text = document.querySelector(".guess-bank").textContent
    //
    if (!guesses_text.includes(guessed_letter)) {
        var unused_letter = document.createElement("div")
        unused_letter.classList.add("unused-letter")
        unused_letter.textContent = guessed_letter.toUpperCase()

        geuss_bank.appendChild(unused_letter)

        // Update hangman image
        INCORRECT_TRIES++
        var hangman_img = document.getElementById("bob-id")
        hangman_img.src = "/OUT/BobV" + INCORRECT_TRIES + ".png"
        // console.log("IMG: ", hangman_img)

        if (INCORRECT_TRIES === 6) {
            alert("Gameover! Hit OK to play again")
            reset_game()
        }
    }
}


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

 /*********************************************************************
 ** Function:
 ** Description:
 **
 ** Parameters:
 **     None
 *********************************************************************/
