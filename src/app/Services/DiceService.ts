import Dice from "~/utils/Dice";
import score from "../Stores";

export const diceManager = {
    getDiceSprite(): number[]
    {
        return [1, 2, 5, 6, 4, 0,];
    },

    roll(): number 
    {
        let diceResult = new Dice(score.minDice, score.maxDice).throw();

        this.setLastDiceValue(diceResult);

        return diceResult;
    },

    setLastDiceValue(value: number)
    {
        score.lastDiceValue = value;
    }
};