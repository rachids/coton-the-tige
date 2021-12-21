import ResourceHelper from "~/app/Services/Resources/ResourceHelper";

export default abstract class Building
{
    name: string;
    level: number;
    buildingCost: CostType

    constructor(name: string, buildingCost: CostType, level?: number)
    {
        this.name = name;
        this.buildingCost = buildingCost;
        this.level = level ?? 1;
    }

    abstract onBuild(): void

    abstract onUpdate(): void

    cost(ratio: number = 1): number
    {
        return 1;
    }

    canBuild(): boolean
    {
        // Récupérer chacune des valeurs dans BuildingCost
        for (const resource in this.buildingCost) {
            let currentResourceAmount = ResourceHelper.findResourceFromString(resource);

            if (currentResourceAmount < this.buildingCost[resource]) {
                return false;
            }
        }

        return true;
    }

    canUpgrade(): boolean
    {
        // Todo
        return false;
    }

    build()
    {
        
    }
}