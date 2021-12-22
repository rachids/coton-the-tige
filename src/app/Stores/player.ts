import { makeAutoObservable } from "mobx";
import gameConfig from "~/game";

class PlayerState {
    currentEnergy: number = 0;
    energyMax: number = gameConfig.STARTING_ENERGY_MAX;
    fieldId: number = 0;
    hasLeftStartOfBoard: boolean = false;

    constructor()
    {
        makeAutoObservable(this);
    }

    setFieldId(value: number)
    {
        this.fieldId = value;
    }

    addCurrentEnergy(value: number)
    {
        this.currentEnergy += value;
    }

    removeCurrentEnergy(value: number)
    {
        this.currentEnergy -= value;
    }

    setLeftStartOfBoard(value: boolean)
    {
        this.hasLeftStartOfBoard = value;
    }
}

export const playerState = new PlayerState();