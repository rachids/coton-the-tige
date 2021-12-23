import { gameState } from "../Stores/game";
import { Policy } from "./Policy";

class GoldPolicy implements Policy
{
    pass(): boolean 
    {
        return gameState.currentGoldTile >= gameState.maxGoldTile;
    }

    showLabel(): string {
        throw new Error("Method not implemented.");
    }
};

export const goldPolicy = new GoldPolicy();