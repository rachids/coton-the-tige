import { Bonus, Cost } from "~/app/Services/Bonuses/BonusManager";
import gameConfig from "~/game";
import { NotificationType, Notify } from "~/utils/Notify";
import Terrain from "../Terrain";

export default abstract class Conquest
{
    name: string;
    level: number;
    description: string;
    bonusesDescription: string[];
    bonuses: Bonus[] = [];
    costs: Cost[] = [];
    costsDescription: string[] = [];
    field: Terrain;

    constructor(field: Terrain)
    {
        this.field = field;
        this.name = 'xxNCL_OVSLYxx';
        this.level = 1;
        this.description = "The developer must have forgotten something but he was really busy making a probably more important feature.",
        this.bonusesDescription = [];
    }

    onBuild(): void 
    {
        if (this.canBuild()) {
            // Execute costs
            this.costs.forEach(cost => cost.execute());

            // Execute bonuses
            this.bonuses.forEach(bonus => bonus.execute());

            // Field has new level!
            this.field.conquestLevel = this.getNextLevel();
            Notify.sendMessage("WE HAVE CONQUERED THIS LAND!", gameConfig.NOTIFICATION_ZONE, NotificationType.INFO);
        } else {
            Notify.sendMessage("You don't have all the stuff needed to conquer this land.", gameConfig.NOTIFICATION_ZONE, NotificationType.ALERT);
        }
    }

    abstract getNextLevel(): Conquest;

    setDescription(text: string)
    {
        this.description = text;
    }

    setBonuses(bonuses: Bonus[])
    {
        this.bonuses = bonuses;
    }

    addBonuses(bonus: Bonus)
    {
        this.bonuses.push(bonus);
    }

    setBonusesDescription(bonuses: string[])
    {
        this.bonusesDescription = bonuses;
    }

    addBonusesDescription(bonus: string)
    {
        this.bonusesDescription.push(bonus);
    }

    canBuild(): boolean
    {
        return this.costs.every(cost => cost.hasEnough());
    }

    isActive(currentLevel: number): boolean
    {
        return this.level === currentLevel;
    }

    isNext(currentLevel: number): boolean
    {
        return this.level + 1 === currentLevel;
    }

    getLevelLabel(): string
    {
        return this.level.toString();
    }
}