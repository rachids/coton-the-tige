import ratios from "~/app/Ratios";
import AbstractRatioManager from "./AbstractRatioManager";

export default class DiscoveryManager extends AbstractRatioManager
{
    add(value: number): void {
        if (this.field === undefined) {
            ratios.DISCOVERY_XP += value;
        } else {
            try {
                this.field.discoveryRatio += value;   
            } catch (error) {
                throw new Error('DiscoveryManager has failed.', error);
            }
        }
    }
    remove(value: number): void {
        if (this.field === undefined) {
            ratios.DISCOVERY_XP -= value;
        } else {
            try {
                this.field.discoveryRatio -= value;
            } catch (error) {
                throw new Error('DiscoveryManager has failed.', error);
            }
        }
    }
    
}