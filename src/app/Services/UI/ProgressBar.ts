import NumberBar from "phaser3-rex-plugins/templates/ui/numberbar/NumberBar";
import colors from "~/utils/Colors";

type ProgressBarConfig = {
    backgroundColor?: number,
    trackColor?: number,
    barColor?: number,
    width: integer,
    height: integer,
}

const DEFAULT_BG_COLOR = colors.OLD_BURGUNDY;
const DEFAULT_TRACK_COLOR = colors.OLD_BURGUNDY;
const DEFAULT_BAR_COLOR = colors.DAZZLED_BLUE;

export default class ProgressBar
{
    scene: Phaser.Scene;
    x: number;
    y: number;
    width: integer;
    height: integer;
    backgroundColor: number;
    trackColor: number; 
    barColor: number;
    numberBarObject: NumberBar;

    constructor(scene: Phaser.Scene, x: number, y: number, config?: ProgressBarConfig)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = config?.width ?? 100;
        this.height = config?.height ?? 20;
        this.backgroundColor = config?.backgroundColor ?? DEFAULT_BG_COLOR;
        this.barColor = config?.barColor ?? DEFAULT_BAR_COLOR;
        this.trackColor = config?.trackColor ?? DEFAULT_TRACK_COLOR;

        this.numberBarObject = this.instantiateNumberBar();

        this.numberBarObject.layout();

    }

    instantiateNumberBar(): NumberBar
    {
        return this.scene.rexUI.add.numberBar({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,

            background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.backgroundColor),

            slider: {
                track: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.trackColor),
                indicator: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.barColor),
                input: 'none',
            },

            space: {
                left: 2,
                right: 2,
                top: 2,
                bottom: 2,
            },

            valuechangeCallback: function (value, oldValue, numberBar) {
                numberBar.text = Math.round(Phaser.Math.Linear(0, 100, value));
            },
        });
    }
}