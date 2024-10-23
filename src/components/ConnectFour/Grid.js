import React, { useState } from "react";
import GridImage from "./ConnectFourGrid.png";
import FrontJaffa from "./FrontJaffaCake.png";
import BackJaffa from "./BackJaffaCake.png";
import './Connect4.css';

const Grid = () => {
    // State to keep track of all token positions (for each column)
    const [tokens, setTokens] = useState([]);

    // State to track the current player's turn (1 = FrontJaffa, 2 = BackJaffa)
    const [currentPlayer, setCurrentPlayer] = useState(1);

    // Number of rows in the grid
    const rows = 6;
    // Number of columns in the grid
    const columns = 7;

    // State to track the number of tokens placed in each column
    const [columnCounts, setColumnCounts] = useState(Array(columns).fill(0));

    const handleClick = (columnIndex) => {
        // Get the current count of tokens in this column
        const tokenCountInColumn = columnCounts[columnIndex];

        // If the column is full, don't add a new token
        if (tokenCountInColumn >= rows) {
            alert("This column is full!");
            return;
        }

        // Calculate the new position for the token
        const newTokenPosition = {
            left: `${25.4 + columnIndex * 7}%`, // Horizontal position based on the column index
            bottom: `${21.5 + tokenCountInColumn * 12.5}%` // Vertical position based on how many tokens are in the column
        };

        // Determine which token to use (FrontJaffa or BackJaffa) based on the current player
        const newToken = {
            ...newTokenPosition,
            tokenType: currentPlayer === 1 ? FrontJaffa : BackJaffa,
        };

        // Add the new token to the array of tokens
        setTokens([...tokens, newToken]);

        // Update the count of tokens in this column
        const newColumnCounts = [...columnCounts];
        newColumnCounts[columnIndex] += 1;
        setColumnCounts(newColumnCounts);

        // Switch to the other player for the next turn
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
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
        </div>
    );
};

export default Grid;







