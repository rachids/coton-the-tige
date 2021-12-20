import { ResourceType } from "~/game";
import { randomEnumKey } from "~/utils/utils";
import eventsCenter from "../EventsCenter";
import ratios from "../Ratios";
import score from "../Stores";
import { Position } from "./Types/Position";
import FoodProducer from "../Services/Resources/FoodProducer";
import WoodProducer from "../Services/Resources/WoodProducer";
import StoneProducer from "../Services/Resources/StoneProducer";
import { GoldProducer } from "../Services/Resources/GoldProducer";
import AbstractServiceProducer from "../Contracts";

export default class Terrain extends Phaser.GameObjects.Image {
    discoveryXp: number;
    position: Position;
    type: ResourceType;
    resourceRatio: number;
    currentProductionValue: number;

    constructor(scene: Phaser.Scene, position: Position)
    {
        let randomType = randomEnumKey(ResourceType);

        super(scene, position.x, position.y, randomType.valueOf())

        this.position = position;
        this.discoveryXp = 0;
        this.type = randomType;
        this.resourceRatio = 0;
        this.currentProductionValue = 0;

        const progressBarConfig = {
            height: 24,
            width: 260,
        };
    }

    onLanding()
    {
        let value = score.lastDiceValue;

        this.inscreaseDiscovery(value);

        switch (ResourceType[this.type]) {
            case ResourceType.FOOD:
                this.currentProductionValue += value * ratios.FOOD;
                break;
            case ResourceType.WOOD:
                this.currentProductionValue += value * ratios.WOOD;
                break;
            case ResourceType.STONE:
                this.currentProductionValue += value * ratios.STONE;
                break;
            case ResourceType.GOLD:
                this.currentProductionValue += value * ratios.GOLD;
                break;

            default:
                break;
        }

        console.log('PRODUCED ' + this.type, this.currentProductionValue);

        if (this.currentProductionValue >= 100) {
            this.triggerProduction();
        }

        eventsCenter.emit('UPDATE_SCORE');
    }

    inscreaseDiscovery(value: number)
    {
        this.discoveryXp += value * ratios.DISCOVERY_XP;
    }

    getServiceProducer(): AbstractServiceProducer | undefined
    {
        switch (ResourceType[this.type]) {
            case ResourceType.FOOD:
                return new FoodProducer
            case ResourceType.WOOD:
                return new WoodProducer;
            case ResourceType.STONE:
                return new StoneProducer;
            case ResourceType.GOLD:
                return new GoldProducer(false);

            default:
                return undefined;
                break;
        }
    }

    triggerProduction()
    {      
        let producer: AbstractServiceProducer = this.getServiceProducer();
        let reminder = producer.produce(this.currentProductionValue);

        this.currentProductionValue = reminder;
    }
}