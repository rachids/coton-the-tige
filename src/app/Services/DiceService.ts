import Dice from "~/utils/Dice";
import { gameState } from "../Stores/game";

export const diceManager = {
    getDiceSprite(): number[]
    {
        return [1, 2, 5, 6, 4, 0,];
    },

    roll(): number 
    {
        let diceResult = new Dice(gameState.minDice, gameState.maxDice).throw();

        gameState.setLastDiceValue(diceResult);

        return diceResult;
    },
};