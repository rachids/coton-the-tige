import FoodManager from "../../Resources/Managers/FoodManager";
import { Cost } from "../BonusManager";

export default class FoodCost implements Cost {
    manager: FoodManager;
    amount: number;

    constructor(amount: number) 
    {
        this.manager = new FoodManager();
        this.amount = amount;
    }

    hasEnough(): boolean 
    {
        return this.manager.hasEnough(this.amount);
    }

    execute(): void 
    {
        this.manager.remove(this.amount);
    }

    showLabel(): string
    {
        return `${this.amount} Food`;
    }
}