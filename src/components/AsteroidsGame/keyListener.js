export const KeyListener = (() => {
    const keyState = {};

    window.addEventListener("keydown", (e) => {
        keyState[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
        keyState[e.key] = false;
    });

    return keyState;
})();

