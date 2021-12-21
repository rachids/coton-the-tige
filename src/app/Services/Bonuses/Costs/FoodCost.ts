import FoodManager from "../../Resources/Managers/FoodManager";
import Bonus from "../BonusManager";

export default class FoodCost implements Bonus {
    manager: FoodManager;
    amount: number;

    constructor(amount: number) {
        this.manager = new FoodManager();
        this.amount = amount;
    }

    execute(): void {
        this.manager.remove(this.amount);
    }
}