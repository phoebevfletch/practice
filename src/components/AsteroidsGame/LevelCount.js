import React, { useState, useEffect } from "react";
import "./LevelCount.css";
import { getCurrentLevel } from "./ResetGame";

const LevelCount = () => {
    const [level, setLevel] = useState(getCurrentLevel());

    useEffect(() => {
        const interval = setInterval(() => {
            setLevel(getCurrentLevel()); // Fetch and update the level every 100ms
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="level-counter">
            Level: {level}
        </div>
    );
};

export default LevelCount;


