import ProductionManager from "../Ratios/ProductionManager";
import { Bonus } from "./BonusManager";

export default class ProductionBonus implements Bonus
{
    manager: ProductionManager;
    amount: number;

    constructor(amount: number, fieldId?: number) 
    {
        this.manager = new ProductionManager(fieldId);    
        this.amount = amount;
    }

    execute(): void {
        this.manager.add(this.amount);
    }
}