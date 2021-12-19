import Phaser from "phaser";
import eventsCenter from "~/app/EventsCenter";
import score from "~/app/Stores";

export default class ScoreScene extends Phaser.Scene
{
    label: Phaser.GameObjects.Text;

    constructor()
    {
        super('score-scene');
    }

    create()
    {
        this.label = this.add.text(40, 520, '', {
            fontFamily: 'Arial, serif',
            fontSize: '24px',
            color: '#83BCFF',
        });
        this.label.setText('Food: 0 - Wood: 0 - Stone: 0');

        eventsCenter.on('UPDATE_SCORE', this.updateScore, this);
    }

    updateScore()
    {
        this.label.setText(
            `Food: ${score.food} - Wood: ${score.wood} - Stone: ${score.stone}`
        );
    }
}