console.log("6 Letter Wordle Ultimate started!");

const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
const answer = WORD_LIST[randomIndex];
let currentTile = 0;
let currentRow = 0;
document.addEventListener("keydown", function(event){
    if (event.key.length === 1 && currentTile < 6) {

    const tileNumber = currentRow * 6 + currentTile;
    const tile = document.getElementById("tile" + tileNumber);

    tile.textContent = event.key.toUpperCase();

    currentTile++;
}

     if (event.key === "Backspace") {
        if (currentTile > 0) {
            currentTile--;
            const tileNumber = currentRow * 6 + currentTile;
            const tile = document.getElementById("tile" + tileNumber);
            tile.textContent = "";
        }
    }
     if (event.key === "Enter") {
        if (currentTile === 6) {

    let guess = "";

    for (let i = 0; i < 6; i++) {
        const tileNumber = currentRow * 6 + i;
        const tile = document.getElementById("tile" + tileNumber);
        guess += tile.textContent;
    }

            if (!WORD_LIST.includes(guess)) {
            alert("Not in word list!");
            return;
}

    let remaining = answer.split("");
    let colors = ["", "", "", "", "", ""];
    let correctLetters = 0;

    // PASS 1 - Find all greens
    for (let i = 0; i < 6; i++) {

        if (guess[i] === answer[i]) {
            colors[i] = "green";
            remaining[i] = null;
            correctLetters++;
        }

    }

    // PASS 2 - Find yellows and grays
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

    // PASS 3 - Color the tiles and keyboard
for (let i = 0; i < 6; i++) {

    const tileNumber = currentRow * 6 + i;
    const tile = document.getElementById("tile" + tileNumber);
    const key = document.getElementById("key" + guess[i]);

    if (colors[i] === "green") {

        tile.style.backgroundColor = "#6aaa64";
        key.style.backgroundColor = "#6aaa64";

    } else if (colors[i] === "yellow") {

        tile.style.backgroundColor = "#c9b458";

        if (key.style.backgroundColor !== "rgb(106, 170, 100)") {
            key.style.backgroundColor = "#c9b458";
        }

} else {

    tile.style.backgroundColor = "#3a3a3c";

        if (
            key.style.backgroundColor !== "rgb(106, 170, 100)" &&
            key.style.backgroundColor !== "rgb(201, 180, 88)"
        ) {
            key.style.backgroundColor = "#3a3a3c";
        }

    }   // end gray else

}   // end PASS 3 loop

if (correctLetters === 6) {

    alert("You Win!");

} else {

    currentRow++;
    currentTile = 0;

}

}   // end currentTile == 6

}   // end Enter

}); // end document listener
