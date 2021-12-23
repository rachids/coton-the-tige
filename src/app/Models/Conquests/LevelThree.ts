import { Policy } from "~/app/Policies/Policy";
import { Bonus, Cost } from "~/app/Services/Bonuses/BonusManager";
import EnergyCost from "~/app/Services/Bonuses/Costs/EnergyCost";
import ResourceCost from "~/app/Services/Bonuses/Costs/ResourceCost";
import ProductionBonus from "~/app/Services/Bonuses/ProductionBonus";
import Conquest from "./Conquest";

export default class LevelThree extends Conquest
{
    name: string = 'Bunflix and Chill';
    level: number = 3;
    texture: string = 'terrain-two';
    description: string = 'What if I meet that special one? I must work harder to make this field more welcoming. Oh and that tree is going down.';
    bonusesDescription: string[] = [
        '- Mega production bonus for the current field',
        '- Increase production in adjacent fields',
    ];
    bonuses: Bonus[] = [
        new ProductionBonus(2.3, this.fieldId),
        // Todo: Bonus for adjacent tiles
    ];
    costs: Cost[] = [
        new EnergyCost(3), // TODO: make it 4 or even 5, when the shop is available
        new ResourceCost(2, this.fieldId),
    ];
    requirements: Policy[] = [
        // Todo: Adjacent tile must be at least level 1.
    ];


    getNextLevel(): Conquest {
        throw new Error("Method not implemented.");
    }
}