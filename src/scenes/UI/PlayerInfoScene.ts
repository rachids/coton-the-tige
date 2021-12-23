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
        this.add.nineslice(600, 20, 190, 100, 'grayPanel', 16);

        this.add.image(616, 80, 'work-ratio').setOrigin(0, 0).setScale(0.5);
        this.add.image(670, 80, 'discovery-ratio').setOrigin(0, 0).setScale(0.5);

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

        let fontConfigForRatios: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: Fonts.forStats,
            fontSize: '14px',
            color: colors.convertColorToString(colors.DAZZLED_BLUE),
            padding: {
                x: 10,
            }
        };

        let playerWorkRatioLabel = this.add.text(623, 85, '', fontConfigForRatios);
        let playerDiscoveryRatioLabel = this.add.text(677, 85, '1.00', fontConfigForRatios);

        autorun(() => {
            turnLabel.text = `Turn: ${scoreState.turn}`;
            energyLabel.text = `Energy: ${playerState.currentEnergy}/${playerState.energyMax}`;
            playerWorkRatioLabel.text = `${playerState.productionRatio.toFixed(2)}`;
            playerDiscoveryRatioLabel.text = `${playerState.discoveryRatio.toFixed(2)}`;
        });
    }
}