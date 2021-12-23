import fieldState from "~/app/Stores/fields";
import colors from "~/utils/Colors";
import { Fonts } from "~/utils/Fonts";

export default class TerrainGameObject extends Phaser.GameObjects.Image
{
    labelConquestLevel: Phaser.GameObjects.Text;
    testRatio: Phaser.GameObjects.Text;
    resourceImage: Phaser.GameObjects.Image;
    fieldId: number;

    constructor(scene: Phaser.Scene, fieldId: number)
    {
        let field = fieldState.getFieldById(fieldId);
        let { x, y } = field.position;
        
        super(scene, x, y, 'terrain-zero');
        
        this.fieldId = fieldId;

        this.labelConquestLevel = scene.add.text(x, y, '0', {
            color: colors.convertColorToString(colors.CARRIBEAN_GREEN),
            align: 'center',
            backgroundColor: '#000',
            padding: { left: 2, right: 2, top: 1, bottom: 1 },
            fontSize: '16px',
            fontFamily: Fonts.forStats,
        }).setDepth(10);

        this.resourceImage = scene.add.image(x + 47, y + 47, field.type)
            .setScale(0.5)
            .setDepth(5)
            .setVisible(false)
            .setPipeline('Light2D')
            .setAlpha(0.8);

        this.testRatio = scene.add.text(546, 310, 'Production Ratio:');
    }

    updateInfos()
    {
        let field = fieldState.getFieldById(this.fieldId);

        let TEST_FIELD_RATIO = fieldState.getFieldById(5);

        this.testRatio.setText([
            `Production Ratio: x${TEST_FIELD_RATIO.resourceRatio}`,
            `Discovery Ratio: x${TEST_FIELD_RATIO.discoveryRatio}`,
        ]);

        this.labelConquestLevel.setText(field.conquestLevel.getLevelLabel());

        if (field.canSeeResource()) {
            this.resourceImage.setVisible(true);
        }

        switch (field.conquestLevel.level) {
            case 0:
                this.setTexture('terrain-zero');
                break;

            case 1:
                this.setTexture('terrain-zero');
                break;

            case 2:
                this.setTexture('terrain-one');
                break;

            case 3:
                this.setTexture('terrain-two');
                break;

            case 4:
                this.setTexture('terrain-three');
                break;

            case 5:
                this.setTexture('terrain-four');
                break;
        
            default:
                this.setTexture('terrain-zero');
                break;
        }
    }
}