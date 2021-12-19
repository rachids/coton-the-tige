import { ResourceType } from "~/game";
import { randomEnumKey } from "~/utils/utils";
import eventsCenter from "../EventsCenter";
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
        this.inscreaseDiscovery();

        switch (ResourceType[this.type]) {
            case ResourceType.FOOD:
                score.food++;
                break;
            case ResourceType.WOOD:
                score.wood++;
                break;
            case ResourceType.STONE:
                score.stone++;
                break;

            default:
                break;
        }

        eventsCenter.emit('UPDATE_SCORE');
    }

    inscreaseDiscovery()
    {
        this.discoveryXp++;
    }
}