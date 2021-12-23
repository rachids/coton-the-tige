import fieldState from "~/app/Stores/fields";
import { ResourceType } from "~/game";
import { AbstractResourceManager } from "../../AbstractStatManager";
import { getResourceManager } from "../../Resources/utils";
import { Cost } from "../BonusManager";

export default class ResourceCost implements Cost
{
    manager: AbstractResourceManager;
    amount: number;
    resource: ResourceType

    constructor(amount: number, fieldId: number)
    {
        let field = fieldState.getFieldById(fieldId);

        this.amount = amount;
        this.resource = field.type;
        this.manager = this.determineManager();
    }

    hasEnough(): boolean 
    {
        return this.manager.hasEnough(this.amount);
    }
    
    showLabel(): string 
    {
        return `${this.amount} ${this.resource}`;
    }
    
    execute(): void 
    {
        this.manager.remove(this.amount);
    }

    determineManager(): AbstractResourceManager
    {
        return getResourceManager(this.resource);   
    }
    
}