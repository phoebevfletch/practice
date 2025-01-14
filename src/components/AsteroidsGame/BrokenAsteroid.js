import { Sprite, Container, Texture } from "pixi.js";

// Import the broken rocket pieces
import topLeftPiece from "./jaffacake_top_left.png";
import topRightPiece from "./jaffacake_top_right.png";
import bottomLeftPiece from "./jaffacake_bottom_left.png";
import bottomRightPiece from "./jaffacake_bottom_right.png";

export function createBrokenRocketEffect(app, x, y) {
    const container = new Container();
    app.stage.addChild(container);

    const textures = [
        Texture.from(topLeftPiece),
        Texture.from(topRightPiece),
        Texture.from(bottomLeftPiece),
        Texture.from(bottomRightPiece),
    ];

    textures.forEach((texture) => {
        const piece = new Sprite(texture);
        piece.anchor.set(0.5);
        piece.scale.set(0.3); // Scale down the pieces
        piece.x = x;
        piece.y = y;

        const velocityX = (Math.random() - 0.5) * 10;
        const velocityY = (Math.random() - 0.5) * 10;
        const rotationSpeed = (Math.random() - 0.5) * 0.1;

        container.addChild(piece);

        app.ticker.add((delta) => {
            if (!piece || !piece.parent) return; // Skip if the piece is already removed
            piece.x += velocityX * delta;
            piece.y += velocityY * delta;
            piece.rotation += rotationSpeed * delta;

            piece.alpha -= 0.01 * delta;
            if (piece.alpha <= 0) {
                container.removeChild(piece); // Remove the piece safely
            }
        });
    });

    setTimeout(() => {
        if (container.parent) {
            app.stage.removeChild(container); // Safely remove the container
        }
    }, 2000);
}

