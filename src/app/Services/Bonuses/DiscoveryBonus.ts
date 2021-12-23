import DiscoveryManager from "../Ratios/DiscoveryManager";
import { Bonus } from "./BonusManager";

export default class DiscoveryBonus implements Bonus
{
    manager: DiscoveryManager;
    amount: number;

    constructor(amount: number, target?: number)
    {
        this.manager = new DiscoveryManager(target);
        this.amount = amount;
    }

    execute(): void {
        this.manager.add(this.amount);
    }
}
