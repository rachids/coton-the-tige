import Phaser from "phaser";
import eventsCenter from "~/app/EventsCenter";
import score from "~/app/Stores";
import { ResourceType } from "~/game";

export default class ScoreScene extends Phaser.Scene
{
    scoreFood: Phaser.GameObjects.Text;
    scoreWood: Phaser.GameObjects.Text;
    scoreStone: Phaser.GameObjects.Text;

    constructor()
    {
        super('score-scene');
    }

    create()
    {
        this.add.image(55, 540, ResourceType.FOOD)
        this.add.image(155, 540, ResourceType.WOOD)
        this.add.image(255, 540, ResourceType.STONE)

        let fontConfig = {
            fontFamily: 'Arial, serif',
            fontSize: '24px',
            color: '#83BCFF',
        };

        this.scoreFood = this.add.text(100, 520, '', fontConfig);
        this.scoreWood = this.add.text(200, 520, '', fontConfig);
        this.scoreStone = this.add.text(300, 520, '', fontConfig);

        eventsCenter.on('UPDATE_SCORE', this.updateScore, this);
    }

    updateScore()
    {
        this.scoreFood.text = score.food.toString();
        this.scoreWood.text = score.wood.toString();
        this.scoreStone.text = score.stone.toString();
    }
}