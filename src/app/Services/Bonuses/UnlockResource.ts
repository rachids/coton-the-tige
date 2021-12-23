import fieldState from "~/app/Stores/fields";
import { Bonus } from "./BonusManager";

export default class UnlockResource implements Bonus
{
    fieldId: number;

    constructor(fieldId: number) {
        this.fieldId = fieldId;
    }

    execute(): void {
        fieldState.setUnlockProduction(this.fieldId, true);
    }
}