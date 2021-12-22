import { makeAutoObservable } from "mobx";
import gameConfig from "~/game";

class GameState {
    lastDiceValue: number = 0;
    currentGoldTile: number = 0;
    maxGoldTile: number = gameConfig.MAX_STARTING_GOLD;
    minDice: number = 1;
    maxDice: number = 3;

    constructor()
    {
        makeAutoObservable(this);
    }

    setLastDiceValue(value: number)
    {
        this.lastDiceValue = value;
    }
}

export const gameState = new GameState();