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
            playerOnesTurn = !playerOnesTurn;
            displayController.update(index, symbol);
            checkWinner();
        }
    }
    const checkWinner = () => {
        if (board[0] != null & board[0] == board[1] && board[0] == board[2]) {
            console.log("Row 1 won")
        }
        else if (board[3] != null & board[3] == board[4] && board[3] == board[5]) {
            console.log("Row 2 won")
        }
        else if (board[6] != null & board[6] == board[7] && board[6] == board[8]) {
            console.log("Row 3 won")
        }
        else if (board[0] != null & board[0] == board[3] && board[0] == board[6]) {
            console.log("Col 1 won")
        }
        else if (board[1] != null & board[1] == board[4] && board[1] == board[7]) {
            console.log("Col 2 won")
        }
        else if (board[2] != null & board[2] == board[5] && board[2] == board[8]) {
            console.log("Col 3 won")
        }
        else if (board[6] != null & board[6] == board[4] && board[6] == board[2]) {
            console.log("pos diagonal won")
        }
        else if (board[0] != null & board[0] == board[4] && board[0] == board[8]) {
            console.log("neg diagonal won")
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
            console.log("A draw");
        }
    }
    return {
        board,
        draw,
    };
})();

const displayController = (() => {
    const create = () => {
        const display = document.getElementById('board');
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.setAttribute('class', 'squares');
            square.setAttribute('id', ("square" + i));
            square.textContent = "";
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

    return {
        create,
        update,
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

