import score from "~/app/Stores";
import AbstractStatManager from "../../AbstractStatManager";

export default class FoodManager extends AbstractStatManager
{
    add(value: number): void {
        score.food += this.validateTooMuch(value);
    }

    remove(value: number): void {
        score.food -= this.validateTooLittle(value);
    }
}