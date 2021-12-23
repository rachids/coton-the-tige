import { Bonus, Cost } from "~/app/Services/Bonuses/BonusManager";
import EnergyCost from "~/app/Services/Bonuses/Costs/EnergyCost";
import DiscoveryBonus from "~/app/Services/Bonuses/DiscoveryBonus";
import FreeResourceBonus from "~/app/Services/Bonuses/FreeResourceBonus";
import ProductionBonus from "~/app/Services/Bonuses/ProductionBonus";
import Conquest from "./Conquest";
import LevelTwo from "./LevelTwo";

export default class LevelOne extends Conquest
{
    name: string = 'Dis My Land Now';
    level: number = 1;
    description: string = 'Chopping down trees so I can produce more! That\'s what humans would do so why not me.';
    bonusesDescription: string[] = [
        '- Slightly increase your discovery skill for each field',
        '- Increase production of this field',
        '- One free resource of the current field',
    ];
    bonuses: Bonus[] = [
        new DiscoveryBonus(0.15),
        new ProductionBonus(0.30, this.fieldId),
        new FreeResourceBonus(1, this.fieldId),
    ];
    costs: Cost[] = [
        new EnergyCost(3),
    ];

    getNextLevel(): Conquest {
        return new LevelTwo(this.fieldId);
    }
}