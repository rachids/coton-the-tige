import { Bonus, Cost } from "~/app/Services/Bonuses/BonusManager";
import EnergyCost from "~/app/Services/Bonuses/Costs/EnergyCost";
import ResourceCost from "~/app/Services/Bonuses/Costs/ResourceCost";
import DiscoveryBonus from "~/app/Services/Bonuses/DiscoveryBonus";
import ProductionBonus from "~/app/Services/Bonuses/ProductionBonus";
import Conquest from "./Conquest";
import LevelThree from "./LevelThree";

export default class LevelTwo extends Conquest
{
    name: string = 'Make It Cozy';
    level: number = 2;
    description: string = 'I really like it here. Let\'s put some comfy stuff for my precious butt.';
    bonusesDescription: string[] = [
        '- Increase production in every fields',
        '- Increase discovery in this field',
    ];
    bonuses: Bonus[] = [
        new ProductionBonus(0.2),
        new DiscoveryBonus(0.65, this.fieldId),
    ];
    costs: Cost[] = [
        new ResourceCost(1, this.fieldId),
        new EnergyCost(3),
    ];

    getNextLevel(): Conquest {
        return new LevelThree(this.fieldId);
    }
}