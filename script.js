const Player = (type, symbol) => {
    return {playerType, symbol}
};

const gameBoard = (() => {
    const board = [9];
    const draw = (index, symbol) => {
        if (board[index] == null) {
            board[index] = symbol;
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
            display.appendChild(square);
        }
    }
    
    const update = () => {
        const board = gameBoard.board;
        board.forEach(square => {
            
        });
    }

    return {
        create,
        update,
    }
    
})();

displayController.create();