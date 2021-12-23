import Terrain from "~/app/Models/Terrain";
import fieldState from "~/app/Stores/fields";

export interface Bonus {
    execute(): void;
}

export interface Cost extends Bonus {
    hasEnough(): boolean;
    showLabel(): string;
}

export abstract class AbstractBonusForField implements Bonus
{
    fieldId: number;

    constructor(fieldId: number)
    {
        this.fieldId = fieldId;
    }

    abstract execute(): void;

    getField(): Terrain
    {
        return fieldState.getFieldById(this.fieldId);
    }
}