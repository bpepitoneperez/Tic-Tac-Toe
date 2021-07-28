let playerOnesTurn = true;
let gameOver = false;
let gameStart = false;


const Player = (type, symbol) => {
    return {type, symbol}
};

player1 = Player('human', 'x');
player2 = Player('human', 'o');

const gameBoard = (() => {
    let board = [];
    const draw = (index, symbol) => {
        if (board[index] == null && !gameOver) {
            board[index] = symbol;
            displayController.update(index, symbol);
            checkWinner();
            playerOnesTurn = !playerOnesTurn;
            if(!gameOver) {
                displayController.changeTurn();
            }
        }
    }
    const checkWinner = () => {
        if (board[0] != null & board[0] == board[1] && board[0] == board[2]) {
            displayController.winner();
        }
        else if (board[3] != null & board[3] == board[4] && board[3] == board[5]) {
            displayController.winner();
        }
        else if (board[6] != null & board[6] == board[7] && board[6] == board[8]) {
            displayController.winner();
        }
        else if (board[0] != null & board[0] == board[3] && board[0] == board[6]) {
            displayController.winner();
        }
        else if (board[1] != null & board[1] == board[4] && board[1] == board[7]) {
            displayController.winner();
        }
        else if (board[2] != null & board[2] == board[5] && board[2] == board[8]) {
            displayController.winner();
        }
        else if (board[6] != null & board[6] == board[4] && board[6] == board[2]) {
            displayController.winner();
        }
        else if (board[0] != null & board[0] == board[4] && board[0] == board[8]) {
            displayController.winner();
        }
        else {
            checkTie();
        }
    }
    const checkTie = () => {
        let tie = true;
        for (let i = 0; i < 9; i++) {
            if (board[i] == null) {
                tie = false;
            }
        }
        if (tie) {
            displayController.tie();
        }
    }
    const clear = () => {
        board = [];
    }
    return {
        board,
        draw,
        clear,
    };
})();

const displayController = (() => {
    let results = document.getElementById('results');
    let first = document.getElementById("first");
    let second = document.getElementById("second");
    const create = () => {
        const display = document.getElementById('board');
        while (display.firstChild) {
            display.removeChild(display.firstChild);
        }
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.setAttribute('class', 'squares');
            square.setAttribute('id', ("square" + i));
            square.addEventListener('click', function() {
                if (gameStart) {
                    playRound(i);
                }
            });
            display.appendChild(square);
        }
    }

    const newGame = () => {
        results.textContent = "";
        gameOver = false;
        gameStart = true;
        gameBoard.clear();
        create();
        if (playerOnesTurn) {
            first.style.color = 'red';
            second.style.color = 'black';
        }
        else {
            first.style.color = 'black';
            second.style.color = 'red';
        }
        
    }
    
    const update = (id, symbol) => {
        let currentSquare = document.getElementById(("square" + id));
        let image = document.createElement('img');
        if (symbol == "x") {
            image.src = "x.png";
        }
        else {
            image.src = "o.png";
            image.style.width = "42px";
            image.style.height = '42px';
        }
        currentSquare.appendChild(image);
        
    }

    const winner = () => {
        if (playerOnesTurn) {
            results.textContent = "Player 1 has won!";
        }
        else {
            results.textContent = "Player 2 has won!";
        }
        gameOver = true;
        first.style.color = 'black';
        second.style.color = 'black';
    }

    const tie = () => {
        gameOver = true;
        results.textContent = "This game was a draw.";
        first.style.color = 'black';
        second.style.color = 'black';
    }

    const changeTurn = () => {
        if (playerOnesTurn) {
            first.style.color = 'red';
            second.style.color = 'black';
        }
        else {
            first.style.color = 'black';
            second.style.color = 'red';
        }
    }

    return {
        create,
        update,
        winner,
        tie,
        changeTurn,
        newGame,
    }
    
})();

function playRound (index) {
    let first = document.getElementById("first");
    let second = document.getElementById("second");
    
    if (playerOnesTurn) {
        first.style.color = 'red';
        second.style.color = 'black';
        gameBoard.draw(index, player1.symbol);
    }
    else {
        first.style.color = 'black';
        second.style.color = 'red';
        gameBoard.draw(index, player2.symbol);
    }

}

displayController.create();
const playButton = document.getElementById('play');
playButton.addEventListener('click', displayController.newGame);
