import { ResourceType } from "~/game";
import { randomEnumKey } from "~/utils/utils";
import eventsCenter from "../EventsCenter";
import score from "../Stores";
import { Position } from "./Types/Position";

export default class Terrain {
    discoveryXp: number;
    position: Position;
    type: ResourceType;
    resourceRatio: number;
    //TODO: ressource, various ratios, etc.

    constructor(position: Position)
    {
        this.position = position;
        this.discoveryXp = 0;
        this.type = randomEnumKey(ResourceType);
        this.resourceRatio = 0;
    }

    onLanding()
    {
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
}