document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-page').style.display = 'block';
    document.getElementById('game-page').style.display = 'none';
});

function startGame() {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
    startSinglePlayerGame(); 
}

let currentPlayer;
let isGameOver;
let board;

function startSinglePlayerGame() {
    currentPlayer = 'X';
    isGameOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
    updateTurnInfo();
    createBoard();
}

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        updateCell(index);
        checkForWinner();
        togglePlayer();
        updateTurnInfo();

        if (currentPlayer === 'O' && !isGameOver) {
            setTimeout(makeComputerMove, 500);
        }
    }
}

function makeComputerMove() {
    const availableCells = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (availableCells.length > 0 && !isGameOver) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const computerMove = availableCells[randomIndex];
        board[computerMove] = 'O';
        updateCell(computerMove);
        checkForWinner();
        togglePlayer();
        updateTurnInfo();
    }
}

function updateCell(index) {
    const cell = document.querySelector(`[data-index='${index}']`);
    cell.textContent = board[index];
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateTurnInfo() {
    const turnInfo = document.getElementById('turn-info');
    turnInfo.textContent = `Current Turn: Player ${currentPlayer}`;
}

function checkForWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            displayWinner(board[a]);
            return;
        }
    }

    if (!board.includes('') && !isGameOver) {
        displayDraw();
    }
}

function displayWinner(winner) {
    isGameOver = true;
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Player ${winner} wins!`;
}

function displayDraw() {
    isGameOver = true;
    const resultElement = document.getElementById('result');
    resultElement.textContent = 'It\'s a draw!';
}

function restartGame() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    document.getElementById('result').textContent = '';
    startSinglePlayerGame();
}
