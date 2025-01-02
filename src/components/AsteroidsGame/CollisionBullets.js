import { Sprite } from "pixi.js";
import { Graphics } from "pixi.js";
import { wrapAround } from "./utils";
import { jaffas } from "./JaffasteroidsWhole"; // Import jaffas array from JaffasteroidsWhole

/**
 * Check if two sprites are colliding
 * @param {Sprite|Graphics} sprite1 
 * @param {Sprite|Graphics} sprite2 
 * @returns {boolean}
 */
function isColliding(sprite1, sprite2) {
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
    const speedMultiplier = 0.5;

    for (let i = 0; i < 2; i++) {
        const newJaffa = new Sprite(jaffaCake.texture);
        newJaffa.scale.set(newScale, newScale);
        newJaffa.anchor.set(0.5);
        newJaffa.x = jaffaCake.x + (Math.random() * 100 - 50);
        newJaffa.y = jaffaCake.y + (Math.random() * 100 - 50);
        newJaffa.speedX = (Math.random() * 1 - 0.8) * speedMultiplier;
        newJaffa.speedY = (Math.random() * 1 - 0.8) * speedMultiplier;
        newJaffa.rotates = Math.random() * 0.05 - 0.025;
        newJaffa.generation = (jaffaCake.generation || 0) + 1;

        jaffas.push({
            sprite: newJaffa,
            speedX: newJaffa.speedX,
            speedY: newJaffa.speedY,
            rotates: newJaffa.rotates,
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

            if (isColliding(bullet, jaffa.sprite)) {
                // Collision detected

                // Remove bullet
                app.stage.removeChild(bullet);
                bullets.splice(i, 1);

                // Update score based on the generation of the Jaffa Cake
                if (jaffa.generation === 0) {
                    score += 50; // Initial asteroid
                } else {
                    score += 100; // Smaller asteroid
                }

                // Handle splitting or destruction
                splitJaffaCake(jaffa.sprite, app);

                // Remove the original Jaffa Cake from the array
                jaffas.splice(j, 1);

                // Log or update score display (optional for debugging)
                console.log("Score:", score);

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
            console.warn("Found null or undefined Jaffa object, removing...");
            jaffas.splice(i, 1);
            continue;
        }

        const { sprite, speedX, speedY, rotates } = jaffa;

        // Update position and rotation
        sprite.x += speedX * app.ticker.deltaTime;
        sprite.y += speedY * app.ticker.deltaTime;
        sprite.rotation += rotates * app.ticker.deltaTime;

        // Wrap around the screen
        wrapAround(sprite, app.screen.width, app.screen.height);
    }
}



