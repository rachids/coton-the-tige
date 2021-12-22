import { scoreState } from "~/app/Stores/score";
import AbstractStatManager from "../../AbstractStatManager";

export default class FoodManager extends AbstractStatManager
{
    add(value: number): void {
        let result: number = scoreState.food + this.validateTooMuch(value);
        scoreState.setFood(result);
    }

    remove(value: number): void {
        let result: number = scoreState.food - this.validateTooLittle(value);
        scoreState.setFood(result);
    }
}