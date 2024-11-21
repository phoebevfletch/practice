import { Sprite, Assets } from "pixi.js";
import { wrapAround } from "./utils"; // Import only `wrapAround` from utils
import { KeyListener } from "./keyListener"; // Import `KeyListener` directly
import jaffaRocket from "./JaffaRocket.png";
import flameTexturePath from "./flame.png";


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
        const acceleration = 0.2;
        const maxSpeed = 3;
        const rotationSpeed = 0.1;

        app.ticker.add(() => {
            // Ensure the sprite has dimensions before accessing them
            if (!jaffaSprite.texture || !jaffaSprite.width || !jaffaSprite.height) {
                return;
            }

            // Adjust flame position relative to sprite bounds
            const bounds = jaffaSprite.getBounds(); // Get bounds of the sprite
            flame.position.set(0, bounds.height / 2 + 5);

            // Handle user input for movement
            if (KeyListener["ArrowUp"]) {
                velocity = Math.min(velocity + acceleration, maxSpeed);
                flame.visible = true; // Show flame when accelerating
            } else {
                velocity *= 0.98; // Apply friction
                flame.visible = false; // Hide flame
            }

            // Handle rocket rotation
            if (KeyListener["ArrowLeft"]) {
                jaffaSprite.rotation -= rotationSpeed; // Rotate left
            }

            if (KeyListener["ArrowRight"]) {
                jaffaSprite.rotation += rotationSpeed; // Rotate right
            }

            // Apply movement based on rotation
            jaffaSprite.x += Math.cos(jaffaSprite.rotation - Math.PI / 2) * velocity;
            jaffaSprite.y += Math.sin(jaffaSprite.rotation - Math.PI / 2) * velocity;

            // Ensure the rocket stays within the screen bounds
            wrapAround(jaffaSprite, app.screen.width, app.screen.height);
        });

        return jaffaSprite;
    }
    catch (error) {
        console.error("Error in createJaffaRocket:", error);
    }
}


