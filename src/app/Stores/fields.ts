import { makeAutoObservable } from "mobx";
import { CasePosition } from "../Models/CasePosition";
import Conquest from "../Models/Conquests/Conquest";
import Terrain from "../Models/Terrain";

class FieldState {
    fields: Terrain[] = [];

    constructor()
    {
        makeAutoObservable(this);
    }

    generateFields(amount: number = 16)
    {
        for (let i = 0; i < amount; i++) {
            this.fields.push(
                new Terrain(CasePosition[i])
            )
        } 
    }

    getFieldById(id: number)
    {
        return this.fields[id - 1];
    }

    getAdjacentFieldById(id :number): Terrain[]
    {
        let neighbourUp = id + 1;
        let neighbourDown = id - 1;

        if (neighbourUp > this.fields.length) {
            neighbourUp = 0;
        }

        if (neighbourDown < 1) {
            neighbourDown = this.fields.length;
        }

        return [
            this.getFieldById(neighbourDown),
            this.getFieldById(neighbourUp),
        ];
    }

    setUnlockProduction(id: number, value: boolean)
    {
        this.getFieldById(id).unlockedProduction = value;
    }

    setNextConquestLevel(id: number, level: Conquest)
    {
        this.getFieldById(id).conquestLevel = level;
    }

    addDiscoveryRatio(id: number, value: number)
    {
        this.getFieldById(id).discoveryRatio += value;
    }

    addProductionRatio(id: number, value: number)
    {
        this.getFieldById(id).resourceRatio += value;
    }
}

const fieldState = new FieldState();

export default fieldState;