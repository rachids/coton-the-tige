import { scoreState } from "~/app/Stores/score";
import { AbstractResourceManager } from "../../AbstractStatManager";

export default class WoodManager extends AbstractResourceManager
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
