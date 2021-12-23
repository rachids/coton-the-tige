import gameConfig, { ResourceType } from "~/game";
import { goldPolicy } from "~/app/Policies/GoldPolicy"
import { gameState } from "~/app/Stores/game";

export default function generateRandomResource(): string {
    let randomType: ResourceType = Phaser.Utils.Array.GetRandom(gameConfig.RESOURCES);

    if (! goldPolicy.pass() && randomType === ResourceType.GOLD) {
        gameState.incrementCurrentGoldTile();
    }

    while (randomType == ResourceType.GOLD && goldPolicy.pass()) {
        randomType = Phaser.Utils.Array.GetRandom(gameConfig.RESOURCES);
    }

    return randomType;
}