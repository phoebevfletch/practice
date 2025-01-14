import React from "react";
import "./ThreeLives.css";
import jaffaRocketImage from "./JaffaRocket.png";

const ThreeLives = ({ lives }) => {
    console.log("Rendering ThreeLives with lives:", lives); // Debugging
    return (
        <div className="lives-container">
            {Array.from({ length: lives }).map((_, index) => (
                <img
                    key={index}
                    src={jaffaRocketImage}
                    alt="Life"
                    className="life-icon"
                />
            ))}
        </div>
    );
};

export default ThreeLives;






