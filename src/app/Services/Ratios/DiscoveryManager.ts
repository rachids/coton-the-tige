import fieldState from "~/app/Stores/fields";
import { playerState } from "~/app/Stores/player";
import AbstractRatioManager from "./AbstractRatioManager";

export default class DiscoveryManager extends AbstractRatioManager
{
    add(value: number): void {
        if (this.fieldId === undefined) {
            playerState.setDiscoveryRatio(
                playerState.discoveryRatio + value
            );
        } else {
            fieldState.addDiscoveryRatio(this.fieldId, value);
        }
    }
    remove(value: number): void {
        throw new Error("Implements removal of discovery ratio.");
    }
}