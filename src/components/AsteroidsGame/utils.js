export function wrapAround(sprite, screenWidth, screenHeight) {
    if (!sprite.width || !sprite.height) {
        return;
    }

    if (sprite.x < -sprite.width / 2) sprite.x = screenWidth + sprite.width / 2;
    if (sprite.x > screenWidth + sprite.width / 2) sprite.x = -sprite.width / 2;
    if (sprite.y < -sprite.height / 2) sprite.y = screenHeight + sprite.height / 2;
    if (sprite.y > screenHeight + sprite.height / 2) sprite.y = -sprite.height / 2;
}

