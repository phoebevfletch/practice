import React from "react";
import "./GamePopupC4.css"; // Import the CSS for styling

const GamePopupC4 = ({ onStartGame }) => {
    return (
        <div className="popup-overlayC4">
            <div className="popup-contentC4">
                <h1>Welcome to Connect4!</h1>
                <p>
                    Take turns dropping the JaffaCake discs into the grid by clicking the JaffaCake at the top.
                    The first player to connect four of their JaffaCakes in a row, column, or diagonal wins!
                </p>
                <h2>Rules:</h2>
                <ul>
                    <li><b>Goal:</b> Connect 4 of your discs before your opponent.</li>
                    <li><b>Players:</b> Two players take turns (chocolate and cake JaffaCakes).</li>
                    <li><b>Win:</b> Vertical, horizontal, or diagonal alignment wins the game.</li>
                </ul>
                <button className="start-buttonC4" onClick={onStartGame}>Start Game</button>
            </div>
        </div>
    );
};

export default GamePopupC4;

