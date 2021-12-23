import { Fonts } from "./Fonts";

type BBCodeConfig = {
    wrapWidth: number;
    fixedWidth: number;
    fixedHeight: number;
    maxLines: number;
}

export const getBBCodeText = (scene: Phaser.Scene, config: BBCodeConfig) => {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: config.fixedWidth,
        fixedHeight: config.fixedHeight,
        fontSize: '14px',
        fontFamily: Fonts.forLabel,
        wrap: {
            mode: 'word',
            width: config.wrapWidth,
        },

        maxLines: config.maxLines,
    });
}
