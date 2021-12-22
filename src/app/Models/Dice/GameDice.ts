import Phaser from "phaser";
import { diceManager } from "~/app/Services/DiceService";
import score from "~/app/Stores";
import { TurnHandler } from "~/app/TurnHandler";
import gameConfig from "~/game";

export default class GameDice extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, posX: number, posY: number) {
        super(scene, posX, posY, 'dice', diceManager.getDiceSprite[0]);

        scene.add.existing(this);

        this.setInteractive();
        this.on('pointerdown', this.roll, this);
    }

    roll()
    {
        if (! gameConfig.COTON_DEBUG) {
            if (this.scene.player.isMoving) {
                return;
            }
    
            this.scene.player.isMoving = true;
        }

        diceManager.roll();
        this.setFrame(diceManager.getDiceSprite()[score.lastDiceValue - 1]);

        TurnHandler.newTurn();
    }
}