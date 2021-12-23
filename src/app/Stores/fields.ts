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

    setUnlockProduction(id: number, value: boolean)
    {
        this.getFieldById(id).unlockedProduction = value;
    }

    setNextConquestLevel(id: number, level: Conquest)
    {
        this.getFieldById(id).conquestLevel = level;
    }
}

const fieldState = new FieldState();

export default fieldState;