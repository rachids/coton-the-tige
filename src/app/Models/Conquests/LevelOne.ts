import Bonus from "~/app/Services/Bonuses/BonusManager";
import FoodCost from "~/app/Services/Bonuses/Costs/FoodCost";
import DiscoveryBonus from "~/app/Services/Bonuses/DiscoveryBonus";
import ProductionBonus from "~/app/Services/Bonuses/ProductionBonus";
import UnlockResource from "~/app/Services/Bonuses/UnlockResource";
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
        'Reveal the resource',
        'Unlock production of the resource',
        'Slightly increase the discovery level of every field',
    ];
    bonuses: Bonus[] = [
        new UnlockResource(this.field),
        new DiscoveryBonus(0.15),
    ];
    costs: Bonus[] = [
        new FoodCost(5),
    ]

    onBuild(): void {
        throw new Error("This should execute: all the cost + all the bonuses.");
    }

    getNextLevel(): Conquest {
        return this;
    }
}