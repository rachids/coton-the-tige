import score from "~/app/Stores";
import AbstractManager from "../AbstractManager";

export default class FoodManager extends AbstractManager
{
    add(value: number): void {
        score.food += this.validateTooMuch(value);
    }

    remove(value: number): void {
        score.food -= this.validateTooLittle(value);
    }
}