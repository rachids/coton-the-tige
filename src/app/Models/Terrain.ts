import { ResourceType } from "~/game";
import { CasePosition, Position } from "./Types/Position";
import generateRandomResource from "../Services/Resources/RandomResourceGenerator";
import Leveling from "~/utils/Leveling";
import ResourceProducer from "../Services/Resources/ResourceProducer";
import { AbstractResourceManager } from "../Services/AbstractStatManager";
import FoodManager from "../Services/Resources/Managers/FoodManager";
import StoneManager from "../Services/Resources/Managers/StoneManager";
import WoodManager from "../Services/Resources/Managers/WoodManager";
import GoldManager from "../Services/Resources/Managers/GoldManager";
import { NotificationType, Notify } from "~/utils/Notify";
import Conquest from "./Conquests/Conquest";
import LevelZero from "./Conquests/LevelZero";
import { gameState } from "../Stores/game";
import { playerState } from "../Stores/player";
import { getResourceManager } from "../Services/Resources/utils";

export default class Terrain {
    id: number;
    discoveryXp: number;
    discoveryLevel: number;
    discoveryNextLevelXp: number;
    position: Position;
    type: ResourceType;
    resourceRatio: number;
    discoveryRatio: number;
    currentProductionValue: number;
    amountLanded: integer;
    producer: ResourceProducer;
    conquestLevel: Conquest;
    unlockedProduction: boolean;
    
    constructor(position: CasePosition)
    {
        let randomType = generateRandomResource();

        this.id = position.caseNumber;
        this.position = position;
        this.discoveryXp = 0;
        this.discoveryLevel = 0;
        this.discoveryNextLevelXp = Leveling.getNextLevel(this.discoveryLevel);
        this.type = randomType;
        this.resourceRatio = 1;
        this.discoveryRatio = 1;
        this.currentProductionValue = 0;
        this.amountLanded = 0;
        this.producer = this.generateProducer();
        this.unlockedProduction = false;
        this.conquestLevel = new LevelZero(this.id);
    }

    generateProducer(): ResourceProducer
    {
        return new ResourceProducer(getResourceManager(this.type), false);
    }

    onLanding()
    {
        this.amountLanded++;

        let diceValue = gameState.lastDiceValue;

        this.inscreaseDiscovery(diceValue);

        if (this.canProduce()) {

            let amountProducedRaw = this.producer.getAmountProduced(diceValue);

            this.currentProductionValue += amountProducedRaw * this.resourceRatio;

            if (this.currentProductionValue >= 100) {
                this.triggerProduction();
            }
        }
    }

    inscreaseDiscovery(value: number)
    {
        this.discoveryXp += value * playerState.discoveryRatio * this.discoveryRatio;

        if (this.discoveryLevelUp()) {
            this.discoveryXp = 0;
        }
    }

    discoveryLevelUp(): boolean
    {
        if (this.discoveryXp >= this.discoveryNextLevelXp) {
            this.discoveryLevel++;
            this.discoveryNextLevelXp = Leveling.getNextLevel(this.discoveryLevel);
            
            return true;
        }

        return false;
    }

    triggerProduction()
    {
        let { amount, surplus } = this.producer.produce(this.currentProductionValue);

        this.currentProductionValue = surplus;

        Notify.sendMessage(`+ ${amount} ${this.type}`, this.position, NotificationType.STATS);
    }

    canSeeResource(): boolean
    {
        return this.discoveryLevel > 0;
    }

    canProduce(): boolean
    {
        return this.canSeeResource() && this.unlockedProduction;
    }
}