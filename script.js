const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = false , result = false;
const playerOne = 'X';
const playerTwo = 'O';

const items = document.querySelectorAll('.items');
const toMove = document.querySelector('.move');
const header = document.querySelector('.header');
const button = document.getElementById('playAgain-button');

const elementClickHandler = (element,index) => {
    return () => {

        if (result) {
            return;
        } 

        if (board[index] === '') {

            board[index] = currentPlayer ? playerTwo : playerOne;
            togglePlayer();
            checkWinsForPlayer();
            button.innerText = 'Play Again';
            element.innerHTML = board[index];
        }
        
    };
};

button.addEventListener('click', () =>{
    toMove.innerText = playerOne;
    items.forEach((element, index) => {
        element.addEventListener('click', elementClickHandler(element,index));
    });
});

button.addEventListener('click', resetGame);

function togglePlayer() {
    currentPlayer = !currentPlayer;
    toMove.innerText = currentPlayer ? playerTwo : playerOne;
}

function checkWinsForPlayer() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    let gameWon = false;

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] === board[b] && board[a] === board[c]){
            if(board[a] === 'X'){
                showResult('&#127881; Player One Win &#127881;');
                  gameWon = true;
            }else if(board[a] === 'O'){
               showResult('&#127881; Player Two Win &#127881;');
                  gameWon = true;
            }
        } 
    }

    if (gameWon) {
        result = true; 
    } else {
        checkForDraw();
    }
}

function checkForDraw() {
    const isBoardFull = board.every(cell => cell === 'X' || cell === 'O');
    if (isBoardFull) {
        showResult('&#x1F64A; Draw &#x1F64A;');
    }
}

function resetGame() {
  header.innerHTML = '<p class="title">Tic Tac Toe</p>';
 
    for (let i = 0; i < board.length; i++) {
        board[i] = '';
        items[i].innerHTML = '';
    }
    
    result = false;
    currentPlayer = false; 
}

function showResult(winner){
    header.innerHTML = `<div class= "result"><p>${winner}</p></div>`;
    toMove.innerText = '';
}


