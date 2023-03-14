#!/usr/bin/env js

/*********************************************************************
 ** Global Variables
 *********************************************************************/
var guess_bank = document.querySelector(".guess-bank")
var keyboard = document.querySelector(".keyboard")
//
var menu_bar = document.querySelector(".menu-bar")
var wip_modal = document.getElementById("wip-modal")
var tutorial_modal = document.getElementById("tutorial-modal")
var gameover_modal = document.getElementById("gameover-modal")
//
//~ WORD GUESS HANDLING
var word_container = document.querySelector(".word-container")
var word_container_list = document.querySelectorAll(".word-container .letter-guess")     // use .childNodes to access bits
var INCORRECT_TRIES = 0
var REVEALED_LETTERS = 0
//
//! FILL INITIAL WORD
var correct_word = "agile"
init_word_container(correct_word)


/*********************************************************************
 ** Global Constants
 *********************************************************************/
const keys = document.querySelectorAll(".keyboard button")
const ASCII_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const MAX_TRIES = 6


/*********************************************************************
 * Listen handler for keyboard pushes,
 * only register keystrokes if within letters of alphabet
 */
document.addEventListener("keydown", function(event) {
    // ?Source: https://javascript.info/keyboard-events
    console.log("Key:", event.key)
    //
    if (ASCII_LETTERS.includes(event.key)) {
        handle_player_guess(event.key)
    }
})


/*********************************************************************
 * Listen handler for keyboard pushes,
 * only register button clicks if on keyboard
 */
keyboard.addEventListener("click", function(event) {
    console.log("Clicked on keyboard:", event.target)

    if (event.target.nodeName == "BUTTON") {
        const letter = event.target.textContent
        handle_player_guess(letter)
    }
})


/*********************************************************************
 * Listen handler for Work In Progress Modal close button
 */
wip_modal.addEventListener("click", function(event) {
    console.log("Clicked on WIP: ", event.target)

    if (event.target.nodeName == "SPAN") {
        // Exit modal
        toggle_modal("wip-modal")
    }
})


/*********************************************************************
 * Listen handler for Tutorial Modal close button
 */
tutorial_modal.addEventListener("click", function(event) {
    // console.log("Clicked on WIP: ", event.target)

    // Exit modal if user clicked on X close button
    if (event.target.nodeName == "SPAN") {
        toggle_modal("tutorial-modal")
    }
})


/*********************************************************************
 * Listen handler for Gameover Modal
 * Handles resetting game based on option user clicks
 */
gameover_modal.addEventListener("click", function(event) {
    // console.log("Clicked on WIP: ", event.target)
    var same_word = true

    //~ Check what user clicked on
    if (event.target.nodeName == "SPAN") {
        // User clicked on X close button
        reset_game(same_word)
        toggle_modal("gameover-modal")
    } else if (event.target.id == "different-word") {
        // User picked different word
        same_word = false
        reset_game(same_word)
        toggle_modal("gameover-modal")
    }
    else if (event.target.id == "same-word") {
        // User picked same word
        reset_game(same_word)
        toggle_modal("gameover-modal")
    }
})


/*********************************************************************
 * Listen handler for menu_bar
 *
 * @param {object} event - click event info
 * @returns None.
 */
menu_bar.addEventListener("click", function(event) {
    console.log("Clicked on menu:", event.target)
    console.log("list:", event.target.classList)

    //~ If modal/menu is not implemented yet, display WIP modal
    //? https://www.w3schools.com/jsref/met_domtokenlist_contains.asp
    if (event.target.classList.contains("gamemode") ||
        event.target.classList.contains("appearance") ||
        event.target.classList.contains("settings")
        ) {
        toggle_modal("wip-modal")
    }
    else if (event.target.classList.contains("tutorial")) {
        // Show tutorial
        toggle_modal("tutorial-modal")
    }
})


/*********************************************************************
 * Toggle the specified modal to be hidden or displayed
 *
 * @param {string} modal_id - id name of modal to toggle display
 * @returns None.
 */
function toggle_modal(modal_id) {
    var modal_backdrop = document.getElementById("modal-backdrop")
    var modal = document.getElementById(modal_id)

    modal_backdrop.classList.toggle("hidden")
    modal.classList.toggle("hidden")
}


/*********************************************************************
 * Return a random integer given a max (0 to max-1)
 *
 * @param {int} max - max number to return (not inclusive)
 * @returns random int
 */
function get_random_int(max) {
    return Math.floor(Math.random() * max);
}


/*********************************************************************
 * Initialize correct word into HTML
 *
 * @param {string} word - Correct word.
 * @returns None
 */
function init_word_container(word) {
    for (let i = 0; i < word.length; i++) {
        var letter_guess = document.createElement("div")
        letter_guess.classList.add("letter-guess")
        letter_guess.textContent = ""
        word_container.appendChild(letter_guess)
    }

    word_container_list = document.querySelectorAll(".word-container .letter-guess")
}


