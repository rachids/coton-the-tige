import Phaser from "phaser";
import eventsCenter from "~/app/EventsCenter";
import score from "~/app/Stores";
import { ResourceType } from "~/game";

export default class ScoreScene extends Phaser.Scene
{
    scoreMoney: Phaser.GameObjects.Text;
    scoreFood: Phaser.GameObjects.Text;
    scoreWood: Phaser.GameObjects.Text;
    scoreStone: Phaser.GameObjects.Text;
    energy: Phaser.GameObjects.Text;

    constructor()
    {
        super('score-scene');
    }

    create()
    {
        this.add.image(155, 540, ResourceType.FOOD)
        this.add.image(255, 540, ResourceType.WOOD)
        this.add.image(355, 540, ResourceType.STONE)

        let fontConfig = {
            fontFamily: 'Arial, serif',
            fontSize: '24px',
            color: '#83BCFF',
        };

        this.scoreMoney = this.add.text(55, 530, '$', fontConfig);
        this.scoreFood = this.add.text(200, 520, '', fontConfig);
        this.scoreWood = this.add.text(300, 520, '', fontConfig);
        this.scoreStone = this.add.text(400, 520, '', fontConfig);

        this.energy = this.add.text(600, 100, `Energy: ${score.energy}/${score.energyMax}`, {
            fontFamily: 'Arial, serif',
            fontSize: '24px',
            color: '#83BCFF',
        });

        eventsCenter.on('UPDATE_SCORE', this.updateScore, this);
    }

    updateScore()
    {
        this.scoreMoney.setText([
            `$ ${score.money}`,
            `Gold: ${score.gold.toFixed(4)}`,
        ]);
        this.scoreFood.text = score.food.toFixed(0);
        this.scoreWood.text = score.wood.toFixed(0);
        this.scoreStone.text = score.stone.toFixed(0);
        this.energy.text = `Energy: ${score.energy}/${score.energyMax} (${score.turn})`;
    }
}