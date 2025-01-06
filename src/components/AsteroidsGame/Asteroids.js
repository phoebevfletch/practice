import React, { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { createJaffaRocket } from "./AsteroidIcon";
import GamePopup from "./GamePopup";
import "./Asteroids.css";
import { createMultipleJaffas, jaffas } from "./JaffasteroidsWhole";
import { updateJaffaCakes, handleCollisions } from "./CollisionBullets";
import { bullets, updateBullets } from './Bullets';
import { resetGame } from './ResetGame';
import ScoreCount from "./ScoreCount";

const Asteroids = () => {
    const canvasRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        setGameStarted(true);
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

        // Global state cleanup
        bullets.splice(0, bullets.length);
        jaffas.splice(0, jaffas.length);

        // Initialize the rocket sprite
        let rocketSprite;
        (async () => {
            rocketSprite = await createJaffaRocket(app);
        })();

        createMultipleJaffas(app, 5);

        const tickerCallback = (delta) => {
            if (!rocketSprite) return; // Ensure rocket is ready before processing
            updateJaffaCakes(app);
            updateBullets(app, delta);

            // Check collisions
            handleCollisions(bullets, app);

            // Reset game if all Jaffa Cakes are destroyed
            if (jaffas.length === 0) {
                resetGame(app);
            }
        };

        app.ticker.add(tickerCallback);

        return () => {
            app.ticker.remove(tickerCallback);
            app.stage.removeChildren();
            app.destroy(true, true);
            bullets.splice(0, bullets.length);
            jaffas.splice(0, jaffas.length);
        };
    }, [gameStarted]);

    return (
        <div className="asteroids-container" ref={canvasRef}>
            {!gameStarted && <GamePopup onStartGame={startGame} />}
            {gameStarted && <ScoreCount />}
        </div>
    );
};

export default Asteroids;



