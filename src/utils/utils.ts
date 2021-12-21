import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";
import Fonts from "./Fonts";

export const randomEnumKey = <T>(enumeration: T): keyof T  => {
    const keys = Object.keys(enumeration).filter(
        k => !(Math.abs(Number.parseInt(k)) + 1)
    );
    const enumKey = keys[Math.floor(Math.random() * keys.length)];
    return enumKey;
};

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
