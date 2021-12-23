import { autorun } from "mobx";
import { playerState } from "~/app/Stores/player";
import { scoreState } from "~/app/Stores/score";
import colors from "~/utils/Colors";
import { CotonTextStyle, Fonts } from "~/utils/Fonts";

export default class PlayerInfoScene extends Phaser.Scene
{
    constructor()
    {
        super('player-info');
    }

    create()
    {
        let bgPanel = this.add.nineslice(600, 20, 190, 100, 'grayPanel', 16);

        let fontConfig: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: Fonts.forLabel,
            fontSize: '20px',
            color: colors.convertColorToString(colors.OLD_BURGUNDY),
            padding: {
                top: 5,
                left: 15,
            }
        }

        let turnLabel = this.add.text(601, 20, 'Turn:', fontConfig);
        let energyLabel = this.add.text(601, 35, 'Energy:', fontConfig);

        autorun(() => {
            turnLabel.text = `Turn: ${scoreState.turn}`;
            energyLabel.text = `Energy: ${playerState.currentEnergy}/${playerState.energyMax}`;
        });
    }
}