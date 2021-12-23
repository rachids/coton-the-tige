import colors from "./Colors";

export const Fonts = {
    forStats: 'Roboto, Times New Roman, Console, serif',
    forLabel: 'Yanone, Calibri, Verdana, sans-serif',
    forFunkiness: 'ComingSoon, Verdana, Arial, serif',
};

export const CotonTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: Fonts.forLabel,
    fontSize: '16px',
    color: colors.convertColorToString(colors.LAVENDER_GRAY),
}
