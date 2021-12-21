import Terrain from "~/app/Models/Terrain";
import CasePosition from "~/app/Models/CasePosition";

class FieldService
{
    scene: Phaser.Scene;
    fields: Terrain[];

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.fields = [];
    }

    generateFields()
    {
        for (let i = 0; i < 16; i++) {
            this.fields.push(
                new Terrain(this.scene, CasePosition[i])
            )
        }
    }

    getFieldAtPosition(position: number): Terrain
    {
        return this.fields[position - 1];
    }
}

const fieldManager = new FieldService();