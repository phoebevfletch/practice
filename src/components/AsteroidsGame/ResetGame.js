import { createMultipleJaffas } from './JaffasteroidsWhole';
import { jaffas } from './JaffasteroidsWhole';

let baseScale = 0.3; // Initial scale for JaffaCakes
let baseSpeed = 0.3;   // Initial speed multiplier
let resetting = false; // Prevent multiple resets simultaneously

function resetGame(app) {
    if (resetting) return; // Prevent multiple reset calls
    resetting = true;

    baseScale *= 0.98; // Reduce the scale slightly
    baseSpeed *= 1.1; // Increase the speed slightly

    // Wait for all Jaffas to spawn and be destroyed
    const checkAndReset = setInterval(() => {
        if (jaffas.length === 0) {
            clearInterval(checkAndReset);
            resetting = false;
            createMultipleJaffas(app, 5, baseScale, baseSpeed);
        }
    }, 500); // Check every 0.5 seconds
}

export { resetGame };




