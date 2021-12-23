import { makeAutoObservable } from "mobx";
import gameConfig from "~/game";

class PlayerState {
    currentEnergy: number = gameConfig.STARTING_ENERGY_MAX;
    energyMax: number = gameConfig.STARTING_ENERGY_MAX;
    fieldId: number = 0;
    hasLeftStartOfBoard: boolean = false;
    productionRatio: number = 1;
    discoveryRatio: number = 1;

    constructor()
    {
        makeAutoObservable(this);
    }

    setFieldId(value: number)
    {
        this.fieldId = value;
    }

    setCurrentEnergy(value: number)
    {
        this.currentEnergy = value;
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

    setProductionRatio(value: number)
    {
        this.productionRatio = value;
    }

    setDiscoveryRatio(value: number)
    {
        this.discoveryRatio = value;
    }
}

export const playerState = new PlayerState();