import gameConfig from "~/game";
import ratios from "../Ratios";
import EnergyManager from "../Services/Resources/Managers/EnergyManager";
import { playerState } from "../Stores/player";

export default class Player 
{
    currentXp: number;

    constructor() {
        this.currentXp = gameConfig.STARTING_XP;
    }

    increaseXp(value: number = 1)
    {
        this.currentXp += value * (1 * ratios.PLAYER_XP);
    }

    restoreEnergy()
    {
        let manager = new EnergyManager();
        manager.add(playerState.energyMax);        
    }
}