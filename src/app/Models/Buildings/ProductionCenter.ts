import Building from "./Building";

export default class ProductionCenter extends Building
{
    onBuild(): void {
        throw new Error("Method not implemented.");
    }
    onUpdate(): void {
        throw new Error("Method not implemented.");
    }
}