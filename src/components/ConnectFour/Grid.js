import React from "react";
import GridImage from "./ConnectFourGrid.png";
import FrontJaffa from "./FrontJaffaCake.png";
import './Connect4.css'; // Import the CSS file

const Grid = () => {
    return (
        <div className="grid-container">
            {/* Grid image */}
            <img
                src={GridImage}
                alt="Connect Four Grid"
                className="grid-image"
            />

            {/* Jaffa Token image */}
            <img
                src={FrontJaffa}
                alt="Front JaffaCake"
                className="jaffa-token"
            />
        </div>
    );
};

export default Grid;


