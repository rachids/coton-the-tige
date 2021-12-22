import score from "../Stores";
import { gameState } from "../Stores/game";

const goldPolicy = {
    maxGoldTileReached(): boolean 
    {
        return gameState.currentGoldTile >= gameState.maxGoldTile;
    },
};

export default goldPolicy;