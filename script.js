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
        }
    }
    const checkWinner = () => {
        if (board[0] == board[1] && board[0] == board[2]) {
            console.log("someone won.")
        }
    }
    return {
        board,
        draw,
    };
})();

const displayController = (() => {
    const create = () => {
        console.log("Creating board");
        const display = document.getElementById('board');
        console.log(display);
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            console.log(square);
            square.setAttribute('class', 'squares');
            console.log("Current id is: square" + i);
            square.setAttribute('id', ("square" + i));
            square.textContent = "";
            square.addEventListener('click', function() {
                playRound(i);
            });
            console.log(square);
            display.appendChild(square);
        }
    }
    
    const update = (id, symbol) => {
        console.log("Id in update is: " + id);
        console.log("The id to get should be: square" + id);
        let current = document.getElementById(("square" + id));
        current.textContent = (symbol);
        console.log(current);
    }

    return {
        create,
        update,
    }
    
})();

function playRound (index) {
    console.log(index + " was clicked");
    if (playerOnesTurn) {
        gameBoard.draw(index, player1.symbol);
    }
    else {
        gameBoard.draw(index, player2.symbol);
    }

}

displayController.create();

