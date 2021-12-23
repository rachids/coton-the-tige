import ratios from "~/app/Ratios";
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
            throw new Error('Implements ratio for fields');
        }
    }

    remove(value: number): void {
        if (this.fieldId === undefined) {
            playerState.setProductionRatio(
                playerState.productionRatio - value
            );
        } else {
            throw new Error('Implements ratio for fields');
        }
    }
}