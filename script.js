const gameContainer = document.getElementById('game');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleCellClick(index));
    gameContainer.appendChild(cell);
}

function handleCellClick(index) {
    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    renderBoard();
    checkForWinner();
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    board.forEach((value, index) => {
        cells[index].textContent = value;
    });
}

function checkForWinner() {
    let roundWon = false;
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] === '' || board[b] === '' || board[c] === '') continue;
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    renderBoard();
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

restartButton.addEventListener('click', restartGame);

// Initialize the game board
for (let i = 0; i < 9; i++) {
    createCell(i);
}
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
