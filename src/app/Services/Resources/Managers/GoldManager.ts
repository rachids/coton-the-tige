import score from "~/app/Stores";
import AbstractStatManager from "../../AbstractStatManager";

export default class GoldManager extends AbstractStatManager
{
    add(value: number): void {
        score.gold += this.validateTooMuch(value);
    }
    remove(value: number): void {
        score.gold -= this.validateTooLittle(value);
    }
    
}