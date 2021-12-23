import { playerState } from "~/app/Stores/player";
import AbstractStatManager from "../../AbstractStatManager";

export default class EnergyManager extends AbstractStatManager
{
    min: number = 0;
    max: number = playerState.energyMax;

    add(value: number): void {
        playerState.addCurrentEnergy(this.validateTooMuch(value));
    }

    remove(value: number): void {
        playerState.removeCurrentEnergy(this.validateTooLittle(value));
    }

    hasEnough(value: number): boolean
    {
        return playerState.currentEnergy >= value;
    }
    
}