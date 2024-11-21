import React, { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { createJaffaRocket } from "./AsteroidIcon";
import GamePopup from "./GamePopup";
import "./Asteroids.css";

const Asteroids = () => {
    const canvasRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

    useEffect(() => {
        if (!gameStarted) return; // Only initialize the game when it starts
        const canvasContainer = canvasRef.current;

        const app = new Application({
            resizeTo: canvasContainer,
            antialias: true,
            backgroundAlpha: 0,
        });

        if (canvasContainer) {
            canvasContainer.appendChild(app.view);
        }

        createJaffaRocket(app); // Initialize the Jaffa Rocket

        return () => {
            app.destroy(true, true);
        };
    }, [gameStarted]); // Effect re-runs only when `gameStarted` changes

    const startGame = () => {
        setGameStarted(true); // Start the game when the button is clicked
    };

    return (
        <div className="asteroids-container" ref={canvasRef}>
            {/* Render the popup only if the game hasn't started */}
            {!gameStarted && <GamePopup onStartGame={startGame} />}
        </div>
    );
};

export default Asteroids;


