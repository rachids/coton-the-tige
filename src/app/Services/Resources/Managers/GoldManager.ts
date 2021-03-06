import { scoreState } from "~/app/Stores/score";
import { AbstractResourceManager } from "../../AbstractStatManager";

export default class GoldManager extends AbstractResourceManager
{
    add(value: number): void 
    {
        scoreState.gold += this.validateTooMuch(value);
    }

    remove(value: number): void 
    {
        scoreState.gold -= this.validateTooLittle(value);
    }
    
    hasEnough(value: number): boolean 
    {
        return scoreState.gold <= value;    
    }
}