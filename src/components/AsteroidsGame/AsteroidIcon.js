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
            return null; // Return null if assets failed to load
        }

        const rocketSprite = new Sprite(texture);
        rocketSprite.scale.set(0.3, 0.3);
        rocketSprite.anchor.set(0.5);

        // Dynamically calculate the center of the screen
        rocketSprite.x = app.screen.width / 2;
        rocketSprite.y = app.screen.height / 2;

        const flame = new Sprite(flameTexture);
        flame.anchor.set(0.5, 1.7);
        flame.scale.set(0.2, -0.15);
        flame.visible = false;
        rocketSprite.addChild(flame);

        app.stage.addChild(rocketSprite);

        let velocityX = 0;
        let velocityY = 0
        const acceleration = 0.2;
        const maxSpeed = 4;
        const rotationSpeed = 0.1;

        let shootCooldown = 0; // Prevent constant firing
        const cooldownFrames = 10; // firing rate

        app.ticker.add((delta) => {
            if (!rocketSprite.texture || !rocketSprite.width || !rocketSprite.height) {
                return;
            }

            const bounds = rocketSprite.getBounds();
            flame.position.set(0, bounds.height / 2 + 5);

            if (KeyListener["ArrowUp"]) {
                velocityX += Math.cos(rocketSprite.rotation - Math.PI / 2) * acceleration * delta;
                velocityY += Math.sin(rocketSprite.rotation - Math.PI / 2) * acceleration * delta;
                // Limit the speed to maxSpeed
                const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
                if (speed > maxSpeed) {
                    velocityX = (velocityX / speed) * maxSpeed;
                    velocityY = (velocityY / speed) * maxSpeed;
                }

                flame.visible = true; // Show flame when accelerating
            } else {
                flame.visible = false; // Hide flame
            }

            // Apply friction to gradually reduce velocity
            velocityX *= 0.99 ** delta;
            velocityY *= 0.99 ** delta;

            if (KeyListener["ArrowLeft"]) {
                rocketSprite.rotation -= rotationSpeed * delta; // Rotate left
            }

            if (KeyListener["ArrowRight"]) {
                rocketSprite.rotation += rotationSpeed * delta; // Rotate right
            }

            if (KeyListener[" "]) { // Space bar for shooting
                if (shootCooldown <= 0) {
                    createBullet(
                        rocketSprite.x + Math.cos(rocketSprite.rotation - Math.PI / 2) * (rocketSprite.height / 2),
                        rocketSprite.y + Math.sin(rocketSprite.rotation - Math.PI / 2) * (rocketSprite.height / 2),
                        rocketSprite.rotation,
                        app
                    );
                    shootCooldown = cooldownFrames;
                }
            }

            if (shootCooldown > 0) {
                shootCooldown -= 1 * delta;
            }

            updateBullets(app, delta);

            // Update the rocket's position using velocity
            rocketSprite.x += velocityX * delta;
            rocketSprite.y += velocityY * delta;

            wrapAround(rocketSprite, app.screen.width, app.screen.height);
        });

        return rocketSprite; // Return the rocket sprite
    } catch (error) {
        console.error("Error in createJaffaRocket:", error);
        return null;
    }
}


