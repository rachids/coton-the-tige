import { scoreState } from "~/app/Stores/score"
import { AbstractResourceManager } from "../../AbstractStatManager";

export default class StoneManager extends AbstractResourceManager
{
    add(value: number): void 
    {
        let result = scoreState.stone + this.validateTooMuch(value);
        scoreState.setStone(result);
    }

    remove(value: number): void 
    {
        let result = scoreState.stone - this.validateTooLittle(value);
        scoreState.setStone(result);
    }

    hasEnough(value: number): boolean 
    {
        return scoreState.stone <= value;
    }
}