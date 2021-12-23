import { scoreState } from "~/app/Stores/score"
import { AbstractResourceManager } from "../../AbstractStatManager";

export default class StoneManager extends AbstractResourceManager
{
    add(value: number): void 
    {
        let result = this.validateTooMuch(scoreState.stone + value);
        scoreState.setStone(result);
    }

    remove(value: number): void 
    {
        let result = this.validateTooLittle(scoreState.stone - value);
        scoreState.setStone(result);
    }

    hasEnough(value: number): boolean 
    {
        return scoreState.stone >= value;
    }
}