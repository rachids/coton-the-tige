import { ResourceType } from "~/game";
import eventsCenter from "../EventsCenter";
import ratios from "../Ratios";
import score from "../Stores";
import { Position } from "./Types/Position";
import FoodProducer from "../Services/Resources/Producers/FoodProducer";
import WoodProducer from "../Services/Resources/Producers/WoodProducer";
import StoneProducer from "../Services/Resources/Producers/StoneProducer";
import GoldProducer from "../Services/Resources/Producers/GoldProducer";
import AbstractServiceProducer from "../Services/Resources/Contracts";
import generateRandomResource from "../Services/Resources/RandomResourceGenerator";
import Leveling from "~/utils/Leveling";
import colors from "~/utils/Colors";
import ResourceProducer from "../Services/Resources/ResourceProducer";
import AbstractResourceManager from "../Services/Resources/AbstractResourceManager";
import FoodManager from "../Services/Resources/Managers/FoodManager";

export default class Terrain extends Phaser.GameObjects.Image {
    discoveryXp: number;
    discoveryLevel: number;
    discoveryNextLevelXp: number;
    position: Position;
    type: ResourceType;
    resourceRatio: number;
    currentProductionValue: number;
    resourceImage: Phaser.GameObjects.Image;
    amountLanded: integer;
    producer: ResourceProducer;
    
    // Labels
    labelDiscoveryLevel: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, position: Position)
    {
        let randomType = generateRandomResource();

        super(scene, position.x, position.y, randomType)

        this.position = position;
        this.discoveryXp = 0;
        this.discoveryLevel = 0;
        this.discoveryNextLevelXp = Leveling.getNextLevel(this.discoveryLevel);
        this.type = randomType;
        this.resourceRatio = 0;
        this.currentProductionValue = 0;
        this.amountLanded = 0;
        this.producer = this.generateProducer();

        this.labelDiscoveryLevel = scene.add.text(position.x - 45, position.y - 75, this.discoveryLevel.toString(), {
            color: colors.convertColorToString(colors.CARRIBEAN_GREEN),
            align: 'center',
            backgroundColor: '#000',
            padding: { left: 2, right: 2, top: 1, bottom: 1 },
            fontSize: '16px',
            fontFamily: '',
        });

        this.resourceImage = scene.add.image(position.x, position.y - 50, ResourceType[this.type]).setScale(0.3).setVisible(false);
    }

    generateProducer(): ResourceProducer
    {
        return new ResourceProducer(this.getResourceManager(), false);
    }

    onLanding()
    {
        this.amountLanded++;

        let value = score.lastDiceValue;

        this.inscreaseDiscovery(value);

        if (this.discoveryLevel > 0) {
            this.resourceImage.setVisible(true);

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

            if (this.currentProductionValue >= 100) {
                this.triggerProduction();
            }
        }

        eventsCenter.emit('UPDATE_SCORE');
    }

    inscreaseDiscovery(value: number)
    {
        this.discoveryXp += value * ratios.DISCOVERY_XP;

        if (this.levelUp()) {
            this.discoveryXp = 0;
            eventsCenter.emit('TILE_LEVEL_UP', this);
        }
    }

    levelUp(): boolean
    {
        if (this.discoveryXp >= this.discoveryNextLevelXp) {
            this.discoveryLevel++;
            this.discoveryNextLevelXp = Leveling.getNextLevel(this.discoveryLevel);

            this.labelDiscoveryLevel.text = this.discoveryLevel.toString();

            return true;
        }

        return false;
    }

    getResourceManager(): AbstractResourceManager
    {
        return new FoodManager();

        switch (ResourceType[this.type]) {
            case ResourceType.FOOD:
                return new FoodManager
            case ResourceType.WOOD:
                throw new Error('jai pas encore fait le boulot')
            case ResourceType.STONE:
                throw new Error('jai pas encore fait le boulot')
            case ResourceType.GOLD:
                throw new Error('jai pas encore fait le boulot')

            default:
                throw new Error('jai pas encore fait le boulot')
        }
    }

    triggerProduction()
    {
        let reminder = this.producer.produce(this.currentProductionValue);

        this.currentProductionValue = reminder;
    }
}