import Button from "phaser3-rex-plugins/plugins/button";
import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";

const ButtonAction = {
    
    create(scene: Phaser.Scene, text: string, callback = () => {}): Button {
        let button = scene.rexUI.add.label({
            width: 190,
            height: 49,
            background: scene.add.image(0, 0, 'buttonNormal'),
            text: scene.add.text(0, 0, text, {
                fontFamily: 'Yanone, Calibri, Verdana, sans-serif',
                fontSize: '18px',
                color: colors.convertColorToString(colors.OLD_BURGUNDY),
                align: 'center',
            }),
            space: {
                left: 10,
                right: 10,
            },
        });

        button.execute = callback;

        return button;
}}

export default ButtonAction;