import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import Conquest from "~/app/Models/Conquests/Conquest";
import Terrain from "~/app/Models/Terrain";
import fieldManager from "~/app/Services/FieldService";
import playerManager from "~/app/Services/PlayerService";
import ButtonAction from "~/app/Services/UI/Button";
import { createTextBox } from "~/app/Services/UI/TextBox";
import CotonTextStyle from "~/config/textstyle";
import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";

export default class ConquestScene extends Phaser.Scene {
    constructor()
    {
        super('building');
    }

    create()
    {
        let field: Terrain = fieldManager.getFieldAtPosition(playerManager.player.getFieldId());

        let graphics = this.add.graphics();

        graphics.fillStyle(colors.DAZZLED_BLUE);
        graphics.fillRoundedRect(525, 15, 300, 500, 30);

        let close = this.add.image(535, 20, 'closeBtn').setInteractive();

        close.on('pointerdown', () => {
            this.scene.stop();
        });

        this.add.text(600, 40, `Conquest: ${field.conquestLevel.name}`, CotonTextStyle);

        createTextBox(this, 535, 70, 5, {
            wrapWidth: 140,
            fixedWidth: 140,
            fixedHeight: 80,
        }).start(field.conquestLevel.description, 50);

        // Show Bonuses
        this.rexUI.add.BBCodeText(535, 200, `[size=18][b]Bonuses:[/b][/size]`, {
            fontFamily: Fonts.forLabel,
            wrap: {
                mode: 'word',
                width: 220,
            },
        });

        let bonuses = field.conquestLevel.bonusesDescription.join('\n');
        this.rexUI.add.BBCodeText(535, 225, bonuses, {
            fontSize: '14px',
            fontFamily: Fonts.forFunkiness,
            wrap: {
                mode: 'word',
                width: 220,
            },
        });

        this.rexUI.add.BBCodeText(535, 325, `[size=18][b]Cost:[/b][/size]`, {
            fontFamily: Fonts.forLabel,
            wrap: {
                mode: 'word',
                width: 220,
            },
        });

        let costs = field.conquestLevel.costsDescription.join('\n');
        this.rexUI.add.BBCodeText(535, 345, costs, {
            fontSize: '14px',
            fontFamily: Fonts.forFunkiness,
            wrap: {
                mode: 'word',
                width: 220,
            },
        });

        let buttons = this.rexUI.add.buttons({
            x: 640, y: 450,
            orientation: 'y',

            buttons: [
                ButtonAction.create(this, 'Conquest!', () => this.onConquest(field.conquestLevel)),
            ],

            click: {
                mode: 'pointerup',
                clickInterval: 100
            },

            space: { item: 8 }

        }).layout();

        buttons.on('button.click', (button: Label, index, pointer, event) => {
            button.execute();
        });
    }

    onConquest(level: Conquest)
    {
        level.onBuild();
        this.scene.run('current-terrain-infos', { fieldId: playerManager.player.getFieldId() });
        this.scene.stop();
    }
}