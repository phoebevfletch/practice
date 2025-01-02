import { Sprite, Assets } from "pixi.js";
import { wrapAround } from "./utils";
import { KeyListener } from "./keyListener";
import jaffaRocket from "./JaffaRocket.png";
import flameTexturePath from "./flame.png";
import { createBullet, updateBullets } from "./Bullets";

export async function createJaffaRocket(app) {
    try {
        const texture = await Assets.load(jaffaRocket);
        const flameTexture = await Assets.load(flameTexturePath);

        if (!texture || !flameTexture) {
            console.error("Error loading textures");
            return;
        }

        const jaffaSprite = new Sprite(texture);
        jaffaSprite.scale.set(0.3, 0.3);
        jaffaSprite.anchor.set(0.5);
        jaffaSprite.x = app.screen.width / 2;
        jaffaSprite.y = app.screen.height / 2;

        const flame = new Sprite(flameTexture);
        flame.anchor.set(0.5, 1.7); // Anchor at the top center of the flame
        flame.scale.set(0.2, -0.15); // Scale down and flip vertically
        flame.visible = false; // Initially hidden
        jaffaSprite.addChild(flame);

        app.stage.addChild(jaffaSprite);

        let velocity = 0;
        const acceleration = 0.3;
        const maxSpeed = 2;
        const rotationSpeed = 0.1;

        // Add bullet shooting logic
        let shootCooldown = 0; // Prevent constant firing
        const cooldownFrames = 10; // firing rate


        app.ticker.add((delta) => {
            if (!jaffaSprite.texture || !jaffaSprite.width || !jaffaSprite.height) {
                return;
            }

            // Adjust flame position relative to sprite bounds
            const bounds = jaffaSprite.getBounds(); // Get bounds of the sprite
            flame.position.set(0, bounds.height / 2 + 5);

            // Handle user input for movement
            if (KeyListener["ArrowUp"]) {
                velocity = Math.min(velocity + acceleration * delta, maxSpeed);
                flame.visible = true; // Show flame when accelerating
            } else {
                velocity *= 0.98 ** delta; // Apply friction
                flame.visible = false; // Hide flame
            }

            // Handle rocket rotation
            if (KeyListener["ArrowLeft"]) {
                jaffaSprite.rotation -= rotationSpeed * delta; // Rotate left
            }

            if (KeyListener["ArrowRight"]) {
                jaffaSprite.rotation += rotationSpeed * delta; // Rotate right
            }

            // Handle shooting
            if (KeyListener[" "]) { // Space bar for shooting
                if (shootCooldown <= 0) {
                    createBullet(
                        jaffaSprite.x + Math.cos(jaffaSprite.rotation - Math.PI / 2) * (jaffaSprite.height / 2),
                        jaffaSprite.y + Math.sin(jaffaSprite.rotation - Math.PI / 2) * (jaffaSprite.height / 2),
                        jaffaSprite.rotation,
                        app
                    );
                    shootCooldown = cooldownFrames;
                }
            }

            if (shootCooldown > 0) {
                shootCooldown -= 1 * delta;
            }

            // Update bullets
            updateBullets(app, delta);

            // Apply movement based on rotation
            jaffaSprite.x += Math.cos(jaffaSprite.rotation - Math.PI / 2) * velocity * delta;
            jaffaSprite.y += Math.sin(jaffaSprite.rotation - Math.PI / 2) * velocity * delta;


            // Ensure the rocket stays within the screen bounds
            wrapAround(jaffaSprite, app.screen.width, app.screen.height);
        });

        return jaffaSprite;
    }
    catch (error) {
        console.error("Error in createJaffaRocket:", error);
    }
}


