import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";

const CotonTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: Fonts.forLabel,
    fontSize: '16px',
    color: colors.convertColorToString(colors.LAVENDER_GRAY),
}

export default CotonTextStyle;