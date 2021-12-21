import Terrain from "~/app/Models/Terrain";
import ProductionManager from "../Ratios/ProductionManager";
import Bonus from "./BonusManager";

export default class ProductionBonus implements Bonus
{
    manager: ProductionManager;
    amount: number;

    constructor(amount: number, target?: Terrain) 
    {
        this.manager = new ProductionManager(target);    
        this.amount = amount;
    }

    execute(): void {
        this.manager.add(this.amount);
    }
}