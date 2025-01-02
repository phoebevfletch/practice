import { Graphics } from "pixi.js";
import { wrapAround } from "./utils";

const bullets = []; // Array to store active bullets
const bulletSpeed = 5; //speed of bullets (pixels per frame)
const bulletLifetime = 90; // number of frames b ullet remains active

/**
 * Create a bullet at the given position and direction
 * @param {number} x - X position of the bullet
 * @param {number} y - Y position of the bullet
 * @param {number} rotation - Rotation of the rocket (direction of the bullet)
 * @param {Application} app - PIXI application
 */
export function createBullet(x, y, rotation, app) {
    const bullet = new Graphics();
    bullet.beginFill(0xFF8400);
    bullet.drawCircle(0, 0, 2); // Small circle for the bullet
    bullet.endFill();

    // set initial position of the bullet
    bullet.x = x;
    bullet.y = y;
    // align bullet's direction with the direction of the rocket
    bullet.rotation = rotation;

    // Calculate bullet velocity based on the rocket's rotation
    const velocity = {
        x: Math.cos(rotation - Math.PI / 2) * bulletSpeed,
        y: Math.sin(rotation - Math.PI / 2) * bulletSpeed,
    };

    // Add lifetime property
    bullet.lifetime = bulletLifetime;

    // Attach velocity to the bullet object
    bullet.velocity = velocity;

    // adds the bullet to global bullets array for tracking
    bullets.push(bullet);
    // adds the bullet to the PIXI.js stage, makes it visible on the screen
    app.stage.addChild(bullet);
}

/**
 * Update all bullet's positions and remove them if their lifetime ends
 * @param {Application} app - PIXI application
 * @param {number} delta - The delta time provided by PIXI ticker
 */
export function updateBullets(app, delta) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];

        // Update bullet position using delta
        bullet.x += bullet.velocity.x * delta;
        bullet.y += bullet.velocity.y * delta;

        // Decrease lifetime using delta
        bullet.lifetime -= delta;

        // Wrap around screen so bullet appears on other side of screen
        wrapAround(bullet, app.screen.width, app.screen.height);

        // Remove bullet if lifetime is over
        if (bullet.lifetime <= 0) {
            app.stage.removeChild(bullet);
            bullets.splice(i, 1); // Remove from the array
        }
    }
}


export { bullets };
