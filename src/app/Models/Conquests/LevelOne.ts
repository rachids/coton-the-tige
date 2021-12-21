import Bonus from "~/app/Services/Bonuses/BonusManager";
import EnergyCost from "~/app/Services/Bonuses/Costs/EnergyCost";
import FoodCost from "~/app/Services/Bonuses/Costs/FoodCost";
import DiscoveryBonus from "~/app/Services/Bonuses/DiscoveryBonus";
import Conquest from "./Conquest";

export default class LevelOne extends Conquest
{
    name: string = 'Dis My Land Now';
    level: number = 1;
    buildingCost: CostType = {
        food: 5
    };
    description: string = 'This new land seems a great spot to gather resources for your conquest of Lewbornough, my dear Coton!';
    bonusesDescription: string[] = [
        'Slightly increase the discovery level of every field',
    ];
    bonuses: Bonus[] = [
        new DiscoveryBonus(0.15),
    ];
    costs: Bonus[] = [
        new FoodCost(5),
        new EnergyCost(5),
    ];
    costsDescription: string[] = [
        '- 5 Food',
        '- 1 Energy'
    ];

    getNextLevel(): Conquest {
        return this;
    }
}