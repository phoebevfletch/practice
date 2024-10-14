import React from "react";
import ListRenderer from "./ListsFunc";

/* Biscuits and JaffaCakes components are exported using a named export which allows you to export multiple components
from a file */

// id: is used as a unique identifier to keep track of individual items in thje list
export function Biscuits() {
    const Biccies = [{ id: 1, Type: "Jaffa Cakes", Quantity: "10/10" },
    { id: 2, Type: "Digestives", Quantity: "5/10" },
    { id: 3, Type: "HobNobs", Quantity: "3/10" },
    { id: 4, Type: "Custard Creams", Quantity: "7/10" },
    { id: 5, Type: "Jammy Dodger", Quantity: "9/10" },
    { id: 6, Type: "Chocolate Digestive", Quantity: "8/10" },
    { id: 7, Type: "Lotus Biscuits", Quantity: "2/10" }];


    Biccies.sort((a, b) => a.Type.localeCompare(b.Type)); // sort alphabetically

    /* returns the ItemList component, passin two props. The Biccies array is the items prop and then also 
    isBiscuit={true}. */
    return <ListRenderer items={Biccies} isOrdered={true} />;
}


export function JaffaCakes() {
    const Jaffa = [{ id: 1, Features: "Texture", Description: "They have the texture and ingredients of a sponge cake" },
    { id: 2, Features: "Staling", Description: "When Jaffa cakes go stale they harden, like a cake, rather than soften, like a biscuit" },
    { id: 3, Features: "Bulk", Description: "The sponge part of a Jaffa Cake is a substantial part of the product in terms of bulk and texture" },
    { id: 4, Features: "Name", Description: "The product's name was not considered a major factor" }];

    return <ListRenderer items={Jaffa} isOrdered={false} />;
}