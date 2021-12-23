import EnergyManager from "../../Resources/Managers/EnergyManager";
import { Cost } from "../BonusManager";

export default class FoodCost implements Cost {
    manager: EnergyManager;
    amount: number;

    constructor(amount: number) {
        this.manager = new EnergyManager();
        this.amount = amount;
    }

    hasEnough(): boolean 
    {
        return this.manager.hasEnough(this.amount);
    }

    execute(): void {
        this.manager.remove(this.amount);
    }
}