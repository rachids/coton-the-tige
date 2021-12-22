import Terrain from "~/app/Models/Terrain";
import { CasePosition } from "~/app/Models/CasePosition";

class FieldService
{
    fields: Terrain[];

    constructor()
    {
        this.fields = [];
    }

    generateFields()
    {
        for (let i = 0; i < 16; i++) {
            this.fields.push(
                new Terrain(CasePosition[i])
            )
        }
    }

    getFieldAtPosition(position: number): Terrain
    {
        return this.fields[position - 1];
    }
}

const fieldManager = new FieldService();

export default fieldManager;