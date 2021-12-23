import { ResourceType } from "~/game"
import FoodManager from "./Managers/FoodManager"
import GoldManager from "./Managers/GoldManager"
import StoneManager from "./Managers/StoneManager"
import WoodManager from "./Managers/WoodManager"

export const getResourceManager = (type: ResourceType) =>
{
    switch (type) {
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