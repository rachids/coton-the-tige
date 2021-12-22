import gameConfig from "~/game";
import eventsCenter from "../EventsCenter";
import ratios from "../Ratios";
import fieldManager from "../Services/FieldService";
import score from "../Stores";
import Terrain from "./Terrain";
import { Position } from "./Types/Position";

export default class Player 
{
    fieldId?: number;
    currentXp: number;

    constructor() {
        this.currentXp = gameConfig.STARTING_XP;
    }

    setFieldId(fieldId: number)
    {
        this.fieldId = fieldId;
    }

    getFieldId(): number
    {
        return this.fieldId ?? fieldManager.fields[0].id;
    }

    updateTerrain(destination: Terrain)
    {
        this.increaseXp(score.lastDiceValue);
        this.fieldId = destination.id;

        eventsCenter.emit('PLAYER_SWITCHED_TERRAIN', destination.id);
    }

    increaseXp(value: number = 1)
    {
        this.currentXp += value * (1 * ratios.PLAYER_XP);
    }

    restoreEnergy()
    {
        score.energy = score.energyMax;
    }
}