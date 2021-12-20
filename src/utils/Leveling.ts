import gameConfig from "~/game";

const Leveling = {
    calculate(value: number): number {
        if (value === 0) {
            return gameConfig.FIRST_LEVEL_XP;
        }

        return value * 100 * gameConfig.LEVELING_MODIFIER;
    },

    getXPNeededByLevel(amount: integer = 10): number[] 
    {
        let levels: integer[] = [];

        for(let i=0; i < amount; i++) {
            levels.push(this.calculate(i));
        }

        return levels;
    },

    getNextLevel(currentLevel: integer = 1): number 
    {
        return this.calculate(currentLevel);
    }
};

export default Leveling;