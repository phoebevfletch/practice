import React from "react";
import "./RepeatButtonStyle.css";

const RepeatButton = ({ onRepeat }) => {
    return (
        <button
            className="RepeatButtonDesign"
            onClick={onRepeat}
        >
            Repeat Quiz
        </button>
    );
};


export default RepeatButton;
