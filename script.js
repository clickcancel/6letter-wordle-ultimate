console.log("6 Letter Wordle Ultimate started!");

let answer = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
let currentTile = 0;
let currentRow = 0;
let gameOver = false;


document.addEventListener("keydown", function(event) {

    // If the game is over, only Enter is allowed
    if (gameOver) {

        if (event.key === "Enter") {
            startNewGame();
        }

        return;
    }


    // TYPE LETTER
    if (event.key.length === 1 && currentTile < 6) {

        const tileNumber = currentRow * 6 + currentTile;
        const tile = document.getElementById("tile" + tileNumber);

        tile.textContent = event.key.toUpperCase();

        currentTile++;
    }


    // BACKSPACE
    if (event.key === "Backspace") {

        if (currentTile > 0) {

            currentTile--;

            const tileNumber = currentRow * 6 + currentTile;
            const tile = document.getElementById("tile" + tileNumber);

            tile.textContent = "";
        }
    }


    // ENTER
    if (event.key === "Enter") {

        // Don't submit until 6 letters are entered
        if (currentTile !== 6) {
            return;
        }


        // Build the guess
        let guess = "";

        for (let i = 0; i < 6; i++) {

            const tileNumber = currentRow * 6 + i;
            const tile = document.getElementById("tile" + tileNumber);

            guess += tile.textContent;
        }


        // Check if the word is allowed
        if (!WORD_LIST.includes(guess) && !ALLOWED_WORDS.includes(guess)) {

            const message = document.getElementById("message");

            message.textContent = "Not found in word list";
            message.classList.add("show");

            setTimeout(() => {
                message.classList.remove("show");
            }, 1500);

            return;
        }


        // Prepare colors
        let remaining = answer.split("");
        let colors = ["", "", "", "", "", ""];
        let correctLetters = 0;


        // PASS 1 — GREEN
        for (let i = 0; i < 6; i++) {

            if (guess[i] === answer[i]) {

                colors[i] = "green";
                remaining[i] = null;
                correctLetters++;
            }
        }


        // PASS 2 — YELLOW / GRAY
        for (let i = 0; i < 6; i++) {

            if (colors[i] === "green") {
                continue;
            }

            const index = remaining.indexOf(guess[i]);

            if (index !== -1) {

                colors[i] = "yellow";
                remaining[index] = null;

            } else {

                colors[i] = "gray";
            }
        }


        // PASS 3 — FLIP + COLOR
        for (let i = 0; i < 6; i++) {

            const tileNumber = currentRow * 6 + i;
            const tile = document.getElementById("tile" + tileNumber);
            const key = document.getElementById("key" + guess[i]);


            setTimeout(() => {

              tile.classList.remove("flip");
              void tile.offsetWidth;
              tile.classList.add("flip");


                setTimeout(() => {

                    // GREEN
                    if (colors[i] === "green") {

                        tile.style.backgroundColor = "#6aaa64";

                        if (key) {
                            key.style.backgroundColor = "#6aaa64";
                        }
                    }


                    // YELLOW
                    else if (colors[i] === "yellow") {

                        tile.style.backgroundColor = "#c9b458";

                        if (
                            key &&
                            key.style.backgroundColor !== "rgb(106, 170, 100)"
                        ) {
                            key.style.backgroundColor = "#c9b458";
                        }
                    }


                    // GRAY
                    else {

                        tile.style.backgroundColor = "#3a3a3c";

                        if (
                            key &&
                            key.style.backgroundColor !== "rgb(106, 170, 100)" &&
                            key.style.backgroundColor !== "rgb(201, 180, 88)"
                        ) {
                            key.style.backgroundColor = "#3a3a3c";
                        }
                    }

                }, 250);

            }, i * 300);
        }


        // WIN
        if (correctLetters === 6) {

            gameOver = true;

            // Wait until the flip animation finishes
            setTimeout(() => {

                const winPopup = document.getElementById("winPopup");

                winPopup.classList.add("show");

            }, 1800);

            return;
        }


        // MOVE TO NEXT ROW
        currentRow++;
        currentTile = 0;
    }

});


// START NEW GAME
function startNewGame() {

    // Pick new answer
    answer = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

    // Reset game
    currentTile = 0;
    currentRow = 0;
    gameOver = false;


    // Clear board
    for (let i = 0; i < 36; i++) {

        const tile = document.getElementById("tile" + i);

        tile.textContent = "";
        tile.style.backgroundColor = "";

        // Remove flip animation class
        tile.classList.remove("flip");
    }


    // Reset keyboard
    const keys = document.querySelectorAll(".key");

    keys.forEach(function(key) {
        key.style.backgroundColor = "";
    });


    // Hide popup
    document.getElementById("winPopup").classList.remove("show");
}


// PLAY AGAIN BUTTON
document.getElementById("playAgainButton").addEventListener("click", function() {

    startNewGame();

});


// X BUTTON
document.getElementById("closeWinPopup").addEventListener("click", function() {

    document.getElementById("winPopup").classList.remove("show");

});
