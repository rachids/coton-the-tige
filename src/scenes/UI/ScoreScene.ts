import Phaser from "phaser";
import { autorun } from "mobx";
import { scoreState } from "~/app/Stores/score";
import { ResourceType } from "~/game";
import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";
export default class ScoreScene extends Phaser.Scene
{
    scoreFood: BadgeLabel;
    scoreWood: BadgeLabel;
    scoreStone: BadgeLabel;
    scoreGold: BadgeLabel;
    energy: Phaser.GameObjects.Text;

    constructor()
    {
        super('score-scene');
    }

    create()
    {
        let fontConfig = {
            color: colors.convertColorToString(colors.OLD_BURGUNDY),
            align: 'center',
            backgroundColor: colors.convertColorToString(colors.LAVENDER_GRAY),
            padding: { left: 2, right: 2, top: 1, bottom: 1 },
            fontSize: '16px',
            fontFamily: Fonts.forStats,
        };

        this.scoreFood = this.rexUI.add.badgeLabel({
            x: 160,
            y: 150,
            width: 48,
            height: 48,
            background: this.add.image(0, 0, ResourceType.FOOD),
            centerBottom: this.add.text(0, 0, '', fontConfig),
        }).layout()

        this.scoreWood = this.rexUI.add.badgeLabel({
            x: 210,
            y: 150,
            width: 48,
            height: 48,
            background: this.add.image(0, 0, ResourceType.WOOD),
            centerBottom: this.add.text(0, 0, '', fontConfig),
        }).layout();

        this.scoreStone = this.rexUI.add.badgeLabel({
            x: 260,
            y: 150,
            width: 48,
            height: 48,
            background: this.add.image(0, 0, ResourceType.STONE),
            centerBottom: this.add.text(0, 0, '', fontConfig),
        }).layout();

        this.scoreGold = this.rexUI.add.badgeLabel({
            x: 310,
            y: 150,
            width: 48,
            height: 48,
            background: this.add.image(0, 0, ResourceType.GOLD),
            centerBottom: this.add.text(0, 0, '', fontConfig),
        }).layout();

        /*this.energy = this.add.text(600, 100, `Energy: ${score.energy}/${score.energyMax}`, {
            fontFamily: 'Arial, serif',
            fontSize: '24px',
            color: '#83BCFF',
        });*/

        autorun(() => {
            this.scoreFood.getElement('centerBottom').text = `${scoreState.food}`;
            this.scoreWood.getElement('centerBottom').text = `${scoreState.wood}`;
            this.scoreStone.getElement('centerBottom').text = `${scoreState.stone}`;
            this.scoreGold.getElement('centerBottom').text = `${scoreState.gold.toFixed(2)}`;
        });
    }
}