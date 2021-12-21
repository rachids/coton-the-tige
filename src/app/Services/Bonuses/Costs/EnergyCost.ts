import EnergyManager from "../../Resources/Managers/EnergyManager";
import Bonus from "../BonusManager";

export default class FoodCost implements Bonus {
    manager: EnergyManager;
    amount: number;

    constructor(amount: number) {
        this.manager = new EnergyManager();
        this.amount = amount;
    }

    execute(): void {
        this.manager.remove(this.amount);
    }
}