import score from "../Stores";

const goldPolicy = {
    maxGoldTileReached(): boolean 
    {
        return score.currentGoldTile >= score.maxGoldTile;
    },
};

export default goldPolicy;