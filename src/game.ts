export enum ResourceType {
    FOOD = 'food',
    WOOD = 'wood',
    STONE = 'stone',
    GOLD = 'gold',
};

const gameConfig = {
    COTON_DEBUG: true,
    STARTING_POSITION: {
        x: 77,
        y: 95,
    },
    STARTING_ENERGY_MAX: 3,
    STARTING_XP: 0,
    MAX_STARTING_GOLD: 1,
    LEVELING_MODIFIER: 1.25,
    FIRST_LEVEL_XP: 5,
    NOTIFICATION_ZONE: {
        x: 150,
        y: 390,
    },
    RESOURCES: [
        ResourceType.FOOD,
        ResourceType.GOLD,
        ResourceType.STONE,
        ResourceType.WOOD,
    ],
};

export default gameConfig;