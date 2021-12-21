import Phaser from "phaser";
import BadgeLabel from "phaser3-rex-plugins/templates/ui/badgelabel/BadgeLabel";
import score from "~/app/Stores";
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
    }

    update()
    {
        this.scoreFood.getElement('centerBottom').setText(score.food.toFixed(0));
        this.scoreFood.layout();
        
        this.scoreWood.getElement('centerBottom').setText(score.wood.toFixed(0));
        this.scoreWood.layout();
        
        this.scoreStone.getElement('centerBottom').setText(score.stone.toFixed(0));
        this.scoreStone.layout();
        
        this.scoreGold.getElement('centerBottom').setText(score.gold.toFixed(1));
        this.scoreGold.layout();

        //this.energy.text = `Energy: ${score.energy}/${score.energyMax} (${score.turn})`;
    }
}