export interface Policy {
    pass(): boolean;
    showLabel(): string;
}