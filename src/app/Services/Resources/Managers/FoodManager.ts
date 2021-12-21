import score from "~/app/Stores";
import AbstractResourceManager from "../AbstractResourceManager";

export default class FoodManager extends AbstractResourceManager
{
    add(value: number): void {
        score.food += this.validateTooMuch(value);
    }

    remove(value: number): void {
        score.food -= this.validateTooLittle(value);
    }
}