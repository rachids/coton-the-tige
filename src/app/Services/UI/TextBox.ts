import colors from "~/utils/Colors";
import { getBBCodeText } from "~/utils/utils";

export const createTextBox = (scene: Phaser.Scene, x: number, y: number, maxLines: number, config) {
    let wrapWidth: number = config.wrapWidth ?? 0;
    let fixedWidth: number = config.fixedWidth ?? 0;
    let fixedHeight: number = config.fixedHeight ?? 0;

    let textBox = scene.rexUI.add.textBox({
        x: x,
        y: y,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, colors.OLD_BURGUNDY)
            .setStrokeStyle(2, colors.CARRIBEAN_GREEN),
        
        text: getBBCodeText(scene, {
            wrapWidth: wrapWidth,
            fixedHeight: fixedHeight,
            fixedWidth: fixedWidth,
            maxLines: maxLines ?? 3,
        }),

        action: scene.add.image(0, 0, 'nextPage').setTint(colors.LAVENDER_GRAY).setVisible(false),

        space: {
            left: 20,
            right: 20,
            top: 20,
            icon: 5,
            text: 10,
        }
    })
        .setOrigin(0)
        .layout();

    textBox.setInteractive()
        .on('pointerdown', function() {
            let icon = this.getElement('action').setVisible(false);

            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            let icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;

            let tween = scene.tweens.add({
                targets: icon,
                y: '+=30',
                ease: 'Bounce',
                duration: 500,
                repeat: -1,
                yoyo: true,
            });
        }, textBox);

        return textBox;
}
