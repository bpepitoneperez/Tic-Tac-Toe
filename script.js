let playerOnesTurn = true;
let gameOver = false;
let gameStart = false;

const body = document.body;


const Player = (symbol) => {
    let difficulty = 'Normal';
    let type = 'human';
    let wins = 0;
    let name = "";
    return {type, symbol, wins, difficulty, name}
};

const player1 = Player('x');
const player2 = Player('o');


function createGameScreen () {
    const main = document.createElement('div');
    const top = document.getElementById('top');
    main.id = 'main';
    body.appendChild(main);

    const results = document.createElement('div');
    results.id = 'results';
    results.textContent = "";
    body.appendChild(results);

    const info1 = document.createElement('div');
    info1.id = 'info1';
    info1.setAttribute('class', 'info');
    main.appendChild(info1);
    const board = document.createElement('container');
    board.id = 'board';
    main.appendChild(board);
    const info2 = document.createElement('div');
    info2.id = 'info2';
    info2.setAttribute('class', 'info');
    main.appendChild(info2);

    const gameButtonDiv = document.createElement('div');
    gameButtonDiv.id = 'gameButtonDiv';
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New Game';
    gameButtonDiv.appendChild(newGameButton);
    newGameButton.addEventListener ('click', function() {
        displayController.newGame();
    })
    const settingsButton = document.createElement('button');
    settingsButton.textContent = "Settings";
    gameButtonDiv.appendChild(settingsButton);
    settingsButton.addEventListener('click', function() {
        backToHome();
    })
    top.appendChild(gameButtonDiv);

    const info1Name = document.createElement('h2');
    info1Name.textContent = player1.name;
    info1.appendChild(info1Name);
    const score1 = document.createElement('div');
    score1.textContent = player1.wins;
    score1.id = 'score1';
    info1.appendChild(score1);

    const info2Name = document.createElement('h2');
    info2Name.textContent = player2.name;
    info2.appendChild(info2Name);
    const score2 = document.createElement('div');
    score2.textContent = player2.wins;
    score2.id = 'score2'
    info2.appendChild(score2);
    displayController.newGame();
}

