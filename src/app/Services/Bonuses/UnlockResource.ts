import Terrain from "~/app/Models/Terrain";
import Bonus from "./BonusManager";

export default class UnlockResource implements Bonus
{
    field: Terrain;

    constructor(target: Terrain) {
        this.field = target;
    }

    execute(): void {
        this.field.unlockedProduction = true;
    }

}