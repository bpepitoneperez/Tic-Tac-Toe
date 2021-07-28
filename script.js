let playerOnesTurn = true;

const Player = (type, symbol) => {
    return {type, symbol}
};

player1 = Player('human', 'x');
player2 = Player('human', 'o');

const gameBoard = (() => {
    const board = [];
    const draw = (index, symbol) => {
        if (board[index] == null) {
            board[index] = symbol;
            displayController.update(index, symbol);
            checkWinner();
            playerOnesTurn = !playerOnesTurn;
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
            checkDraw();
        }
    }
    const checkDraw = () => {
        let draw = true;
        for (let i = 0; i < 9; i++) {
            if (board[i] == null) {
                draw = false;
            }
        }
        if (draw) {
            displayController.draw();
        }
    }
    return {
        board,
        draw,
    };
})();

const displayController = (() => {
    let results = document.getElementById('results');
    let first = document.getElementById("first");
    let second = document.getElementById("second");
    const create = () => {
        results.textContent = "";
        const display = document.getElementById('board');
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.setAttribute('class', 'squares');
            square.setAttribute('id', ("square" + i));
            square.addEventListener('click', function() {
                playRound(i);
            });
            display.appendChild(square);
        }
    }
    
    const update = (id, symbol) => {
        let current = document.getElementById(("square" + id));
        let image = document.createElement('img');
        if (symbol == "x") {
            image.src = "x.png";
        }
        else {
            image.src = "o.png";
            image.style.width = "42px";
            image.style.height = '42px';
        }
        current.appendChild(image);
    }

    const winner = () => {
        if (playerOnesTurn) {
            results.textContent = "Player 1 has won!";
        }
        else {
            results.textContent = "Player 2 has won!";
        }
    }

    const draw = () => {
        results.textContent = "This game was a draw.";
    }

    return {
        create,
        update,
        winner,
        draw,
    }
    
})();

function playRound (index) {
    if (playerOnesTurn) {

        gameBoard.draw(index, player1.symbol);
    }
    else {
        gameBoard.draw(index, player2.symbol);
    }

}

displayController.create();

