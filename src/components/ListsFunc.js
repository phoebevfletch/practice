
import React from "react";

function ListRenderer({ items, isOrdered }) {

}


function ListRenderer({ items, isOrdered }) { //items is the jaffa array
    const ListItems = items.map(item => (
        <li key={item.id}>
            <b>{isOrdered ? item.Type : item.Features}</b>: &nbsp;
            <i>{isOrdered ? item.Quantity : item.Description}</i>
        </li>
        // ? : ternary operator so, if isOrdered is true, display itemFeatures, if false display Type

    ));
    return (
        <div style={{ textAlign: 'left' }}>
            {isOrdered ? <ol>{ListItems}</ol> : <ul>{ListItems}</ul>}
        </div>
    );
}

export default ListRenderer;
