import fieldState from "../Stores/fields";
import { Policy } from "./Policy";

export default class DiscoveryLevelPolicy implements Policy
{
    fieldId: number;
    minLevel: number;

    constructor(fieldId: number, minLevel: number = 1)
    {
        this.fieldId = fieldId;
        this.minLevel = minLevel;
    }

    pass(): boolean 
    {
        let field = fieldState.getFieldById(this.fieldId);
        
        return field.discoveryLevel >= this.minLevel;
    }

    showLabel(): string {
        return `Min. Discovery lvl. ${this.minLevel}`;
    }
}