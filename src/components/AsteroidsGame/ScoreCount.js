import React, { useState, useEffect } from "react";
import "./ScoreCount.css";
import { getScore } from "./CollisionBullets"; // Import the score getter

const ScoreCount = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScore(getScore()); // Fetch and update score every 100ms
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="score-counter">
            Score: {score}
        </div>
    );
};

export default ScoreCount;


