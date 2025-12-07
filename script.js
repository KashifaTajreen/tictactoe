document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');

    let gameActive = true;
    let currentPlayer = 'X'; // X is the Swirl Pop, O is the Blue Lollipop
    let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the 9 cells

    // All possible winning combinations (indexes of the cells)
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    // Function to handle a cell being clicked
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // If the cell is already played or the game is over, do nothing
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // 1. Update the game state (model)
        gameState[clickedCellIndex] = currentPlayer;

        // 2. Update the cell on the screen (view)
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase()); // Add 'x' or 'o' class for candy styling

        // 3. Check the result
        handleResultValidation();
    }

    // Function to check if a player has won or if it's a draw
    function handleResultValidation() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            // If any cell in the winning condition is empty, continue
            if (a === '' || b === '' || c === '') {
                continue;
            }

            // If all three cells match, a player has won
            if (a === b && a === c) {
                roundWon = true;
                
                // Highlight the winning cells with the 'win' class
                cells[winCondition[0]].classList.add('win');
                cells[winCondition[1]].classList.add('win');
                cells[winCondition[2]].classList.add('win');
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `🥳 ${currentPlayer} WON! Enjoy the Candies! 🍬`;
            gameActive = false;
            return;
        }

        // Check for a Draw (if no winner and no empty cells)
        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.textContent = '🤝 It\'s a Candy Draw! Try Again!';
            gameActive = false;
            return;
        }

        // If no win or draw, switch the player
        handlePlayerChange();
    }

    // Function to switch the current player
    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const playerDisplay = currentPlayer === 'X' ? "The Swirl Pop" : "The Blue Lollipop";
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn (${playerDisplay})`;
    }

    // Function to reset the game
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = "Player X's Turn (The Swirl Pop)";

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'win'); // Remove all player/win classes
        });
    }

    // Event Listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', handleRestartGame);
});
