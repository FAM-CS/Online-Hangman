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

// use .childNodes to access bits
var word_container = document.querySelectorAll(".word-container .letter-guess")

var correct_word = "agile"


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
        guessed_letter = guessed_letter.toLowerCase()

        word_container.forEach((curr_letter, index) => {
            // console.log("LOOP: , i: ", curr_letter, index);
            if (correct_word[index] == guessed_letter && curr_letter.textContent != guessed_letter) {
                curr_letter.textContent = guessed_letter
            }
        })
    }
    // Else, add to guess bank
    else {
        var guesses = document.querySelector(".guess-bank")
        var guesses_text = guesses.textContent

        // Only add letter if not already guessed
        if (!guesses_text.includes(guessed_letter)) {
            var unused_letter = document.createElement("div")
            unused_letter.classList.add("unused-letter")
            unused_letter.textContent = guessed_letter.toUpperCase()

            geuss_bank.appendChild(unused_letter)
        }
    }
}



 /*********************************************************************
 ** Function:
 ** Description:
 **
 ** Parameters:
 **     None
 *********************************************************************/
