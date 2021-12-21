import { ResourceType } from "~/game";
import eventsCenter from "../EventsCenter";
import ratios from "../Ratios";
import score from "../Stores";
import { CasePosition, Position } from "./Types/Position";
import generateRandomResource from "../Services/Resources/RandomResourceGenerator";
import Leveling from "~/utils/Leveling";
import colors from "~/utils/Colors";
import ResourceProducer from "../Services/Resources/ResourceProducer";
import AbstractResourceManager from "../Services/AbstractStatManager";
import FoodManager from "../Services/Resources/Managers/FoodManager";
import StoneManager from "../Services/Resources/Managers/StoneManager";
import WoodManager from "../Services/Resources/Managers/WoodManager";
import GoldManager from "../Services/Resources/Managers/GoldManager";
import Notify from "~/utils/Notify";
import Conquest from "./Conquests/Conquest";
import LevelZero from "./Conquests/LevelZero";
import Fonts from "~/utils/Fonts";

export default class Terrain extends Phaser.GameObjects.Image {
    discoveryXp: number;
    discoveryLevel: number;
    discoveryNextLevelXp: number;
    position: CasePosition;
    type: ResourceType;
    resourceRatio: number;
    discoveryRatio: number;
    currentProductionValue: number;
    resourceImage: Phaser.GameObjects.Image;
    amountLanded: integer;
    producer: ResourceProducer;
    conquestLevel: Conquest;
    unlockedProduction: boolean;
    
    // Labels
    labelConquestLevel: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, position: Position)
    {
        let randomType = generateRandomResource();

        super(scene, position.x, position.y, randomType)

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

        this.labelConquestLevel = scene.add.text(position.x - 45, position.y - 75, '', {
            color: colors.convertColorToString(colors.CARRIBEAN_GREEN),
            align: 'center',
            backgroundColor: '#000',
            padding: { left: 2, right: 2, top: 1, bottom: 1 },
            fontSize: '16px',
            fontFamily: Fonts.forStats,
        });
        this.updateConquestLabel();

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

        if (this.canSeeResource()) {
            this.resourceImage.setVisible(true);
        }

        if (this.canProduce()) {
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
            
            return true;
        }

        return false;
    }

    getResourceManager(): AbstractResourceManager
    {
        switch (ResourceType[this.type]) {
            case ResourceType.FOOD:
                return new FoodManager
            case ResourceType.WOOD:
                return new WoodManager
            case ResourceType.STONE:
                return new StoneManager
            case ResourceType.GOLD:
                return new GoldManager

            default:
                throw new Error('jai pas encore fait le boulot')
        }
    }

    triggerProduction()
    {
        let { amount, surplus } = this.producer.produce(this.currentProductionValue);

        this.currentProductionValue = surplus;

        Notify.sendMessage(`+ ${amount} ${this.type}`, this.position);
    }

    canSeeResource(): boolean
    {
        return this.discoveryLevel > 0;
    }

    canProduce(): boolean
    {
        return this.canSeeResource() && this.unlockedProduction;
    }

    updateConquestLabel()
    {
        this.labelConquestLevel.text = this.conquestLevel.level.toString();
    }
}