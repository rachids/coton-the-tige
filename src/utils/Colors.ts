const colors = {
    DAZZLED_BLUE: 0x345995,
    OLD_BURGUNDY: 0x2C1A1D,
    CARRIBEAN_GREEN: 0x03CEA4,
    TART_ORANGE: 0xFB4D3D,
    LAVENDER_GRAY: 0xCAC4CE,

    convertColorToString(value: number): string {
        let rgb = Phaser.Display.Color.IntegerToRGB(value);

        return Phaser.Display.Color.RGBToString(rgb.r, rgb.g, rgb.b, rgb.a);
    }
};

export default colors;