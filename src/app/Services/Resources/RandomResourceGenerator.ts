import { ResourceType } from "~/game";
import { randomEnumKey } from "~/utils/utils";
import goldPolicy from "~/app/Policies/GoldPolicy"

export default function generateRandomResource(): string {
    let randomType = randomEnumKey(ResourceType);

    while (ResourceType[randomType] == ResourceType.GOLD && goldPolicy.maxGoldTileReached()) {
        randomType = randomEnumKey(ResourceType);
    }

    return randomType;
}