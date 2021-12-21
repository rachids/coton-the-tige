import Phaser from "phaser";
import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import NumberBar from "phaser3-rex-plugins/templates/ui/numberbar/NumberBar";
import eventsCenter from "~/app/EventsCenter";
import Terrain from "~/app/Models/Terrain";
import ButtonAction from "~/app/Services/UI/Button";
import ProgressBar from "~/app/Services/UI/ProgressBar";
import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";

export default class CurrentTerrainInfos extends Phaser.Scene {

    currentTerrain: Terrain;
    discoveryXp: Phaser.GameObjects.Text;
    productionLabel: Phaser.GameObjects.Text;
    productionProgressBar: NumberBar;

    actionButtons;

    constructor() {
        super('current-terrain-infos');
    }

    create(data: object)
    {
        this.currentTerrain = data.terrain;

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
        this.discoveryXp = this.add.text(535, 200, 'Discovery: 0 (0/0)', fontDetailsConfig);

        const progressBarConfig = {
            height: 24,
            width: 246,
        };

        this.productionLabel = this.add.text(535, 220, 'Production:', fontDetailsConfig).setVisible(false);

        this.productionProgressBar = new ProgressBar(this, 662, 260, progressBarConfig).numberBarObject.layout().setVisible(false);

        this.actionButtons = this.rexUI.add.buttons({
            x: 640, y: 380,
            orientation: 'y',

            buttons: [
                ButtonAction.create(this, 'Conquest This Land', () => { this.scene.run('building', { terrain: this.currentTerrain }); }),
            ],

            click: {
                mode: 'pointerup',
                clickInterval: 100
            },

            space: { item: 8 }

        }).layout();

        this.actionButtons.setVisible(false);

        this.actionButtons.on('button.click', (button: Label, index, pointer, event) => {
            this.scene.sendToBack(this);
            this.scene.sendToBack('score-scene');
            this.scene.sendToBack('hello-world');
            button.execute();
        });

        eventsCenter.on('PLAYER_SWITCHED_TERRAIN', this.updateTerrain, this);
    }

    update(): void {
        if (this.currentTerrain != undefined) {
            this.refreshInfos();
        }
    }

    refreshInfos()
    {
        if (this.currentTerrain.canSeeResource()) {
            this.actionButtons.setVisible(true);

            if (this.currentTerrain.canProduce()) {
                this.productionLabel.setVisible(true);
                this.productionProgressBar.setVisible(true);
                this.productionLabel.text = `Production: ${this.currentTerrain.currentProductionValue.toFixed(2)}%`
                this.productionProgressBar.setValue(this.currentTerrain.currentProductionValue, 0, 100);
            }
            
        } else {
            this.productionLabel.setVisible(false);
            this.productionProgressBar.setVisible(false);
            this.actionButtons.setVisible(false);
        }

        this.discoveryXp.text = `Discovery: ${this.currentTerrain.discoveryLevel} (${this.currentTerrain.discoveryXp}/${this.currentTerrain.discoveryNextLevelXp})`;
    }

    updateTerrain(terrain: Terrain)
    {
        this.currentTerrain = terrain;
        this.refreshInfos();
    }
}