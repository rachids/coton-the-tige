import { scoreState } from "~/app/Stores/score";
import { AbstractResourceManager } from "../../AbstractStatManager";

export default class WoodManager extends AbstractResourceManager
{
    add(value: number): void 
    {
        let result = this.validateTooMuch(scoreState.wood + value);
        scoreState.setWood(result);
    }
    
    remove(value: number): void 
    {
        let result = this.validateTooLittle(scoreState.wood - value);
        scoreState.setWood(result);
    }

    hasEnough(value: number): boolean 
    {
        return scoreState.wood >= value;
    }    
}
