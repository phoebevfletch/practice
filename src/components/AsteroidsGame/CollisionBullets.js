import { Sprite } from "pixi.js";
import { wrapAround } from "./utils";
import { jaffaBox as jaffaBox } from "./JaffasteroidsWhole";
import { advanceWave } from "./ResetGame";
import { baseSpeed } from "./ResetGame"


/**
 * Check if two sprites are colliding
 * @param {Sprite|Graphics} sprite1 
 * @param {Sprite|Graphics} sprite2 
 * @returns {boolean}
 */
export function isBulletColliding(sprite1, sprite2) {
    const dx = sprite1.x - sprite2.x;
    const dy = sprite1.y - sprite2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (sprite1.width / 2 + sprite2.width / 2);
}


/**
 * Split a Jaffa Cake into two smaller Jaffa Cakes or destroy it if too small
 * @param {aJaffaCake structure} aJaffaCake - The Jaffa Cake to split
 * @param {Application} app - The PIXI Application
 */
function splitJaffaCake(aJaffaCake, app) {
    const currentScale = aJaffaCake.sprite.scale.x;
    const texture = aJaffaCake.sprite.texture;
    const currentX = aJaffaCake.sprite.x;
    const currentY = aJaffaCake.sprite.y;
    // Prevent further splitting if the scale is too small
    if (currentScale < 0.1 || aJaffaCake.generation >= 1) {
        app.stage.removeChild(aJaffaCake.sprite); // Remove the Jaffa Cake sprite
        return;
    }

    const newScale = currentScale / 2;
    // const baseSpeed = 0.5;

    for (let i = 0; i < 2; i++) {
        const newJaffaSprite = new Sprite(texture);
        newJaffaSprite.scale.set(newScale, newScale);
        newJaffaSprite.anchor.set(0.5);

        newJaffaSprite.x = currentX + (Math.random() * 100 - 50);
        newJaffaSprite.y = currentY + (Math.random() * 100 - 50);

        // Assign constant or limited rotation speed
        const speedRotation = Math.random() * 0.01 + 0.005; // Rotation between 0.005 and 0.01 radians/frame
        const speedX = (Math.random() - 3) * baseSpeed;
        const speedY = (Math.random() - 3) * baseSpeed;

        newJaffaSprite.rotation = speedRotation; // Assign rotation

        //newJaffaSprite.x = speedX;
        //newJaffaSprite.y = speedY;
        //newJaffaSprite.generation = (jaffaCake.generation || 0) + 1;

        jaffaBox.push({
            sprite: newJaffaSprite,
            speedX: speedX,
            speedY: speedY,
            speedRotation: speedRotation,
            generation: (aJaffaCake.generation || 0) + 1,
        });

        app.stage.addChild(newJaffaSprite);
    }

    app.stage.removeChild(aJaffaCake.sprite);
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

        for (let j = jaffaBox.length - 1; j >= 0; j--) {
            const aJaffaCake = jaffaBox[j];

            // CollisionBullets.js
            if (isBulletColliding(bullet, aJaffaCake.sprite)) {
                // Collision detected
                // Remove bullet
                app.stage.removeChild(bullet);
                bullets.splice(i, 1);

                // Update score
                if (aJaffaCake.generation === 0) {
                    score += 50; // Initial asteroid
                } else {
                    score += 100; // Smaller asteroid
                }

                // Handle splitting or destruction
                splitJaffaCake(aJaffaCake, app);

                // Remove the original Jaffa Cake from the array
                jaffaBox.splice(j, 1);
                // Advance to the next wave if all Jaffa Cakes are destroyed
                if (jaffaBox.length === 0) {
                    advanceWave(app);
                }

                break; // Stop checking other Jaffa Cakes for this bullet
            }


        }
    }
}


export function resetScore() {
    score = 0; // Reset score to 0
}

// Export score for other modules if needed
export function getScore() {
    return score;
}


/**
 * Update positions of Jaffa Cakes
 * @param {Application} app
 */
export function updateJaffaCakes(app) {
    for (let i = jaffaBox.length - 1; i >= 0; i--) {
        const aJaffaCake = jaffaBox[i];

        if (!aJaffaCake || !aJaffaCake.sprite) {
            jaffaBox.splice(i, 1);
            continue;
        }

        //const { sprite, speedX, speedY, rotation } = aJaffaCake;
        // Update position and rotation
        //sprite = aJaffaCake.sprite;
        aJaffaCake.sprite.x += aJaffaCake.speedX * app.ticker.deltaTime;
        aJaffaCake.sprite.y += aJaffaCake.speedY * app.ticker.deltaTime;
        aJaffaCake.sprite.rotation += aJaffaCake.speedRotation * app.ticker.deltaTime;
        //if (aJaffaCake.generation === 1) {
        //  console.log("gen1 Rotation ", aJaffaCake.sprite.rotation);
        //}
        // Wrap around the screen
        wrapAround(aJaffaCake.sprite, app.screen.width, app.screen.height);
    }
}



