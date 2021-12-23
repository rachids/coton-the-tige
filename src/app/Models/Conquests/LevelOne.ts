import { Bonus, Cost } from "~/app/Services/Bonuses/BonusManager";
import EnergyCost from "~/app/Services/Bonuses/Costs/EnergyCost";
import FoodCost from "~/app/Services/Bonuses/Costs/FoodCost";
import DiscoveryBonus from "~/app/Services/Bonuses/DiscoveryBonus";
import ProductionBonus from "~/app/Services/Bonuses/ProductionBonus";
import Conquest from "./Conquest";

export default class LevelOne extends Conquest
{
    name: string = 'Dis My Land Now';
    level: number = 1;
    description: string = 'This new land seems a great spot to gather resources for your conquest of Lewbornough, my dear Coton!';
    bonusesDescription: string[] = [
        '- Slightly increase your discovery skill for each field',
        '- Increase production of this field',
    ];
    bonuses: Bonus[] = [
        new DiscoveryBonus(0.15),
        new ProductionBonus(0.30),
    ];
    costs: Cost[] = [
        //new FoodCost(5),
        new EnergyCost(3),
    ];

    getNextLevel(): Conquest {
        return this;
    }
}