function createHomeScreen () {
    let p1Name = "Player 1";
    let p2Name = "Player 2";
    let p1Type = "human";
    let p2Type = "cpu";
    let p1Diff = "Normal";
    let p2Diff = "Normal";
    let gameMode = "default";

    const homeSettings = document.createElement('form');
    homeSettings.setAttribute('id', 'homeForm');
    const playButton = document.createElement('input');
    playButton.type = 'submit';
    playButton.value = 'Play!';
    playButton.setAttribute('id', 'play');
    homeSettings.appendChild(playButton);
    const settings = document.createElement('div');

    const p1Settings = document.createElement('div');
    const p1NameInput = document.createElement('input');
    p1NameInput.setAttribute('class', 'name-inputs');
    p1NameInput.setAttribute('id', "player1-name-input");
    p1NameInput.setAttribute('type', 'text');
    p1NameInput.setAttribute('value', 'Player 1');
    p1Settings.appendChild(p1NameInput);

    const p1TypeSettings = document.createElement('fieldset');
    p1TypeSettings.setAttribute('class', 'type-settings');
    const p1HumanButton = document.createElement('button');
    p1HumanButton.setAttribute('id', 'p1HumanButton');
    p1HumanButton.type = 'button';
    p1HumanButton.textContent = 'Human';
    p1HumanButton.style.outline = 'solid';
    const p1CpuButton = document.createElement('button');
    p1CpuButton.type = 'button';
    p1CpuButton.textContent = 'CPU';
    p1TypeSettings.appendChild(p1HumanButton);
    p1TypeSettings.appendChild(p1CpuButton);
    p1Settings.appendChild(p1TypeSettings);
    const p1DiffSettings = document.createElement('fieldset');
    const p1Normal = document.createElement('button');
    p1Normal.type = 'button';
    p1Normal.textContent = 'Normal';
    const p1Impossible = document.createElement('button');
    p1Impossible.type = 'button';
    p1Impossible.textContent = 'Impossible';
    p1DiffSettings.appendChild(p1Normal);
    p1DiffSettings.appendChild(p1Impossible);
    p1HumanButton.addEventListener('click', function() {
        p1HumanButton.style.outline = 'solid';
        p1CpuButton.style.outline = 'none';
        p1Normal.style.outline = 'none';
        p1Impossible.style.outline = 'none';
        p1Type = 'human';
    });
    p1CpuButton.addEventListener('click', function() {
        p1CpuButton.style.outline = 'solid';
        p1HumanButton.style.outline = 'none';
        if (p1Diff == 'Normal') {
            p1Normal.style.outline = 'solid';
        }
        else {
            p1Impossible.style.outline = 'solid';
        }
        p1Type = 'cpu'
    });
    p1Normal.addEventListener('click', function() {
        p1Normal.style.outline = 'solid';
        p1HumanButton.style.outline = 'none';
        p1CpuButton.style.outline = 'solid';
        p1Impossible.style.outline = 'none';
        p1Diff = 'Normal';
    });
    p1Impossible.addEventListener('click', function() {
        p1Normal.style.outline = 'none';
        p1HumanButton.style.outline = 'none';
        p1CpuButton.style.outline = 'solid';
        p1Impossible.style.outline = 'solid';
        p1Diff = 'Impossible';
    });
    p1Settings.appendChild(p1DiffSettings);
    settings.appendChild(p1Settings);

    const gameSettings = document.createElement('fieldset');
    const gameSettingsText = document.createElement('p');
    gameSettingsText.textContent = 'Game Mode';
    gameSettings.appendChild(gameSettingsText);
    const defaultButton = document.createElement('button');
    defaultButton.type = 'button';
    defaultButton.textContent = 'Default';
    defaultButton.style.outline = 'solid';
    gameSettings.appendChild(defaultButton);
    const advancedButton = document.createElement('button');
    advancedButton.type = 'button';
    advancedButton.textContent = 'Advanced';
    gameSettings.appendChild(advancedButton);
    defaultButton.addEventListener('click', function() {
        advancedButton.style.outline = 'none';
        gameMode = 'default';
    });
    advancedButton.addEventListener('click', function() {
        advancedButton.style.outline = 'solid';
        advancedButton.style.outlineColor = 'red';
    });
    settings.appendChild(gameSettings);

    const p2Settings = document.createElement('div');
    const p2NameInput = document.createElement('input');
    p2NameInput.setAttribute('class', 'name-inputs');
    p2NameInput.setAttribute('id', "player2-name-input");
    p2NameInput.setAttribute('type', 'text');
    p2NameInput.setAttribute('value', 'Player 2');
    p2Settings.appendChild(p2NameInput);

    const p2TypeSettings = document.createElement('fieldset');
    p2TypeSettings.setAttribute('class', 'type-settings');
    const p2HumanButton = document.createElement('button');
    p2HumanButton.type = 'button';
    p2HumanButton.textContent = 'Human';
    const p2CpuButton = document.createElement('button');
    p2CpuButton.type = 'button';
    p2CpuButton.textContent = 'CPU';
    p2CpuButton.style.outline = 'solid';
    p2TypeSettings.appendChild(p2HumanButton);
    p2TypeSettings.appendChild(p2CpuButton);
    p2Settings.appendChild(p2TypeSettings);
    const p2DiffSettings = document.createElement('fieldset');
    const p2Normal = document.createElement('button');
    p2Normal.type = 'button';
    p2Normal.textContent = 'Normal';
    const p2Impossible = document.createElement('button');
    p2Impossible.type = 'button';
    p2Impossible.textContent = 'Impossible';
    p2DiffSettings.appendChild(p2Normal);
    p2DiffSettings.appendChild(p2Impossible);
    p2HumanButton.addEventListener('click', function() {
        p2HumanButton.style.outline = 'solid';
        p2CpuButton.style.outline = 'none';
        p2Normal.style.outline = 'none';
        p2Impossible.style.outline = 'none';
        p2Type = 'human';
    });
    p2CpuButton.addEventListener('click', function() {
        p2CpuButton.style.outline = 'solid';
        p2HumanButton.style.outline = 'none';
        if (p2Diff == 'Normal') {
            p2Normal.style.outline = 'solid';
        }
        else {
            p2Impossible.style.outline = 'solid';
        }
        p2Type = "cpu";
    });
    p2Normal.addEventListener('click', function() {
        p2HumanButton.style.outline = 'none';
        p2CpuButton.style.outline = 'solid';
        p2Normal.style.outline = 'solid';
        p2Impossible.style.outline = 'none';
        p2Diff = 'Normal';
    });
    p2Impossible.addEventListener('click', function() {
        p2HumanButton.style.outline = 'none';
        p2CpuButton.style.outline = 'solid';
        p2Normal.style.outline = 'none';
        p2Impossible.style.outline = 'solid';
        p2Diff = 'Impossible';
    });
    p2Settings.appendChild(p2DiffSettings);
    settings.appendChild(p2Settings);

    homeSettings.appendChild(settings);
    body.appendChild(homeSettings);

    homeSettings.addEventListener('submit', function(event) {
        event.preventDefault();
        if (p1Type == 'cpu') {
            p1Name = ("CPU (" +  p1Diff + ")");
        }
        else {
            p1Name = p1NameInput.value;
        }
        if (p2Type == 'cpu') {
            p2Name = ("CPU (" +  p2Diff + ")");
        }
        else {
            p2Name = p2NameInput.value;
        }
        player1.name = p1Name;
        player1.type = p1Type;
        player1.difficulty = p1Diff;
        player2.name = p2Name;
        player2.type = p2Type;
        player2.difficulty = p2Diff;
        switchToGame();
    });
}

