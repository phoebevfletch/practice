import React, { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { createJaffaRocket } from "./AsteroidIcon";
import GamePopup from "./GamePopup";
import "./Asteroids.css";
import { createMultipleJaffas, jaffas } from "./JaffasteroidsWhole";
import { updateJaffaCakes, handleCollisions } from "./CollisionBullets";
import { bullets, updateBullets } from './Bullets'; // Import the bullets array and updateBullets function
import { resetGame } from './ResetGame';
import ScoreCount from "./ScoreCount";

const Asteroids = () => {
    const canvasRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0); // Track the score

    useEffect(() => {
        if (!gameStarted) return;

        const canvasContainer = canvasRef.current;
        const app = new Application({
            resizeTo: canvasContainer,
            antialias: true,
            backgroundAlpha: 0,
        });

        if (canvasContainer) {
            canvasContainer.appendChild(app.view);
        }

        // Global state cleanup before starting the game
        bullets.splice(0, bullets.length); // Clear bullets array
        jaffas.splice(0, jaffas.length);  // Clear Jaffa array

        // Initialize the game components
        createJaffaRocket(app); // Initialize the Jaffa Rocket
        createMultipleJaffas(app, 5); // Add initial Jaffas

        const updateScore = (points) => {
            setScore((prevScore) => prevScore + points); // Increment the score
        };

        // Add the update logic to the game loop
        const tickerCallback = (delta) => {
            updateJaffaCakes(app);
            updateBullets(app, delta);

            // Update collisions and handle scoring
            handleCollisions(bullets, app, updateScore, resetGame);

            // Check if all asteroids are destroyed
            if (jaffas.length === 0) {
                resetGame(app); // Reset game
            }
        };

        app.ticker.add(tickerCallback);

        // Cleanup function
        return () => {
            app.ticker.remove(tickerCallback);
            app.stage.removeChildren();
            app.destroy(true, true);
            bullets.splice(0, bullets.length);
            jaffas.splice(0, jaffas.length);
        };
    }, [gameStarted]);

    const startGame = () => {
        setGameStarted(true);
    };

    return (
        <div className="asteroids-container" ref={canvasRef}>
            {!gameStarted && <GamePopup onStartGame={startGame} />}
            {gameStarted && <ScoreCount score={score} />}
        </div>
    );
};

export default Asteroids;

