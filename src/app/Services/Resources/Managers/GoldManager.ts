import { scoreState } from "~/app/Stores/score";
import AbstractStatManager from "../../AbstractStatManager";

export default class GoldManager extends AbstractStatManager
{
    add(value: number): void {
        scoreState.gold += this.validateTooMuch(value);
    }
    remove(value: number): void {
        scoreState.gold -= this.validateTooLittle(value);
    }
    
}