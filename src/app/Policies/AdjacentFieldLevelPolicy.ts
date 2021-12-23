import fieldState from "../Stores/fields";
import { Policy } from "./Policy";

export default class AdjacentFieldLevelPolicy implements Policy
{
    fieldId: number;
    minLevel: number;

    constructor(fieldId: number, minLevel: number)
    {
        this.fieldId = fieldId;
        this.minLevel = minLevel;
    }

    pass(): boolean 
    {
        let adjacentFields = fieldState.getAdjacentFieldById(this.fieldId);

        return adjacentFields.every(field => field.conquestLevel.level >= this.minLevel);
    }
    
    showLabel(): string 
    {
        return `Adjacent fields must be at least lvl ${this.minLevel}`;
    }
    
}