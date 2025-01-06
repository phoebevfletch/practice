import { Sprite, Assets } from "pixi.js";
import { wrapAround } from "./utils";
import WholeJaffa from "./JaffaCake.png";

export const jaffas = []; // Array to track all JaffaCakes

export async function createMultipleJaffas(app, numJaffas = 5, scale = 0.3, speedMultiplier = 0.5) {
    try {
        const texture = await Assets.load(WholeJaffa);
        if (!texture) {
            console.error("Failed to load texture for Jaffa");
            return;
        }

        // Clear existing Jaffa Cakes and remove their sprites from the stage
        jaffas.forEach(({ sprite }) => app.stage.removeChild(sprite));
        jaffas.length = 0; // Reset the array

        const spawnJaffa = (i) => {
            const jaffaSprite = new Sprite(texture);

            // Randomly place the Jaffas at the left or right side of the screen
            const side = Math.random() > 0.5 ? app.screen.width : 0;
            jaffaSprite.position.set(
                side, // Start on either the left (0) or right (app.screen.width)
                Math.random() * app.screen.height // Random Y position within the screen
            );

            jaffaSprite.scale.set(scale, scale);
            jaffaSprite.anchor.set(0.5);

            // Define a "central area" where Jaffas will move towards
            const centerX = app.screen.width / 2;
            const centerY = app.screen.height / 2;

            // Create random offset around the center (within a 200px radius)
            const randomOffsetX = Math.random() * 400 - 200; // Random X within a range of -200 to 200
            const randomOffsetY = Math.random() * 400 - 200; // Random Y within a range of -200 to 200

            // Random target point within the central region
            const targetX = centerX + randomOffsetX;
            const targetY = centerY + randomOffsetY;

            // Calculate the direction vector towards the random target
            const directionX = targetX - jaffaSprite.x;
            const directionY = targetY - jaffaSprite.y;
            const distance = Math.sqrt(directionX * directionX + directionY * directionY);

            // Normalize the direction and apply speed multiplier
            const speedX = (directionX / distance) * speedMultiplier;
            const speedY = (directionY / distance) * speedMultiplier;

            const rotates = Math.random() * 0.02 - 0.015;

            jaffas.push({
                sprite: jaffaSprite,
                speedX,
                speedY,
                rotates,
                generation: 0
            });
            app.stage.addChild(jaffaSprite);
        };

        for (let i = 0; i < numJaffas; i++) {
            setTimeout(() => spawnJaffa(i), i * 2000); // Delay by 2 seconds for each Jaffa
        }

        // Update movement logic for Jaffas
        app.ticker.add((delta) => {
            jaffas.forEach((jaffa) => {
                jaffa.sprite.x += jaffa.speedX * delta;
                jaffa.sprite.y += jaffa.speedY * delta;
                jaffa.sprite.rotation += jaffa.rotates * delta;

                wrapAround(jaffa.sprite, app.screen.width, app.screen.height);
            });
        });
    } catch (error) {
        console.error("Error in createMultipleJaffas:", error);
    }
}






