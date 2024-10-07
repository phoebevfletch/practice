import React from "react";

const RepeatButton = ({ onRepeat }) => {
    return (
        <button
            style={{
                padding: "10px 20px",
                marginTop: "20px",
                marginBottom: "20px",
                cursor: "pointer",
                backgroundColor: "#00008b",
                color: "white",
                border: "none",
                borderRadius: "5px",
            }}
            onClick={onRepeat}
        >
            Repeat Quiz
        </button>
    );
};


export default RepeatButton;
