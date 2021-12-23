import { playerState } from "~/app/Stores/player";
import { AbstractResourceManager } from "../../AbstractStatManager";

export default class EnergyManager extends AbstractResourceManager
{
    min: number = 0;
    max: number = playerState.energyMax;

    add(value: number): void {
        let result = this.validateTooMuch(value + playerState.currentEnergy);

        playerState.setCurrentEnergy(result);
    }

    remove(value: number): void {
        playerState.removeCurrentEnergy(this.validateTooLittle(value));
    }

    refillOnNewTurn(): void
    {
        let hasTechnologyForTotalRefresh = false;
        // TODO: If technology "Total Refresh", then refresh plenty
        if (hasTechnologyForTotalRefresh) {
            this.add(playerState.energyMax);
        } else {
            this.add(1);
        }
    }

    hasEnough(value: number): boolean
    {
        return playerState.currentEnergy >= value;
    }
    
}