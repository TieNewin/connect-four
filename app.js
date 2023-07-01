let board;
let playerOne = "R";
let playerTwo = "Y";
let currPlayer = playerOne;
let gameOver;
let rows = 6;
let columns = 7;
let currColumns;

let playerOneScore = document.getElementById("playerOneScore");
let oneScore = 0;
let playerTwoScore = document.getElementById("playerTwoScore");
let twoScore = 0;

let turn = document.getElementById("turn");

window.onload = function() {
    setGame();
    turn.innerHTML = "Player One's Turn";
}

function setGame() {
    board = [];
    gameOver = false;
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    playerOneScore.innerHTML = oneScore;
    playerTwoScore.innerHTML = twoScore;

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currPlayer == playerOne) {
        tile.classList.add("red");
        currPlayer = playerTwo;
        turn.innerHTML = "Player Two's Turn";
    } else {
        tile.classList.add("yellow");
        currPlayer = playerOne;
        turn.innerHTML = "Player One's Turn";
    }

    r -= 1;
    currColumns[c] = r;

    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = columns - 1; c > 2; c--) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c - 1] && board[r + 1][c - 1] == board[r + 2][c - 2] && board[r + 2][c - 2] == board[r + 3][c - 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerOne) {
        winner.innerText = "Player One Wins!!!";
    } else {
        winner.innerText = "Player Two Wins!!!";
    }
    gameOver = true;
}

function newGame() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.remove();
        }
    }

    if (gameOver) {
        gameOver = false;
        if (currPlayer == playerTwo) {
            oneScore += 1;
        } else {
            twoScore += 1;
        }
    }
    
    winner.innerText = "";
    setGame();
}