import ratios from "~/app/Ratios";
import AbstractRatioManager from "./AbstractRatioManager";

export default class ProductionManager extends AbstractRatioManager
{
    add(value: number): void {
        if (this.field === undefined) {
            ratios.PRODUCTION += value;
        } else {
            try {
                this.field.resourceRatio += value;
            } catch (error) {
                throw new Error('DiscoveryManager has failed.', error);
            }
        }
    }

    remove(value: number): void {
        if (this.field === undefined) {
            ratios.PRODUCTION -= value;
        } else {
            try {
                this.field.resourceRatio -= value;
            } catch (error) {
                throw new Error('DiscoveryManager has failed.', error);
            }
        }
    }
}