import Phaser from "phaser";
import NumberBar from "phaser3-rex-plugins/templates/ui/numberbar/NumberBar";
import eventsCenter from "~/app/EventsCenter";
import Terrain from "~/app/Models/Terrain";
import ProgressBar from "~/app/Services/UI/ProgressBar";
import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";

export default class CurrentTerrainInfos extends Phaser.Scene {

    currentTerrain: Terrain;
    discoveryXp: Phaser.GameObjects.Text;
    productionLabel: Phaser.GameObjects.Text;
    productionProgressBar: NumberBar;

    constructor() {
        super('current-terrain-infos');
    }

    create()
    {
        let panel = this.add.graphics();

        panel.fillStyle(colors.CARRIBEAN_GREEN, 0.75);
        panel.fillRoundedRect(530, 140, 260, 368, 15);
        
        let fontConfig = {
            fontFamily: Fonts.forLabel,
            fontSize: '24px',
            color: '#191919',
        };

        let fontDetailsConfig = {
            fontFamily: Fonts.forLabel,
            fontSize: '18px',
            color: '#191919',
        };
        
        this.add.text(600, 140, 'Current Field', fontConfig);
        this.discoveryXp = this.add.text(535, 200, 'Discovery: 1 (0/0)', fontDetailsConfig);

        const progressBarConfig = {
            height: 24,
            width: 246,
        };

        this.productionLabel = this.add.text(535, 220, 'Production:', fontDetailsConfig);

        this.productionProgressBar = new ProgressBar(this, 662, 260, progressBarConfig).numberBarObject.layout();

        eventsCenter.on('PLAYER_SWITCHED_TERRAIN', this.updateTerrain, this);
    }

    refreshInfos()
    {
        if (this.currentTerrain.discoveryLevel > 0) {
            this.productionLabel.setVisible(true);
            this.productionProgressBar.setVisible(true);
        } else {
            this.productionLabel.setVisible(false);
            this.productionProgressBar.setVisible(false);
        }

        this.discoveryXp.text = `Discovery: ${this.currentTerrain.discoveryLevel} (${this.currentTerrain.discoveryXp}/${this.currentTerrain.discoveryNextLevelXp})`;
        this.productionLabel.text = `Production: ${this.currentTerrain.currentProductionValue.toFixed(2)}%`
        this.productionProgressBar.setValue(this.currentTerrain.currentProductionValue, 0, 100);
    }

    updateTerrain(terrain: Terrain)
    {
        this.currentTerrain = terrain;
        this.refreshInfos();
    }
}