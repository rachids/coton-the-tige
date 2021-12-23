import { ResourceType } from "~/game";
import eventsCenter from "../EventsCenter";
import ratios from "../Ratios";
import { CasePosition, Position } from "./Types/Position";
import generateRandomResource from "../Services/Resources/RandomResourceGenerator";
import Leveling from "~/utils/Leveling";
import ResourceProducer from "../Services/Resources/ResourceProducer";
import AbstractResourceManager from "../Services/AbstractStatManager";
import FoodManager from "../Services/Resources/Managers/FoodManager";
import StoneManager from "../Services/Resources/Managers/StoneManager";
import WoodManager from "../Services/Resources/Managers/WoodManager";
import GoldManager from "../Services/Resources/Managers/GoldManager";
import { NotificationType, Notify } from "~/utils/Notify";
import Conquest from "./Conquests/Conquest";
import LevelZero from "./Conquests/LevelZero";
import { gameState } from "../Stores/game";

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
        this.conquestLevel = new LevelZero(this);
    }

    generateProducer(): ResourceProducer
    {
        return new ResourceProducer(this.getResourceManager(), false);
    }

    onLanding()
    {
        this.amountLanded++;

        let diceValue = gameState.lastDiceValue;

        this.inscreaseDiscovery(diceValue);

        if (this.canProduce()) {
            switch (ResourceType[this.type]) {
                case ResourceType.FOOD:
                    this.currentProductionValue += diceValue * ratios.FOOD;
                    break;
                case ResourceType.WOOD:
                    this.currentProductionValue += diceValue * ratios.WOOD;
                    break;
                case ResourceType.STONE:
                    this.currentProductionValue += diceValue * ratios.STONE;
                    break;
                case ResourceType.GOLD:
                    this.currentProductionValue += diceValue * ratios.GOLD;
                    break;

                default:
                    break;
            }

            if (this.currentProductionValue >= 100) {
                this.triggerProduction();
            }
        }

        eventsCenter.emit('UPDATE_SCORE');
    }

    inscreaseDiscovery(value: number)
    {
        this.discoveryXp += value * ratios.DISCOVERY_XP;

        if (this.discoveryLevelUp()) {
            this.discoveryXp = 0;
            eventsCenter.emit('TILE_LEVEL_UP', this);
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

    getResourceManager(): AbstractResourceManager
    {
        switch (this.type) {
            case ResourceType.FOOD:
                return new FoodManager
            case ResourceType.WOOD:
                return new WoodManager
            case ResourceType.STONE:
                return new StoneManager
            case ResourceType.GOLD:
                return new GoldManager

            default:
                throw new Error('It seems the developer forgot he had to add something here about the resource managers or something.');
        }
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