/*********************************************************************
 * Remove all letter guess inputs
 *
 * @param None.
 * @returns None.
 */
function clear_word_containers() {
    for (let i = 0; i < word_container_list.length; i++) {
        word_container_list[i].remove();
    }
    guess_bank.innerHTML = ""
}


 /*********************************************************************
  * Determine if guess was correct and call appropriate action
  *
  * @param {string} guessed_letter - letter that was guessed (uppercase)
  * @returns None
  */
function handle_player_guess(guessed_letter) {
    if (correct_word.includes(guessed_letter.toLowerCase())) {
        // Letter is in correct word
        correct_guess(guessed_letter.toLowerCase())
    }
    else {
        // Letter is not correct, add to guess bank
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
    word_container_list.forEach((curr_letter, index) => {
        if (correct_word[index] == guessed_letter && curr_letter.textContent != guessed_letter) {
            curr_letter.textContent = guessed_letter
            REVEALED_LETTERS++
        }
    })

    //~ Check if gameover
    detect_gameover()

}


 /*********************************************************************
  * Handle incorrect guess and update bob's appearance, detect if game ends
  *
  * @param {string} guessed_letter - letter that was guessed (uppercase)
  * @returns None
  */
function incorrect_guess(guessed_letter) {
    //~ Only add letter if it was not already guessed
    var guesses_text = document.querySelector(".guess-bank").textContent
    //
    if (!guesses_text.includes(guessed_letter)) {
        //~ Add incorrect guess to guess bank
        var unused_letter = document.createElement("div")
        unused_letter.classList.add("unused-letter")
        unused_letter.textContent = guessed_letter.toUpperCase()
        //
        guess_bank.appendChild(unused_letter)

        //~ Update hangman image and attempts count
        update_tries()
    }

    //~ Check if game is over
    detect_gameover()
}


 /*********************************************************************
  * Update incorrect tries and make Bob image match
  *
  * @param None.
  * @returns None.
  */
function update_tries() {
    INCORRECT_TRIES++
    var hangman_img = document.getElementById("bob-id")
    hangman_img.src = "/public/figure/BobV" + INCORRECT_TRIES + ".png"
}

 /*********************************************************************
  * Check if game ended, if so prompt correct game over menu (win/lose)
  *
  * @param None.
  * @returns None.
  */
function detect_gameover() {
    //? Modal triggered before image could change, fix with timeout
    // https://stackoverflow.com/questions/41936043/javascript-alert-supersedes-preceding-code
    //
    //~ Check if user lost or won
    if (INCORRECT_TRIES === MAX_TRIES) {
        // User lost
        setTimeout(function () {
            display_gameover(false)
        }, 200)
    }
    else if (REVEALED_LETTERS === correct_word.length){
        // User won
        setTimeout(function () {
            display_gameover(true)
        }, 200)
    }
}


 /*********************************************************************
  * Display game over modal with win or lose message, prompt word choice
  *
  * @param {bool} game_won  Whether user won or lost.
  * @returns None.
  */
function display_gameover(game_won) {
    declare_win = document.getElementById("declare-gameover")
    if (game_won) {
        declare_win.textContent = "You won! Congrats."
    } else {
        declare_win.textContent = "You lost! Oh no!"
    }

    toggle_modal("gameover-modal")
}


 /*********************************************************************
  * Reset game based on user choice of playing with same word again or not
  *
  * @param {bool} is_same_word  User's choice (defaults to false)
  * @returns None.
  */
function reset_game(is_same_word = false) {
    //~ Reset try count
    INCORRECT_TRIES = 0
    REVEALED_LETTERS = 0

    if (!is_same_word) {
        get_new_word()
    }
    else {
        console.log("SAMEWORD, CLEAR")
        clear_word_containers()
        init_word_container(correct_word)
        var hangman_img = document.getElementById("bob-id")
        hangman_img.src = "/public/figure/BobV0.png"
    }
}


 /*********************************************************************
  * Get new word for guessing
  *
  * @param None.
  * @returns None.
  */
function get_new_word() {
    //~ Determine difficulty of new word
    var link_get = choose_difficulty()

    //~ Request new word
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link_get);
    xhr.onload = function() {
        if (xhr.status === 200) {
            clear_word_containers()
            init_word_container(xhr.responseText)
            correct_word = xhr.responseText
            console.log(correct_word)

            var hangman_img = document.getElementById("bob-id")
            hangman_img.src = "/public/figure/BobV0.png"
        } else {
            console.log('Request failed.  Returned status of ' + xhr.status)
        }
    }
    xhr.send()
}


 /*********************************************************************
  * Pick difficulty of word to request from service
  *
  * @param None.
  * @returns {string} Request link to return.
  */
function choose_difficulty() {
    var difficulty_level = get_random_int(3)
    var link = ""

    if (difficulty_level == 0) {
        link = "http://localhost:50521/easy"
    }
    else if (difficulty_level == 2) {
        link = "http://localhost:50521/medium"
    }
    else {
        link = "http://localhost:50521/hard"
    }

    return link
}
