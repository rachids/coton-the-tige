export enum ResourceType {
    FOOD = 'food',
    WOOD = 'wood',
    STONE = 'stone',
    GOLD = 'gold',
};

const gameConfig = {
    STARTING_ENERGY_MAX: 3,
    STARTING_XP: 0,
    MAX_STARTING_GOLD: 1,
    LEVELING_MODIFIER: 1.25,
    FIRST_LEVEL_XP: 10,
};

export default gameConfig;