function switchToGame () {
    const form = document.getElementById('homeForm');
    body.removeChild(form);
    createGameScreen();
}

const backToHome = () => {
    const main = document.getElementById('main');
    const results = document.getElementById('results');
    const top = document.getElementById('top');
    const buttons = document.getElementById('gameButtonDiv');
    body.removeChild(main);
    body.removeChild(results);
    top.removeChild(buttons);
    createHomeScreen();
}


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
                    else {
                        let bestMove = findBestMove(board);
                        setTimeout(() => {playRound(bestMove);}, 1000);
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
                    else {
                        let bestMove = findBestMove(board);
                        setTimeout(() => {playRound(bestMove);}, 1000);
                    }
                }
            }
        }
    }
    //Finding the best move with minmax adapted from https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
    const findBestMove = (board) => {
        let bestVal = -1000;
        let bestMove = -1;
        for (let i = 0; i < 9; i++) {
            if (board[i] == null) {
                if (playerOnesTurn) {
                    board[i] = player1.symbol;
                }
                else {
                    board[i] = player2.symbol;
                }

                let moveVal = minimax(board, 0, false);

                board[i] = null;

                if (moveVal > bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
        return bestMove;
    }

    const minimax = (board, depth, isMax) => {
        let score = evaluate(board);

        if (score == 10) {
            return score;
        }
        if (score == -10) {
            return score;
        }
        if (movesLeft(board) == false) {
            return 0;
        }

        if(isMax) {
            let best = -1000;

            for(let i = 0; i < 9; i++) {
                if (board[i] == null) {
                    if (playerOnesTurn) {
                        board[i] = player1.symbol;
                    }
                    else {
                        board[i] = player2.symbol;
                    }
                    best = Math.max(best, minimax(board, depth + 1, !isMax));

                    board[i] = null;
                }
            }
            return best;
        }
        else {
            let best = 1000;
            for(let i = 0; i < 9; i++) {
                if (board[i] == null) {
                    if (playerOnesTurn) {
                        board[i] = player2.symbol;
                    }
                    else {
                        board[i] = player1.symbol;
                    }
                    best = Math.min(best, minimax(board, depth + 1, !isMax));

                    board[i] = null;
                }
            }
            return best;
        }
        
    }

    const evaluate = (b) => {
        if (board[0] == board[1] && board[0] == board[2]) {
            if (playerOnesTurn) {
                if (board[0] == player1.symbol) {
                    return +10;
                }
                else if (board[0] == player2.symbol) {
                    return -10;
                }
            }
            else {
                if (board[0] == player2.symbol) {
                    return +10;
                }
                else if (board[0] == player1.symbol) {
                    return -10;
                }
            }
        }
        else if (board[3] == board[4] && board[3] == board[5]) {
            if (playerOnesTurn) {
                if (board[3] == player1.symbol) {
                    return +10;
                }
                else if (board[3] == player2.symbol) {
                    return -10;
                }
            }
            else {
                if (board[3] == player2.symbol) {
                    return +10;
                }
                else if (board[3] == player1.symbol) {
                    return -10;
                }
            }
        }
        else if (board[6] == board[7] && board[6] == board[8]) {
            if (playerOnesTurn) {
                if (board[6] == player1.symbol) {
                    return +10;
                }
                else if (board[6] == player2.symbol) {
                    return -10;
                }
            }
            else {
                if (board[6] == player2.symbol) {
                    return +10;
                }
                else if (board[6] == player1.symbol) {
                    return -10;
                }
            }
        }
        else if (board[0] == board[3] && board[0] == board[6]) {
            if (playerOnesTurn) {
                if (board[0] == player1.symbol) {
                    return +10;
                }
                else if (board[0] == player2.symbol) {
                    return -10;
                }
            }
            else {
                if (board[0] == player2.symbol) {
                    return +10;
                }
                else if (board[0] == player1.symbol) {
                    return -10;
                }
            }
        }
        else if (board[1] == board[4] && board[1] == board[7]) {
            if (playerOnesTurn) {
                if (board[1] == player1.symbol) {
                    return +10;
                }
                else if (board[1] == player2.symbol) {
                    return -10;
                }
            }
            else {
                if (board[1] == player2.symbol) {
                    return +10;
                }
                else if (board[1] == player1.symbol) {
                    return -10;
                }
            }
        }
        else if (board[2] == board[5] && board[2] == board[8]) {
            if (playerOnesTurn) {
                if (board[2] == player1.symbol) {
                    return +10;
                }
                else if (board[2] == player2.symbol) {
                    return -10;
                }
            }
            else {
                if (board[2] == player2.symbol) {
                    return +10;
                }
                else if (board[2] == player1.symbol) {
                    return -10;
                }
            }
        }
        else if (board[6] == board[4] && board[6] == board[2]) {
            if (playerOnesTurn) {
                if (board[6] == player1.symbol) {
                    return +10;
                }
                else if (board[6] == player2.symbol) {
                    return -10;
                }
            }
            else {
                if (board[6] == player2.symbol) {
                    return +10;
                }
                else if (board[6] == player1.symbol) {
                    return -10;
                }
            }
        }
        else if (board[0] == board[4] && board[0] == board[8]) {
            if (playerOnesTurn) {
                if (board[0] == player1.symbol) {
                    return +10;
                }
                else if (board[0] == player2.symbol) {
                    return -10;
                }
            }
            else {
                if (board[0] == player2.symbol) {
                    return +10;
                }
                else if (board[0] == player1.symbol) {
                    return -10;
                }
            }
        }
    }

    const movesLeft = (board) => {
        for (let i = 0; i < 9; i++) {
            if (board[i] == null) {
                return true;
            }
        }
        return false;
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
        findBestMove,
    };
})();

const displayController = (() => {
    
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
                    if (playerOnesTurn && player1.type == 'human') {
                        playRound(i);
                    }
                    else if (!playerOnesTurn && player2.type == 'human') {
                        playRound(i);
                    }
                    
                }
            });
            display.appendChild(square);
        }
    }

    const newGame = () => {
        const results = document.getElementById('results');
        const info1 = document.getElementById('info1');
        const info2 = document.querySelector('#info2');
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
                else {
                    let bestMove = gameBoard.findBestMove(board);
                    setTimeout(() => {playRound(bestMove);}, 1000);
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
                else {
                    let bestMove = gameBoard.findBestMove(board);
                    setTimeout(() => {playRound(bestMove);}, 1000);
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
        currentSquare.appendChild(image);
        
    }

    const winner = () => {
        const results = document.getElementById('results');
        const info1 = document.getElementById('info1');
        const info2 = document.querySelector('#info2');
        const score1 = document.querySelector('#score1');
        const score2 = document.querySelector('#score2');
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
        const results = document.getElementById('results');
        const info1 = document.getElementById('info1');
        const info2 = document.querySelector('#info2');
        gameOver = true;
        results.textContent = "Game ends in draw";
        info1.style.boxShadow = '10px 5px 5px grey';
        info2.style.boxShadow = '10px 5px 5px grey';
    }

    const changeTurn = () => {
        const info1 = document.getElementById('info1');
        const info2 = document.querySelector('#info2');
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
    if (playerOnesTurn) {
        gameBoard.draw(index, player1.symbol);
    }
    else {
        gameBoard.draw(index, player2.symbol);
    }

}

createHomeScreen();

