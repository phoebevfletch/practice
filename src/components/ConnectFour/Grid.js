import React, { useState } from "react";
import GridImage from "./ConnectFourGrid.png";
import FrontJaffa from "./FrontJaffaCake.png";
import BackJaffa from "./BackJaffaCake.png";
import './Connect4.css';

const Grid = () => {
    // Number of rows and columns in the grid
    const rows = 6;
    const columns = 7;

    // State to keep track of the board with tokens placed by players
    const [board, setBoard] = useState(Array.from({ length: rows }, () => Array(columns).fill(null)));
    const [tokens, setTokens] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(null);
    const [tie, setTie] = useState(false); // State to track tie situation
    const [columnCounts, setColumnCounts] = useState(Array(columns).fill(0));

    const handleClick = (columnIndex) => {
        if (winner || tie) return;

        const tokenCountInColumn = columnCounts[columnIndex];
        if (tokenCountInColumn >= rows) {
            alert("This column is full!");
            return;
        }

        const newRow = rows - tokenCountInColumn - 1;

        // Update the visual tokens and the local board state
        const newTokenPosition = {
            left: `${25.4 + columnIndex * 7}%`,
            bottom: `${21.5 + tokenCountInColumn * 12.5}%`
        };
        const newToken = {
            ...newTokenPosition,
            tokenType: currentPlayer === 1 ? FrontJaffa : BackJaffa,
        };

        const newTokens = [...tokens, newToken];
        setTokens(newTokens);

        // Update the board with the current player's token
        const newBoard = board.map(row => [...row]);
        newBoard[newRow][columnIndex] = currentPlayer;
        setBoard(newBoard);

        // Update the column counts
        const newColumnCounts = [...columnCounts];
        newColumnCounts[columnIndex] += 1;
        setColumnCounts(newColumnCounts);

        // Check for a winner
        if (checkWinner(newRow, columnIndex, currentPlayer, newBoard)) {
            setWinner(currentPlayer);
            return;
        }

        // Check for a tie (if the board is full)
        if (newTokens.length === rows * columns) {
            setTie(true);
            return;
        }

        // Switch to the other player
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };

    // Function to check for a winner
    const checkWinner = (row, col, player, board) => {
        // Horizontal Check
        for (let c = 0; c <= columns - 4; c++) {
            if (board[row][c] === player && board[row][c + 1] === player &&
                board[row][c + 2] === player && board[row][c + 3] === player) {
                return true;
            }
        }

        // Vertical Check
        for (let r = 0; r <= rows - 4; r++) {
            if (board[r][col] === player && board[r + 1][col] === player &&
                board[r + 2][col] === player && board[r + 3][col] === player) {
                return true;
            }
        }

        // Diagonal Check (bottom-left to top-right)
        for (let r = 0; r <= rows - 4; r++) {
            for (let c = 0; c <= columns - 4; c++) {
                if (board[r][c] === player && board[r + 1][c + 1] === player &&
                    board[r + 2][c + 2] === player && board[r + 3][c + 3] === player) {
                    return true;
                }
            }
        }

        // Diagonal Check (bottom-right to top-left)
        for (let r = 3; r < rows; r++) {
            for (let c = 0; c <= columns - 4; c++) {
                if (board[r][c] === player && board[r - 1][c + 1] === player &&
                    board[r - 2][c + 2] === player && board[r - 3][c + 3] === player) {
                    return true;
                }
            }
        }

        return false;
    };

    // Function to reset the game state
    const resetGame = () => {
        setBoard(Array.from({ length: rows }, () => Array(columns).fill(null)));
        setTokens([]);
        setCurrentPlayer(1);
        setWinner(null);
        setTie(false); // Reset tie state
        setColumnCounts(Array(columns).fill(0));
    };

    return (
        <div className="game-container">
            {/* Grid container */}
            <div className="grid-container">
                {/* Grid image */}
                <img
                    src={GridImage}
                    alt="Connect Four Grid"
                    className="grid-image"
                />

                {/* Render all placed tokens */}
                {tokens.map((token, index) => (
                    <img
                        key={index}
                        src={token.tokenType}
                        alt={token.tokenType === FrontJaffa ? "Front JaffaCake" : "Back JaffaCake"}
                        className="jaffa-token"
                        style={{ left: token.left, bottom: token.bottom }}
                    />
                ))}

                {/* Row of circular buttons inside the grid */}
                <div className="buttons-container">
                    {Array.from({ length: columns }, (_, index) => (
                        <button
                            key={index}
                            className="grid-button"
                            onClick={() => handleClick(index)}
                            style={{
                                backgroundImage: `url(${currentPlayer === 1 ? FrontJaffa : BackJaffa})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Winner or Tie Display and Reset Button */}
            {winner && (
                <div className="winner-message">
                    <div>
                        {winner === 1 ? "Player 1" : "Player 2"} Wins!
                    </div>
                    <button className="reset-button" onClick={resetGame}>
                        Reset Game
                    </button>
                </div>
            )}
            {tie && (
                <div className="winner-message">
                    <div>
                        It's a Tie!
                    </div>
                    <button className="reset-button" onClick={resetGame}>
                        Reset Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default Grid;











