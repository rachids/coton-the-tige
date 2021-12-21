import Bonus from "~/app/Services/Bonuses/BonusManager";
import EnergyCost from "~/app/Services/Bonuses/Costs/EnergyCost";
import DiscoveryBonus from "~/app/Services/Bonuses/DiscoveryBonus";
import ProductionBonus from "~/app/Services/Bonuses/ProductionBonus";
import UnlockResource from "~/app/Services/Bonuses/UnlockResource";
import Conquest from "./Conquest";
import LevelOne from "./LevelOne";

export default class LevelZero extends Conquest
{
    name: string = 'New Land';
    level: number = 0;
    buildingCost: CostType = {};
    description: string = 'This fresh piece of land seems to have some resources to extract. Let\'s make it ours!';
    bonusesDescription: string[] = [
        '- Unlock production of the resource',
        '- Increase the discovery of this field',
    ];
    bonuses: Bonus[] = [
        new UnlockResource(this.field),
        new DiscoveryBonus(0.10, this.field),
    ];
    costs: Bonus[] = [
        new EnergyCost(1),
    ];
    costsDescription: string[] = [
        '- 1 Energy',
    ];

    getNextLevel(): Conquest {
        return new LevelOne(this.field);
    }
}