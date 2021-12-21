import Phaser from "phaser";
import eventsCenter from "~/app/EventsCenter";
import score from "~/app/Stores";
import gameConfig from "~/game";
import Dice from "~/utils/Dice";

const DiceSprite = [1,2,5,6,4,0,];

export default class GameDice extends Phaser.GameObjects.Sprite {
    min: number = 1;
    max: number = 6;
    dice: Dice;
    currentValue: number = 1;
    durationInMiliseconds: number = 500;

    constructor(scene: Phaser.Scene, posX: number, posY: number) {
        super(scene, posX, posY, 'dice', DiceSprite[0]);

        scene.add.existing(this);

        this.dice = new Dice(this.min, this.max);

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


        /* TODO: animation à revoir

        let timer = setInterval(
            () => {
                this.setFrame(DiceSprite[this.dice.throw() - 1]);
            },
            30
        );

        setTimeout(
            () => {
                clearInterval(timer);
            }, this.durationInMiliseconds
        )*/

        this.currentValue = this.dice.throw();
        this.setFrame(DiceSprite[this.currentValue - 1]);

        eventsCenter.emit('dice-rolled', this);
    }
}