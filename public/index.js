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

 
function handle_player_guess(letter) {
    letter = letter.toLowerCase()
    if (correct_word.includes(letter)) {
        for (var l in word_container) {
            console.log("LOOP:", word_container[l]);
            if (word_container[l].textContent== letter) {
                word_container[l].toggleAttribute("hidden")
            }
        }
    }
    // if (correct_word.includes(letter)) {
    // Check if letter is correct
    //     word_container.forEach(function(corr_letter){
    //             console.log("Letter go: ", corr_letter.textContent)
    //             if (corr_letter.textContent == letter) {
    //                 corr_letter = corr_letter.toggle("hidden")
    //             }
    //         })
    // }
    else {
        // Else, add to guess back
        var unused_letter = document.createElement("div")
        unused_letter.classList.add("unused-letter")
        unused_letter.textContent = letter.toUpperCase()
    
        geuss_bank.appendChild(unused_letter)
    }
}
 


 /*********************************************************************
 ** Function: 
 ** Description: 
 **     
 ** Parameters:
 **     None
 *********************************************************************/
