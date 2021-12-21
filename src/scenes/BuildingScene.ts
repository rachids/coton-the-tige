import Label from "phaser3-rex-plugins/templates/ui/label/Label";
import ButtonAction from "~/app/Services/UI/Button";
import colors from "~/utils/Colors";

export default class BuildingScene extends Phaser.Scene {
    constructor()
    {
        super('building');
    }

    create(data: object)
    {
        let graphics = this.add.graphics();

        graphics.fillStyle(colors.DAZZLED_BLUE);
        graphics.fillRoundedRect(525, 15, 300, 500, 30);

        let close = this.add.image(535, 20, 'closeBtn').setInteractive();

        close.on('pointerdown', () => {
            this.scene.stop();
        });

        this.add.text(300, 300, `Nous sommes sur le terrain: ${data.terrain.position.caseNumber}`);
        let buttons = this.rexUI.add.buttons({
            x: 640, y: 380,
            orientation: 'y',

            buttons: [
                ButtonAction.create(this, 'Retour', () => { this.scene.stop(); }),
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
}