import { ResourceType } from "~/game";
import { randomEnumKey } from "~/utils/utils";
import eventsCenter from "../EventsCenter";
import ratios from "../Ratios";
import score from "../Stores";
import { Position } from "./Types/Position";
import FoodProducer from "../Services/Resources/FoodProducer";
import NumberBar from "phaser3-rex-plugins/templates/ui/numberbar/NumberBar";
import WoodProducer from "../Services/Resources/WoodProducer";
import StoneProducer from "../Services/Resources/StoneProducer";
import { GoldProducer } from "../Services/Resources/GoldProducer";
import AbstractServiceProducer from "../Contracts";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class Terrain extends Phaser.GameObjects.Image {
    discoveryXp: number;
    position: Position;
    type: ResourceType;
    resourceRatio: number;
    currentProductionValue: number;
    productionProgressBar: NumberBar;

    constructor(scene: Phaser.Scene, position: Position)
    {
        let randomType = randomEnumKey(ResourceType);

        super(scene, position.x, position.y, randomType.valueOf())

        this.position = position;
        this.discoveryXp = 0;
        this.type = randomType;
        this.resourceRatio = 0;
        this.currentProductionValue = 0;

        this.productionProgressBar = scene.rexUI.add.numberBar({
            x: position.x,
            y: position.y - 64,
            width: 94, // Fixed width
            height: 24,

            background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),

            slider: {
                // width: 120, // Fixed width
                track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
                indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
                input: 'none',
            },

            space: {
                left: 2,
                right: 2,
                top: 2,
                bottom: 2,

                icon: 2,
                slider: 2,
            },

            valuechangeCallback: function (value, oldValue, numberBar) {
                numberBar.text = Math.round(Phaser.Math.Linear(0, 100, value));
            },
        })
            .layout();

        this.productionProgressBar.setValue(this.currentProductionValue, 0, 100);
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

        this.productionProgressBar.setValue(this.currentProductionValue / 100);

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
        this.productionProgressBar.setValue(0, 0, 100);
        
        let producer: AbstractServiceProducer = this.getServiceProducer();
        let reminder = producer.produce(this.currentProductionValue);

        this.currentProductionValue = reminder;
        this.productionProgressBar.setValue(this.currentProductionValue / 100);
    }
}