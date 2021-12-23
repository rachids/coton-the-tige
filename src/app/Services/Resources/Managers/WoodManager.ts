import { scoreState } from "~/app/Stores/score";
import AbstractStatManager from "../../AbstractStatManager";

export default class WoodManager extends AbstractStatManager
{
    add(value: number): void 
    {
        let result = scoreState.wood + this.validateTooMuch(value);
        scoreState.setWood(result);
    }
    
    remove(value: number): void 
    {
        let result = scoreState.wood - this.validateTooLittle(value);
        scoreState.setWood(result);
    }

    hasEnough(value: number): boolean 
    {
        return scoreState.wood <= value;
    }    
}
