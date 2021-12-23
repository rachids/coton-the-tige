import DiscoveryLevelPolicy from "~/app/Policies/DiscoveryLevelPolicy";
import { Policy } from "~/app/Policies/Policy";
import { Bonus, Cost } from "~/app/Services/Bonuses/BonusManager";
import EnergyCost from "~/app/Services/Bonuses/Costs/EnergyCost";
import DiscoveryBonus from "~/app/Services/Bonuses/DiscoveryBonus";
import UnlockResource from "~/app/Services/Bonuses/UnlockResource";
import Conquest from "./Conquest";
import LevelOne from "./LevelOne";

export default class LevelZero extends Conquest
{
    name: string = 'New Land';
    level: number = 0;
    description: string = 'This fresh piece of land seems to have some resources to extract. Let\'s make it ours!';
    bonusesDescription: string[] = [
        '- Unlock production of the resource',
        '- Increase the discovery of this field',
    ];
    bonuses: Bonus[] = [
        new UnlockResource(this.fieldId),
        new DiscoveryBonus(0.10, this.fieldId),
    ];
    costs: Cost[] = [
        new EnergyCost(1),
    ];
    requirements: Policy[] = [
        new DiscoveryLevelPolicy(this.fieldId, 1),
    ];

    getNextLevel(): Conquest {
        return new LevelOne(this.fieldId);
    }
}