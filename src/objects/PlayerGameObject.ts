import { Position } from "~/app/Models/Types/Position";
import gameConfig from "~/game";
import colors from "~/utils/Colors";

export default class PlayerGameObject extends Phaser.GameObjects.Sprite
{
    spotlight: Phaser.GameObjects.Light;
    isMoving: boolean;

    constructor(scene: Phaser.Scene)
    {
        let { x, y } = gameConfig.STARTING_POSITION;
        super(scene, x, y, 'player');

        this.setDepth(5);

        this.spotlight = scene.lights.addLight(x, y - 35, 94, colors.DAZZLED_BLUE, 3);
        this.isMoving = false;

        this.play('player-action')
    }

    updatePosition(position: Position)
    {
        this.isMoving = true;
        
        this.setPosition(position.x + 47, position.y + 75);
        this.anims.play('player-action');

        this.scene.tweens.add({
            targets: this.spotlight,
            ease: Phaser.Math.Easing.Sine.Out,
            x: position.x + 47,
            y: position.y + 47,
            onComplete: () => this.isMoving = false,
        });
    }
}