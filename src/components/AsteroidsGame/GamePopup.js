import React from "react";
import "./GamePopup.css";

const GamePopup = ({ gameOver, score, level, onStartGame, onResetGame }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                {!gameOver && (
                    <>
                        <h1>Welcome to Asteroids!</h1>
                        <p>
                            In this game, the Jaffa Rocket must avoid
                            JaffaCake asteroids. Shoot them to survive as long as possible!
                        </p>
                        <h2>Controls:</h2>
                        <ul>
                            <li><b>Arrow Up:</b> Accelerate</li>
                            <li><b>Arrow Left:</b> Rotate Left</li>
                            <li><b>Arrow Right:</b> Rotate Right</li>
                            <li><b>Space:</b> Shoot</li>
                        </ul>
                        <button className="start-button" onClick={onStartGame}>Start Game</button>
                    </>
                )}
                {gameOver && (
                    <>
                        <h1>Game Over</h1>
                        <p><strong>Final Score:</strong> {score}</p>
                        <p><strong>Level Reached:</strong> {level}</p>
                        <button className="start-button" onClick={onResetGame}>Play Again</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default GamePopup;
