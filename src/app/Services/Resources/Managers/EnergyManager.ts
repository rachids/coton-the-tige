import score from "~/app/Stores";
import AbstractStatManager from "../../AbstractStatManager";

export default class EnergyManager extends AbstractStatManager
{
    min: number = 0;
    max: number = score.energyMax;

    add(value: number): void {
        score.energy += this.validateTooMuch(value);
    }

    remove(value: number): void {
        score.energy -= this.validateTooLittle(value);
    }
    
}