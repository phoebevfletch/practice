import { createMultipleJaffas } from './JaffasteroidsWhole';
import { jaffas } from './JaffasteroidsWhole';

let baseScale = 0.3; // Initial scale for JaffaCakes
let baseSpeed = 0.3; // Initial speed multiplier

function advanceWave(app) {
    console.log("advaance wave");
    baseScale *= 0.98; // Reduce the scale slightly
    baseSpeed *= 1.1;  // Increase the speed slightly

    // Remove all existing Jaffa Cakes from the stage
    jaffas.forEach(({ sprite }) => {
        if (sprite && app.stage.children.includes(sprite)) {
            app.stage.removeChild(sprite);
        }
    });

    // Clear the jaffas array
    jaffas.splice(0, jaffas.length);
    // Create new Jaffa Cakes for the next wave
    createMultipleJaffas(app, 5, baseScale, baseSpeed);
}

let jaffaTimeouts = []; // Keep track of all active timeouts

function resetToCurrentWave(app) {
    // Clear existing Jaffa Cakes from the stage
    jaffas.forEach(({ sprite }) => {
        if (sprite && app.stage.children.includes(sprite)) {
            app.stage.removeChild(sprite);
        }
    });
    jaffas.splice(0, jaffas.length);

    // Clear all timeouts to prevent spawning old Jaffa Cakes
    console.log("resetting timeouts");
    jaffaTimeouts.forEach(timeout => clearTimeout(timeout));
    jaffaTimeouts = []; // Reset the timeout tracker
    console.log("baseSpeed ", baseSpeed);
    // Recreate Jaffa Cakes for the current wave
    createMultipleJaffas(app, 5, baseScale, baseSpeed);
}



export { jaffaTimeouts, baseSpeed, advanceWave, resetToCurrentWave };



