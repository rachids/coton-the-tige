import { scoreState } from "~/app/Stores/score"
import AbstractStatManager from "../../AbstractStatManager";

export default class StoneManager extends AbstractStatManager
{
    add(value: number): void {
        let result = scoreState.stone + this.validateTooMuch(value);
        scoreState.setStone(result);
    }

    remove(value: number): void {
        let result = scoreState.stone - this.validateTooLittle(value);
        scoreState.setStone(result);
    }
}