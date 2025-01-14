import { resetToCurrentWave } from './ResetGame';
import { jaffaBox } from './JaffasteroidsWhole';
import { splitJaffaCake } from './CollisionBullets';
import { advanceWave } from './ResetGame';
import { isBulletColliding } from './CollisionBullets';

/**
 * Check if two sprites are colliding
 * @param {Sprite} sprite1 - First sprite (the rocket)
 * @param {Sprite} sprite2 - Second sprite (a Jaffa Cake)
 * @returns {boolean}
 */
function isRocketColliding(sprite1, sprite2) {
    const dx = sprite1.x - sprite2.x;
    const dy = sprite1.y - sprite2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (sprite1.width / 2 + sprite2.width / 2);
}

let collisionHandled = false; // Add a flag to track collisions

/**
 * Handle collisions between the rocket and Jaffa Cakes
 * @param {Sprite} rocket - The rocket sprite
 * @param {Array} jaffaBox - Array of Jaffa Cakes
 * @param {Application} app - PIXI Application
 * @param {Function} onLifeLost - Callback to decrement lives

 */
export function handleRocketCollision(rocket, jaffaBox, app) {
    if (collisionHandled) return; // Skip if collision has already been handled

    for (let i = jaffaBox.length - 1; i >= 0; i--) {
        const jaffaCakeSprite = jaffaBox[i].sprite;

        if (isRocketColliding(rocket, jaffaCakeSprite)) {
            collisionHandled = true; // Set the flag to prevent multiple triggers
            resetToCurrentWave(app); // Reset to the current wave state

            setTimeout(() => {
                collisionHandled = false; // Allow collisions again after a short delay
            }, 100); // Adjust delay as needed
            break;
        }
    }
}




