let playerOnesTurn = true;
let gameOver = false;
let gameStart = false;

const Player = (type, symbol, name) => {
    let difficulty = 'Normal';
    let wins = 0;
    return {type, symbol, wins, difficulty, name}
};
const p1Name = document.getElementById('p1');
const p2Name = document.getElementById('p2');
player1 = Player('human', "x", p1Name.value);
player2 = Player('human', "o", p2Name.value);
p1Name.addEventListener('change', function() {
    player1.name = p1Name.value;
});
p2Name.addEventListener('change', function() {
    player2.name = p2Name.value;
});

const buttonDiv1 = document.getElementById('button-div1');
const p1Type = document.getElementById('type1');
p1Type.addEventListener('click', function() {
    if (player1.type == 'human') {
        player1.type = 'cpu';
        p1Type.textContent = 'Human';
        p1Diff = document.createElement('button');
        buttonDiv1.appendChild(p1Diff);
        p1Diff.textContent = player1.difficulty;
        p1Diff.addEventListener('click', function() {
            if (player1.difficulty == 'Normal') {
                player1.difficulty = 'Impossible';
            }
            else {
                player1.difficulty = 'Normal';
            }
            p1Diff.textContent = player1.difficulty;
        });
    }
    else {
        player1.type = 'human';
        p1Type.textContent = 'CPU';
        buttonDiv1.removeChild(p1Diff);
    }
});
const buttonDiv2 = document.getElementById('button-div2');
const p2Type = document.getElementById('type2');
p2Type.addEventListener('click', function() {
    if (player2.type == 'human') {
        player2.type = 'cpu';
        p2Type.textContent = 'Human';
        p2Diff = document.createElement('button');
        buttonDiv2.appendChild(p2Diff);
        p2Diff.textContent = player2.difficulty;
        p2Diff.addEventListener('click', function() {
            if (player2.difficulty == 'Normal') {
                player2.difficulty = 'Impossible';
            }
            else {
                player2.difficulty = 'Normal';
            }
            p2Diff.textContent = player2.difficulty;
        });
    }
    else {
        player1.type = 'human';
        p1Type.textContent = 'CPU';
        buttonDiv1.removeChild(p1Diff);
    }
});



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
                if (playerOnesTurn && player1.type == 'cpu') {
                    if (player1.difficulty == 'Normal') {
                        min = Math.ceil(0);
                        max = Math.floor(9);
                        let randomSpot = Math.floor(Math.random() * (max - min) + min);
                        while (board[randomSpot] != null) {
                            randomSpot = Math.floor(Math.random() * (max - min) + min);
                        }
                        setTimeout(() => {playRound(randomSpot);}, 1000);
                    }
                }
                else if (!playerOnesTurn && player2.type == 'cpu') {
                    if (player2.difficulty == 'Normal') {
                        min = Math.ceil(0);
                        max = Math.floor(9);
                        let randomSpot = Math.floor(Math.random() * (max - min) + min);
                        while (board[randomSpot] != null) {
                            randomSpot = Math.floor(Math.random() * (max - min) + min);
                        }
                        setTimeout(() => {playRound(randomSpot);}, 1000);
                    }
                }
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
    const results = document.getElementById('results');
    const info1 = document.getElementById('info1');
    const info2 = document.getElementById('info2');
    const score1 = document.getElementById('score-div1');
    const score2 = document.getElementById('score-div2');

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
        gameOver = false;
        gameStart = true;
        results.textContent = "";
        gameBoard.clear();
        create();
        if (playerOnesTurn) {
            info1.style.boxShadow = '10px 5px 5px green';
            info2.style.boxShadow = 'none';
            if (player1.type == 'cpu') {
                if (player1.difficulty == 'Normal') {
                    min = Math.ceil(0);
                    max = Math.floor(9);
                    let randomSpot = Math.floor(Math.random() * (max - min) + min);
                    setTimeout(() => {playRound(randomSpot);}, 1000);
                }
            }
        }
        else {
            info1.style.boxShadow = 'none';
            info2.style.boxShadow = '10px 5px 5px green';
            if (player2.type == 'cpu') {
                if (player2.difficulty == 'Normal') {
                    min = Math.ceil(0);
                    max = Math.floor(9);
                    let randomSpot = Math.floor(Math.random() * (max - min) + min);
                    setTimeout(() => {playRound(randomSpot);}, 1000);
                }
            }
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
        console.log(currentSquare);
        currentSquare.appendChild(image);
        
    }

    const winner = () => {
        if (playerOnesTurn) {
            info1.style.boxShadow = '10px 5px 5px green';
            info2.style.boxShadow = '10px 5px 5px red';
            player1.wins += 1;
            score1.textContent = player1.wins;
            results.textContent = (player1.name + " wins!");
        }
        else {
            info1.style.boxShadow = '10px 5px 5px red';
            info2.style.boxShadow = '10px 5px 5px green';
            player2.wins += 1;
            score2.textContent = player2.wins;
            results.textContent = (player2.name + " wins!");
        }
        gameOver = true;
    }

    const tie = () => {
        gameOver = true;
        results.textContent = "Game ends in draw";
        info1.style.boxShadow = '10px 5px 5px grey';
        info2.style.boxShadow = '10px 5px 5px grey';
    }

    const changeTurn = () => {
        if (playerOnesTurn) {
            info1.style.boxShadow = '10px 5px 5px green';
            info2.style.boxShadow = 'none';
        }
        else {
            info1.style.boxShadow = 'none';
            info2.style.boxShadow = '10px 5px 5px green';
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
    console.log(index);
    if (playerOnesTurn) {
        gameBoard.draw(index, player1.symbol);
    }
    else {
        gameBoard.draw(index, player2.symbol);
    }

}

displayController.create();
const playButton = document.getElementById('play');
playButton.addEventListener('click', displayController.newGame);
