import BonusManager from "~/app/Services/Bonuses/BonusManager";
import DiscoveryBonus from "~/app/Services/Bonuses/DiscoveryBonus";
import ProductionBonus from "~/app/Services/Bonuses/ProductionBonus";
import Conquest from "./Conquest";
import LevelOne from "./LevelOne";

export default class LevelZero extends Conquest
{
    name: string = 'New Land';
    level: number = 0;
    buildingCost: CostType = {};
    description: string = 'Dear Coton, you need to explore a bit more this field so we know what to do.';
    bonusesDescription: string[] = [
        'Slightly increase the discovery level of every field',
    ];
    bonuses: BonusManager[] = [
        new DiscoveryBonus(0.15),
    ];

    onBuild(): void {
        throw new Error("This should execute all the bonuses.");
    }

    getNextLevel(): Conquest {
        return new LevelOne(this.field);
    }
}