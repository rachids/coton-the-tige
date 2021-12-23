import fieldState from "~/app/Stores/fields";
import { playerState } from "~/app/Stores/player";
import AbstractRatioManager from "./AbstractRatioManager";

export default class ProductionManager extends AbstractRatioManager
{
    add(value: number): void {
        if (this.fieldId === undefined) {
            playerState.setProductionRatio(
                playerState.productionRatio + value
            );
        } else {
            fieldState.addProductionRatio(this.fieldId, value);
        }
    }

    remove(value: number): void {
        if (this.fieldId === undefined) {
            playerState.setProductionRatio(
                playerState.productionRatio - value
            );
        } else {
            throw new Error('Implements removal of production ratio for fields');
        }
    }
}