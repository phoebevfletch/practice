import { Sprite } from "pixi.js";
import { wrapAround } from "./utils";
import { jaffas } from "./JaffasteroidsWhole";
import { advanceWave } from "./ResetGame";
import { baseSpeed } from "./ResetGame"
/**
 * Check if two sprites are colliding
 * @param {Sprite|Graphics} sprite1 
 * @param {Sprite|Graphics} sprite2 
 * @returns {boolean}
 */
function isBulletColliding(sprite1, sprite2) {
    const dx = sprite1.x - sprite2.x;
    const dy = sprite1.y - sprite2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (sprite1.width / 2 + sprite2.width / 2);
}

/**
 * Split a Jaffa Cake into two smaller Jaffa Cakes or destroy it if too small
 * @param {Sprite} jaffaCake - The Jaffa Cake to split
 * @param {Application} app - The PIXI Application
 */
function splitJaffaCake(jaffaCake, app) {
    const currentScale = jaffaCake.scale.x;

    // Prevent further splitting if the scale is too small
    if (currentScale < 0.1 || jaffaCake.generation >= 1) {
        app.stage.removeChild(jaffaCake); // Remove the Jaffa Cake
        return;
    }

    const newScale = currentScale / 2;
    // const baseSpeed = 0.5;

    for (let i = 0; i < 2; i++) {
        const newJaffa = new Sprite(jaffaCake.texture);
        newJaffa.scale.set(newScale, newScale);
        newJaffa.anchor.set(0.5);
        newJaffa.x = jaffaCake.x + (Math.random() * 100 - 50);
        newJaffa.y = jaffaCake.y + (Math.random() * 100 - 50);

        // Assign constant or limited rotation speed
        const rotates = 0.01; //Math.random() * 0.01 + 0.005; // Rotation between 0.005 and 0.01 radians/frame
        const speedX = (Math.random() - 0.5) * baseSpeed;
        const speedY = (Math.random() - 0.5) * baseSpeed;

        newJaffa.rotation = rotates; // Assign rotation speed
        newJaffa.speedX = speedX;
        newJaffa.speedY = speedY;
        newJaffa.generation = (jaffaCake.generation || 0) + 1;

        jaffas.push({
            sprite: newJaffa,
            speedX: newJaffa.speedX,
            speedY: newJaffa.speedY,
            rotates: newJaffa.rotation,
            generation: newJaffa.generation,
        });

        app.stage.addChild(newJaffa);
    }

    app.stage.removeChild(jaffaCake);
}




/**
 * Handle collisions between bullets and Jaffa Cakes
 * @param {Array} bullets - Array of active bullets
 * @param {Application} app - PIXI Application
 */
let score = 0; // Global score variable

export function handleCollisions(bullets, app) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];

        for (let j = jaffas.length - 1; j >= 0; j--) {
            const jaffa = jaffas[j];

            // CollisionBullets.js
            if (isBulletColliding(bullet, jaffa.sprite)) {
                // Collision detected
                // Remove bullet
                app.stage.removeChild(bullet);
                bullets.splice(i, 1);

                // Update score
                if (jaffa.generation === 0) {
                    score += 50; // Initial asteroid
                } else {
                    score += 100; // Smaller asteroid
                }

                // Handle splitting or destruction
                splitJaffaCake(jaffa.sprite, app);

                // Remove the original Jaffa Cake from the array
                jaffas.splice(j, 1);
                // Advance to the next wave if all Jaffa Cakes are destroyed
                if (jaffas.length === 0) {
                    advanceWave(app);
                }

                break; // Stop checking other Jaffa Cakes for this bullet
            }


        }
    }
}

// Export score for other modules if needed
export function getScore() {
    return score;
}


/**
 * Add a new Jaffa Cake to the tracking array
 * @param {Sprite} jaffaCake
 */
export function addJaffaCake(jaffaCake) {
    jaffas.push(jaffaCake);
}

/**
 * Update positions of Jaffa Cakes
 * @param {Application} app
 */
export function updateJaffaCakes(app) {
    for (let i = jaffas.length - 1; i >= 0; i--) {
        const jaffa = jaffas[i];

        if (!jaffa || !jaffa.sprite) {
            jaffas.splice(i, 1);
            continue;
        }

        const { sprite, speedX, speedY, rotates } = jaffa;
        // Update position and rotation
        sprite.x += speedX * app.ticker.deltaTime;
        sprite.y += speedY * app.ticker.deltaTime;
        sprite.rotation += rotates * app.ticker.deltaTime;
        if (jaffa.generation === 1) {
            console.log("gen1 Rotation ", sprite.rotation);
        }
        // Wrap around the screen
        wrapAround(sprite, app.screen.width, app.screen.height);
    }
}



