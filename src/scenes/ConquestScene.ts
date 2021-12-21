import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import Conquest from "~/app/Models/Conquests/Conquest";
import Terrain from "~/app/Models/Terrain";
import ButtonAction from "~/app/Services/UI/Button";
import CotonTextStyle from "~/config/textstyle";
import colors from "~/utils/Colors";

export default class ConquestScene extends Phaser.Scene {
    field: Terrain;

    constructor()
    {
        super('building');
    }

    create(data: { terrain: Terrain })
    {
        let field: Terrain = data.terrain;

        let graphics = this.add.graphics();

        graphics.fillStyle(colors.DAZZLED_BLUE);
        graphics.fillRoundedRect(525, 15, 300, 500, 30);

        let close = this.add.image(535, 20, 'closeBtn').setInteractive();

        close.on('pointerdown', () => {
            this.scene.stop();
        });

        this.add.text(640, 40, `Conquest: ${field.conquestLevel.name}`, CotonTextStyle);

        let levelDescription = this.add.text(535, 70, '', CotonTextStyle);

        levelDescription.setText([
            field.conquestLevel.name,
            field.conquestLevel.description,
        ]);

        let buttons = this.rexUI.add.buttons({
            x: 640, y: 380,
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
        console.log('LEVLED UP');
        level.onBuild();
    }
}