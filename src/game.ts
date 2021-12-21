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
    LEVELING_MODIFIER: 0.25, // 1.25
    FIRST_LEVEL_XP: 1, // 10
    COTON_DEBUG: true,
};

export default gameConfig;