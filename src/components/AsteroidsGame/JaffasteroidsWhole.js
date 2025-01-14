import { Sprite, Assets } from "pixi.js";
import WholeJaffa from "./JaffaCake.png";
import { jaffaTimeouts, baseSpeed } from "./ResetGame";
import { handleRocketCollision } from './CollisionRocket';

export const jaffaBox = []; // Array to track all JaffaCakes 
export let jaffaSpawnCount = 0;

export function resetJaffaSpawnCount() {
    jaffaSpawnCount = 0;
}
export function incrementJaffaSpawnCount() {
    jaffaSpawnCount++;
}

export async function createMultipleJaffas(app, numJaffas = 5, scale = 0.3, speedMultiplier = baseSpeed) {
    console.log("base speed ", baseSpeed);
    try {
        const texture = await Assets.load(WholeJaffa);
        if (!texture) {
            console.error("Failed to load texture for Jaffa");
            return;
        }

        // Clear existing Jaffa Cakes and reset spawn count
        jaffaBox.forEach(({ sprite }) => app.stage.removeChild(sprite));
        jaffaBox.splice(0, jaffaBox.length);
        jaffaSpawnCount = 0; // Reset the spawn count for the wave

        const spawnJaffa = () => {
            // Stop if the app or texture is undefined
            if (!app || !app.stage || !texture) {
                console.log("Stopping Jaffa spawn due to missing app or texture.");
                return;
            }

            const jaffaSprite = new Sprite(texture);

            // Ensure the sprite and texture are valid before accessing their properties
            if (!jaffaSprite || !jaffaSprite.texture) {
                console.error("Jaffa sprite or texture is undefined. Aborting spawn.");
                return;
            }

            const side = Math.random() > 0.5 ? app.screen.width : 0;
            jaffaSprite.position.set(
                side,
                Math.random() * app.screen.height
            );

            jaffaSprite.scale.set(scale, scale);
            jaffaSprite.anchor.set(0.5);

            const centerX = app.screen.width / 2;
            const centerY = app.screen.height / 2;
            const randomOffsetX = Math.random() * 400 - 200;
            const randomOffsetY = Math.random() * 400 - 200;
            const targetX = centerX + randomOffsetX;
            const targetY = centerY + randomOffsetY;

            const directionX = targetX - jaffaSprite.x;
            const directionY = targetY - jaffaSprite.y;
            const distance = Math.sqrt(directionX * directionX + directionY * directionY);

            const speedX = (directionX / distance) * speedMultiplier;
            const speedY = (directionY / distance) * speedMultiplier;

            const speedRotation = Math.random() * 0.02 - 0.015;

            jaffaBox.push({
                sprite: jaffaSprite,
                speedX,
                speedY,
                speedRotation,
                generation: 0
            });
            app.stage.addChild(jaffaSprite);

            jaffaSpawnCount++; // Increment spawn count

            if (jaffaSpawnCount < numJaffas) {
                jaffaTimeouts.push(setTimeout(spawnJaffa, 1000)); // Spawn next asteroid
            }
        };


        spawnJaffa(); // Start spawning

    } catch (error) {
        console.error("Error in createMultipleJaffas:", error);
    }
}




