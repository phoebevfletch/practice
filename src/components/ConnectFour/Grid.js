import React, { useState } from "react";
import GridImage from "./ConnectFourGrid.png";
import FrontJaffa from "./FrontJaffaCake.png";
import BackJaffa from "./BackJaffaCake.png";
import './Connect4.css';
import GamePopupC4 from "./GamePopupConnect4"; // Import the GamePopup component

const Grid = () => {
    const rows = 6;
    const columns = 7;

    // State for the board, tokens, current player, etc.
    const [board, setBoard] = useState(Array.from({ length: rows }, () => Array(columns).fill(null)));
    const [tokens, setTokens] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(null);
    const [tie, setTie] = useState(false);
    const [columnCounts, setColumnCounts] = useState(Array(columns).fill(0));
    const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

    const handleStartGame = () => {
        setGameStarted(true); // Start the game by changing state
    };

    const handleClick = (columnIndex) => {
        if (winner || tie) return;

        const tokenCountInColumn = columnCounts[columnIndex];
        if (tokenCountInColumn >= rows) {
            alert("This column is full!");
            return;
        }

        const newRow = rows - tokenCountInColumn - 1;
        const newTokenPosition = {
            left: `${33.7 + columnIndex * 4.7}%`,
            bottom: `${12.4 + tokenCountInColumn * 13.9}%`
        };
        const newToken = {
            ...newTokenPosition,
            tokenType: currentPlayer === 1 ? FrontJaffa : BackJaffa,
        };

        const newTokens = [...tokens, newToken];
        setTokens(newTokens);

        const newBoard = board.map(row => [...row]);
        newBoard[newRow][columnIndex] = currentPlayer;
        setBoard(newBoard);

        const newColumnCounts = [...columnCounts];
        newColumnCounts[columnIndex] += 1;
        setColumnCounts(newColumnCounts);

        if (checkWinner(newRow, columnIndex, currentPlayer, newBoard)) {
            setWinner(currentPlayer);
            return;
        }

        if (newTokens.length === rows * columns) {
            setTie(true);
            return;
        }

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };

    const checkWinner = (row, col, player, board) => {
        const directions = [
            { r: 0, c: 1 }, // horizontal (left-right)
            { r: 1, c: 0 }, // vertical (up-down)
            { r: 1, c: 1 }, // diagonal (top-left to bottom-right)
            { r: 1, c: -1 } // diagonal (top-right to bottom-left)
        ];

        const countConsecutive = (row, col, rowDelta, colDelta) => {
            let count = 0;
            let r = row + rowDelta;
            let c = col + colDelta;

            while (
                r >= 0 &&
                r < board.length &&
                c >= 0 &&
                c < board[0].length &&
                board[r][c] === player
            ) {
                count++;
                r += rowDelta;
                c += colDelta;
            }

            return count;
        };

        for (const direction of directions) {
            const count =
                1 +
                countConsecutive(row, col, direction.r, direction.c) +
                countConsecutive(row, col, -direction.r, -direction.c);

            if (count >= 4) {
                return true;
            }
        }

        return false;
    };

    const resetGame = () => {
        setBoard(Array.from({ length: rows }, () => Array(columns).fill(null)));
        setTokens([]);
        setCurrentPlayer(1);
        setWinner(null);
        setTie(false);
        setColumnCounts(Array(columns).fill(0));
    };

    const renderJaffaRain = () => {
        if (!winner) return null;

        const jaffaCakes = Array.from({ length: 30 }, (_, index) => {
            const leftPosition = Math.floor(Math.random() * 100);
            const delay = Math.random() * 2;

            return (
                <img
                    key={index}
                    src={currentPlayer === 1 ? FrontJaffa : BackJaffa}
                    alt="Falling JaffaCake"
                    className="jaffa-rain"
                    style={{ left: `${leftPosition}%`, animationDelay: `${delay}s` }}
                />
            );
        });

        return <div>{jaffaCakes}</div>;
    };

    return (
        <div className="game-container">
            {/* Show popup if game has not started */}
            {!gameStarted && <GamePopupC4 onStartGame={handleStartGame} />}

            {/* Main game content */}
            {gameStarted && (
                <>
                    {renderJaffaRain()}
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

                    <div className="grid-container">
                        <img src={GridImage} alt="Connect Four Grid" className="grid-image" />

                        {tokens.map((token, index) => (
                            <img
                                key={index}
                                src={token.tokenType}
                                alt={token.tokenType === FrontJaffa ? "Front JaffaCake" : "Back JaffaCake"}
                                className="jaffa-token"
                                style={{ left: token.left, bottom: token.bottom }}
                            />
                        ))}
                    </div>

                    {winner && (
                        <div className="winner-message">
                            <div>{winner === 1 ? "Player 1" : "Player 2"} Wins!</div>
                            <button className="reset-button" onClick={resetGame}>Reset Game</button>
                        </div>
                    )}
                    {tie && (
                        <div className="winner-message">
                            <div>It's a Tie!</div>
                            <button className="reset-button" onClick={resetGame}>Reset Game</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Grid;







