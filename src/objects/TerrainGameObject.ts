import fieldManager from "~/app/Services/FieldService";
import { ResourceType } from "~/game";
import colors from "~/utils/Colors";
import Fonts from "~/utils/Fonts";

export default class TerrainGameObject extends Phaser.GameObjects.Image
{
    labelConquestLevel: Phaser.GameObjects.Text;
    resourceImage: Phaser.GameObjects.Image;
    fieldId: number;

    constructor(scene: Phaser.Scene, fieldId: number)
    {
        let field = fieldManager.getFieldAtPosition(fieldId);
        let { x, y } = field.position;
        
        super(scene, x, y, 'terrain');
        
        this.fieldId = fieldId;

        this.labelConquestLevel = scene.add.text(x, y, '0', {
            color: colors.convertColorToString(colors.CARRIBEAN_GREEN),
            align: 'center',
            backgroundColor: '#000',
            padding: { left: 2, right: 2, top: 1, bottom: 1 },
            fontSize: '16px',
            fontFamily: Fonts.forStats,
        }).setDepth(10);

        this.resourceImage = scene.add.image(x + 47, y + 47, ResourceType[field.type]).setScale(0.3).setDepth(10);
    }

    updateInfos()
    {
        let field = fieldManager.getFieldAtPosition(this.fieldId);

        this.labelConquestLevel.setText(field.conquestLevel.getLevelLabel());
    }
}