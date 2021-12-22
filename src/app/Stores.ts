import gameConfig from "~/game";

const score = {
    food: 0,
    wood: 0,
    stone: 0,
    money: 0,
    gold: 0,
    currentXp: gameConfig.STARTING_XP,
    energyMax: gameConfig.STARTING_ENERGY_MAX,
    energy: 0,
    turn: 0,
    hasLeftStartOfBoard: false,
    lastDiceValue: 0,
    currentGoldTile: 0,
    maxGoldTile: gameConfig.MAX_STARTING_GOLD,
    minDice: 1,
    maxDice: 3,
};

export default score;