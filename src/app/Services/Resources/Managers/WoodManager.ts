import score from "~/app/Stores";
import AbstractStatManager from "../../AbstractStatManager";

export default class WoodManager extends AbstractStatManager
{
    add(value: number): void {
        score.wood += this.validateTooMuch(value);
    }
    remove(value: number): void {
        score.wood -= this.validateTooLittle(value);
    }
    
}