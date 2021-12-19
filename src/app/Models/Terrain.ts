import { ResourceType } from "~/game";
import { randomEnumKey } from "~/utils/utils";
import eventsCenter from "../EventsCenter";
import ratios from "../Ratios";
import score from "../Stores";
import { Position } from "./Types/Position";

export default class Terrain extends Phaser.GameObjects.Image {
    discoveryXp: number;
    position: Position;
    type: ResourceType;
    resourceRatio: number;
    //TODO: ressource, various ratios, etc.

    constructor(scene: Phaser.Scene, position: Position)
    {
        let randomType = randomEnumKey(ResourceType);

        super(scene, position.x, position.y, randomType.valueOf())

        this.position = position;
        this.discoveryXp = 0;
        this.type = randomType;
        this.resourceRatio = 0;
    }

    onLanding()
    {
        let value = score.lastDiceValue;

        this.inscreaseDiscovery(value);

        switch (ResourceType[this.type]) {
            case ResourceType.FOOD:
                score.food += value * ratios.FOOD;
                break;
            case ResourceType.WOOD:
                score.wood += value * ratios.WOOD;
                break;
            case ResourceType.STONE:
                score.stone += value * ratios.STONE;
                break;
            case ResourceType.GOLD:
                score.gold += value * ratios.GOLD;
                break;

            default:
                break;
        }

        eventsCenter.emit('UPDATE_SCORE');
    }

    inscreaseDiscovery(value: number)
    {
        this.discoveryXp += value * ratios.DISCOVERY_XP;
    }
}