import Bonus from "~/app/Services/Bonuses/BonusManager";
import ResourceHelper from "~/app/Services/Resources/ResourceHelper";
import Terrain from "../Terrain";

export default abstract class Conquest
{
    name: string;
    level: number;
    buildingCost: CostType
    description: string;
    bonusesDescription: string[];
    bonuses: Bonus[] = [];
    costs: Bonus[] = [];
    costsDescription: string[] = [];
    field: Terrain;

    constructor(field: Terrain)
    {
        this.field = field;
        this.name = 'xxNCL_OVSLYxx';
        this.buildingCost = {};
        this.level = 1;
        this.description = "The developer must have forgotten something but he was really busy making a probably more important feature.",
        this.bonusesDescription = [];
    }

    onBuild(): void 
    {
        if (this.canBuild()) {
            // Execute costs
            this.costs.forEach(cost => cost.execute());

            // Execute bonuses
            this.bonuses.forEach(bonus => bonus.execute());

            // Field has new level!
            this.field.conquestLevel = this.getNextLevel();
            this.field.updateConquestLabel();
        }
    }

    abstract getNextLevel(): Conquest;

    setDescription(text: string)
    {
        this.description = text;
    }

    setBonuses(bonuses: Bonus[])
    {
        this.bonuses = bonuses;
    }

    addBonuses(bonus: Bonus)
    {
        this.bonuses.push(bonus);
    }

    setBonusesDescription(bonuses: string[])
    {
        this.bonusesDescription = bonuses;
    }

    addBonusesDescription(bonus: string)
    {
        this.bonusesDescription.push(bonus);
    }

    canBuild(): boolean
    {
        // Récupérer chacune des valeurs dans BuildingCost
        for (const resource in this.buildingCost) {
            let currentResourceAmount = ResourceHelper.findResourceFromString(resource);

            // A la première ressource manquante, on ne peut pas build.
            if (currentResourceAmount < this.buildingCost[resource]) {
                return false;
            }
        }

        return true;
    }

    isActive(currentLevel: number): boolean
    {
        return this.level === currentLevel;
    }

    isNext(currentLevel: number): boolean
    {
        return this.level + 1 === currentLevel;
    }
}