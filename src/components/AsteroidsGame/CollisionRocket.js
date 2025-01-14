import { resetToCurrentWave } from './ResetGame';
import { createBrokenRocketEffect } from './BrokenAsteroid'; // Import the particle emitter
import { isBulletColliding } from './CollisionBullets';

/**
 * Check if two sprites are colliding
 * @param {Sprite} sprite1 - First sprite (the rocket)
 * @param {Sprite} sprite2 - Second sprite (a Jaffa Cake)
 * @returns {boolean}
 */
function isRocketColliding(sprite1, sprite2) {
    if (!sprite1 || !sprite2 || typeof sprite1.width === "undefined" || typeof sprite2.width === "undefined") {
        return false; // Prevent errors if either sprite is undefined
    }

    const dx = sprite1.x - sprite2.x;
    const dy = sprite1.y - sprite2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (sprite1.width / 2 + sprite2.width / 2);
}


let invincible = false; // Global flag for rocket invincibility

/**
 * Handle collisions between the rocket and Jaffa Cakes
 * @param {Sprite} rocket - The rocket sprite
 * @param {Array} jaffaBox - Array of Jaffa Cakes
 * @param {Application} app - PIXI Application
 * @param {Function} onLifeLost - Callback to decrement lives
 */
export function handleRocketCollision(rocket, jaffaBox, app, onLifeLost) {
    if (!rocket || !rocket.texture || typeof rocket.width === "undefined" || typeof rocket.height === "undefined") {
        console.warn("Rocket or its properties are not initialized. Skipping collision handling.");
        return;
    }

    if (invincible) return;

    for (let i = jaffaBox.length - 1; i >= 0; i--) {
        const jaffaCakeSprite = jaffaBox[i]?.sprite;
        if (!jaffaCakeSprite || typeof jaffaCakeSprite.width === "undefined") {
            console.warn("Jaffa Cake sprite is not initialized. Skipping...");
            continue;
        }

        const dx = rocket.x - jaffaCakeSprite.x;
        const dy = rocket.y - jaffaCakeSprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (rocket.width / 2 + jaffaCakeSprite.width / 2)) {
            invincible = true;

            // Make the rocket invisible immediately
            rocket.visible = false;

            // Trigger particle effect
            createBrokenRocketEffect(app, rocket.x, rocket.y);

            // Call loseLife to handle life decrement
            onLifeLost();

            setTimeout(() => {
                // Reset rocket position and properties
                rocket.x = app.screen.width / 2;
                rocket.y = app.screen.height / 2;
                rocket.rotation = 0;

                let flashCount = 0;
                const flashInterval = setInterval(() => {
                    rocket.alpha = rocket.alpha === 1 ? 0.5 : 1;
                    flashCount++;
                    if (flashCount > 30) {
                        clearInterval(flashInterval);
                        rocket.alpha = 1;
                        invincible = false;
                    }
                }, 100);

                rocket.visible = true; // Reappear after reset
            }, 2000); // Wait for 2 seconds before repositioning the rocket

            break;
        }
    }
}

