import React, { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { createJaffaRocket } from "./AsteroidIcon";
import GamePopup from "./GamePopup";
import "./Asteroids.css";
import { createMultipleJaffas, jaffaBox as jaffaBox } from "./JaffasteroidsWhole";
import { updateJaffaCakes, handleCollisions } from "./CollisionBullets";
import { bullets, updateBullets } from './Bullets';
import ScoreCount from "./ScoreCount";
import { handleRocketCollision } from "./CollisionRocket";
import LevelCount from "./LevelCount";
import ThreeLives from "./ThreeLives"; // Import ThreeLives


const Asteroids = () => {
    const canvasRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    //const [lives, setLives] = useState(3);

    const startGame = () => {
        // setLives(3); // Reset lives to 3 on game start
        setGameStarted(true);
    };

    const resetGame = () => {
        setGameStarted(false); // Stop the game
    };

    // const loseLife = () => {
    //     if (lives > 1) {
    //         console.log(" loseLife in lives going down")
    //         setLives(lives - 1); // Decrement lives
    //     } else {
    //         console.log(" loseLife before reset")
    //         resetGame(); // Game over if no lives remain
    //         console.log(" loseLife after reset")

    //     }
    // };

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

        // Global state cleanup
        bullets.splice(0, bullets.length);
        jaffaBox.splice(0, jaffaBox.length);

        let rocketSprite;
        (async () => {
            rocketSprite = await createJaffaRocket(app);
        })();

        // Start the first wave
        createMultipleJaffas(app);

        const tickerCallback = (delta) => {
            if (!rocketSprite) return; // Ensure rocket is ready before processing
            updateJaffaCakes(app);
            updateBullets(app, delta);

            // Check rocket-asteroid collisions
            handleRocketCollision(rocketSprite, jaffaBox, app);

            // Check bullet-asteroid collisions
            handleCollisions(bullets, app);

            // Advance to the next wave if all Jaffa Cakes are destroyed
            // if (jaffas.length === 0) {
            //   advanceWave(app);
            // }
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
            {!gameStarted && <GamePopup onStartGame={startGame} />}
            {gameStarted && (
                <>
                    <ScoreCount />
                    <LevelCount />
                    {/* <ThreeLives
                        lives={lives} // Pass the current lives to ThreeLives
                        onGameReset={resetGame} // Reset the game when all lives are gone
                        onGameOver={() => console.log("Game Over!")} // Optional additional handling
                    /> */}
                </>
            )}

        </div>
    );
};

export default Asteroids;



