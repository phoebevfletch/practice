import { createMultipleJaffas } from './JaffasteroidsWhole';
import { jaffaBox } from './JaffasteroidsWhole';
import { jaffaSpawnCount, resetJaffaSpawnCount } from './JaffasteroidsWhole';


let baseScale = 0.3; // Initial scale for JaffaCakes
let baseSpeed = 0.3; // Initial speed multiplier
let currentLevel = 1; // Starting level

export const getCurrentLevel = () => currentLevel; // Getter for the current level


function advanceWave(app) {
    if (jaffaSpawnCount < 5 || jaffaBox.length > 0) {
        return; // Don't advance the wave yet
    }

    currentLevel += 1;
    console.log(`Advancing to wave ${currentLevel}`);
    baseScale *= 0.98; // Reduce scale
    baseSpeed *= 1.1;  // Increase speed

    // Clear Jaffa Cakes
    jaffaBox.forEach(({ sprite }) => {
        if (sprite && app.stage.children.includes(sprite)) {
            app.stage.removeChild(sprite);
        }
    });
    jaffaBox.splice(0, jaffaBox.length);

    // Clear timeouts
    jaffaTimeouts.forEach(timeout => clearTimeout(timeout));
    jaffaTimeouts = [];

    // Reset spawn count
    resetJaffaSpawnCount();

    // Spawn new Jaffas
    createMultipleJaffas(app, 5, baseScale, baseSpeed);
}




let jaffaTimeouts = []; // Keep track of all active timeouts


function resetToCurrentWave(app) {
    // Clear existing Jaffa Cakes
    jaffaBox.forEach(({ sprite }) => {
        if (sprite && app.stage.children.includes(sprite)) {
            app.stage.removeChild(sprite);
        }
    });
    jaffaBox.splice(0, jaffaBox.length);

    // Clear timeouts
    console.log("resetting timeouts");
    jaffaTimeouts.forEach(timeout => clearTimeout(timeout));
    jaffaTimeouts = [];

    // Reset spawn count
    resetJaffaSpawnCount();

    console.log("baseSpeed ", baseSpeed);

    // Recreate Jaffa Cakes for the current wave
    createMultipleJaffas(app, 5, baseScale, baseSpeed);
}




export { jaffaTimeouts, baseSpeed, advanceWave, resetToCurrentWave };



