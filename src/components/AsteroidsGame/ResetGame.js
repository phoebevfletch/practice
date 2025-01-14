import { createMultipleJaffas } from './JaffasteroidsWhole';
import { jaffaBox } from './JaffasteroidsWhole';
import { jaffaSpawnCount, resetJaffaSpawnCount } from './JaffasteroidsWhole';


let baseScale = 0.3; // Initial scale for JaffaCakes
let baseSpeed = 0.3; // Initial speed multiplier
let currentLevel = 1; // Starting level

export const getCurrentLevel = () => currentLevel; // Getter for the current level

export function resetBaseSpeed() {
    baseSpeed = 0.3; // Reset baseSpeed to the initial value
}

export function resetLevel() {
    currentLevel = 1; // Reset level to 1
}

function advanceWave(app) {
    if (jaffaSpawnCount < 5 || jaffaBox.length > 0) {
        return; // Don't advance the wave yet
    }

    currentLevel += 1;
    console.log(`Advancing to wave ${currentLevel}`);
    baseScale *= 0.98; // Reduce scale
    baseSpeed *= 1.3;  // Increase speed

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


export function clearJaffaTimeouts() {
    jaffaTimeouts.forEach(timeout => clearTimeout(timeout));
    jaffaTimeouts = []; // Reset timeout array
}


function resetToCurrentWave(app, rocketSprite) {
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

    // Center the rocket sprite
    if (rocketSprite) {
        rocketSprite.x = app.screen.width / 2;
        rocketSprite.y = app.screen.height / 2;
        rocketSprite.rotation = 0; // Reset rotation
        rocketSprite.velocity = 0; // Reset velocity (if applicable)
    }
}


export { jaffaTimeouts, baseSpeed, advanceWave, resetToCurrentWave };



