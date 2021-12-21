import score from "~/app/Stores"
import AbstractStatManager from "../../AbstractStatManager";

export default class StoneManager extends AbstractStatManager
{
    add(value: number): void {
        score.stone += this.validateTooMuch(value);
    }

    remove(value: number): void {
        score.stone -= this.validateTooLittle(value);
    }
}