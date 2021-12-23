import fieldState from "~/app/Stores/fields";
import { AbstractResourceManager } from "../AbstractStatManager";
import { getResourceManager } from "../Resources/utils";
import { Bonus } from "./BonusManager";

export default class FreeResourceBonus implements Bonus
{
    manager: AbstractResourceManager
    amount: number;

    constructor(amount: number, fieldId: number)
    {
        let field = fieldState.getFieldById(fieldId);

        this.amount = amount;
        this.manager = getResourceManager(field.type);
    }

    execute(): void {
        this.manager.add(this.amount);
    }
}