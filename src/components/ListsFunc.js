
import React from "react";

function ListRenderer({ items, isOrdered }) { //items is the jaffa array
    const ListItems = items.map(item => (
        <li key={item.id}>
            <b>{isOrdered ? item.Type : item.Features}</b>: &nbsp;
            <i>{isOrdered ? item.Quantity : item.Description}</i>
        </li>
        // ? : ternary operator so, if isOrdered is true, display itemFeatures, if false display Type
        // note to self: find better way of doing this so multiple lists can be passed through

    ));
    return (
        <div style={{ textAlign: 'left' }}>
            {isOrdered ? <ol>{ListItems}</ol> : <ul>{ListItems}</ul>}
        </div>
    );
}

export default ListRenderer;
