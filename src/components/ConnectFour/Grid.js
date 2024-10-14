import React from "react";
import GridImage from "./ConnectFourGrid.png";

const Grid = () => {
    return (
        <div
            style={{
                background: "#87CEFA",
                marginTop: "0px",
                height: "500px",
                padding: "20px",
                borderRadius: "10px",
                boxSizing: "border-box",
            }}
        >
            <img src={GridImage} alt="Connect Four Grid" />
        </div>
    );
};

export default Grid;

