import React, { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { createJaffaRocket } from "./AsteroidIcon";
import GamePopup from "./GamePopup";
import "./Asteroids.css";
import { createMultipleJaffas, jaffaBox } from "./JaffasteroidsWhole";
import { updateJaffaCakes, handleCollisions } from "./CollisionBullets";
import { bullets, updateBullets } from "./Bullets";
import { getScore } from "./CollisionBullets"; // Import score function
import { getCurrentLevel } from "./ResetGame"; // Import level function
import ScoreCount from "./ScoreCount";
import { handleRocketCollision } from "./CollisionRocket";
import LevelCount from "./LevelCount";
import ThreeLives from "./ThreeLives";
import { resetScore } from "./CollisionBullets"; // Add this import
import { clearJaffaTimeouts } from "./ResetGame"; // Import this function
import { resetLevel, resetBaseSpeed } from "./ResetGame";

const Asteroids = () => {
    const canvasRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [lives, setLives] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [finalLevel, setFinalLevel] = useState(0);

    const startGame = () => {
        resetScore(); // Reset score when starting a new game
        resetLevel();
        resetBaseSpeed(); // Reset base speed when starting a new game
        setLives(3);
        setGameStarted(true);
        setIsGameOver(false);
    };

    const resetGame = () => {
        // Reset all necessary states
        resetScore();
        resetLevel();
        resetBaseSpeed();
        setLives(3);
        setIsGameOver(false);

        const app = canvasRef.current?.querySelector("canvas")?.__pixiApplication__;
        if (app) {
            app.stage.removeChildren(); // Clear stage
            app.ticker.removeAllListeners(); // Clear all listeners
            app.destroy(true, true); // Destroy the PIXI application
        }

        bullets.splice(0, bullets.length); // Clear bullets
        jaffaBox.splice(0, jaffaBox.length); // Clear Jaffa Cakes
        clearJaffaTimeouts(); // Clear all asteroid spawn timeouts

        // Add a slight delay before transitioning to the start game popup
        setTimeout(() => {
            setGameStarted(false); // Reset to show the start game popup
        }, 100);
    };



    const loseLife = () => {
        setLives((prevLives) => {
            console.log("Lives before decrement:", prevLives); // Debugging

            if (prevLives > 1) {
                return prevLives - 1; // Decrement lives
            } else {
                console.log("Last life lost, game over."); // Debugging

                // Delay Game Over handling to allow rocket reset
                setTimeout(() => {
                    setIsGameOver(true);
                    setFinalScore(getScore());
                    setFinalLevel(getCurrentLevel());
                    setGameStarted(false);
                }, 2500); // Match the rocket reset duration (2 seconds for reset + buffer)

                return prevLives; // Prevent further decrement
            }
        });
    };


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

        bullets.splice(0, bullets.length);
        jaffaBox.splice(0, jaffaBox.length);

        // Declare rocketSprite in the parent scope
        let rocketSprite;

        (async () => {
            rocketSprite = await createJaffaRocket(app);
            if (!rocketSprite) {
                console.error("Failed to initialize rocketSprite.");
                return;
            }

            console.log("Rocket initialized successfully.");

            // Start spawning asteroids after rocket initialization
            createMultipleJaffas(app);
        })();

        const tickerCallback = (delta) => {
            // Ensure rocketSprite is defined before proceeding
            if (!rocketSprite || !rocketSprite.texture || typeof rocketSprite.width === "undefined") {
                return; // Skip if rocketSprite is not initialized
            }

            updateJaffaCakes(app);
            updateBullets(app, delta);
            handleRocketCollision(rocketSprite, jaffaBox, app, loseLife);
            handleCollisions(bullets, app);
        };

        app.ticker.add(tickerCallback);

        return () => {
            app.ticker.remove(tickerCallback);
            app.stage.removeChildren();
            app.destroy(true, true);
            bullets.splice(0, bullets.length);
            jaffaBox.splice(0, jaffaBox.length);
        };
    }, [gameStarted]);



    return (
        <div className="asteroids-container" ref={canvasRef}>
            {!gameStarted && !isGameOver && <GamePopup onStartGame={startGame} />}
            {gameStarted && (
                <>
                    <ScoreCount />
                    <LevelCount />
                    <ThreeLives lives={lives} />
                </>
            )}
            {isGameOver && (
                <GamePopup
                    gameOver
                    score={finalScore}
                    level={finalLevel}
                    onResetGame={resetGame}
                />
            )}
        </div>
    );
};

export default Asteroids;

