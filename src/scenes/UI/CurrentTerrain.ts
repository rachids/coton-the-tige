import Phaser from "phaser";
import { autorun } from "mobx";
import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import NumberBar from "phaser3-rex-plugins/templates/ui/numberbar/NumberBar";
import fieldManager from "~/app/Services/FieldService";
import ButtonAction from "~/app/Services/UI/Button";
import ProgressBar from "~/app/Services/UI/ProgressBar";
import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";
import { playerState } from "~/app/Stores/player";

export default class CurrentTerrainInfos extends Phaser.Scene {

    currentFieldText!: Phaser.GameObjects.Text;
    discoveryXp!: Phaser.GameObjects.Text;
    productionLabel!: Phaser.GameObjects.Text;
    productionProgressBar!: NumberBar;

    actionButtons;

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
        
        this.currentFieldText = this.add.text(600, 140, 'Current Field', fontConfig);
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
                ButtonAction.create(this, 'Conquest This Land', () => { this.scene.run('building'); }),
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

        autorun(() => {
            let field = fieldManager.getFieldAtPosition(playerState.fieldId);
            this.currentFieldText.text = `Current Field: ${field.id}`;

            if (field.canSeeResource()) {
                this.actionButtons.setVisible(true);

                if (field.canProduce()) {
                    this.productionLabel.setVisible(true);
                    this.productionProgressBar.setVisible(true);
                    this.productionLabel.text = `Production: ${field.currentProductionValue.toFixed(2)}%`
                    this.productionProgressBar.setValue(field.currentProductionValue, 0, 100);
                } else {
                    this.productionLabel.setVisible(false);
                    this.productionProgressBar.setVisible(false);
                }

            } else {
                this.productionLabel.setVisible(false);
                this.productionProgressBar.setVisible(false);
                this.actionButtons.setVisible(false);
            }

            this.discoveryXp.text = `Discovery: ${field.discoveryLevel} (${field.discoveryXp}/${field.discoveryNextLevelXp})`;
        });
    }
}