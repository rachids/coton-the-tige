import Phaser from "phaser";
import gameConfig from "~/game";
import eventsCenter from "../EventsCenter";
import ratios from "../Ratios";
import score from "../Stores";
import Terrain from "./Terrain";
import { Position } from "./Types/Position";

export default class Player extends Phaser.GameObjects.Sprite {

    position: Position;
    velocity: number = 14;
    currentTerrain: Terrain;
    currentXp: number;

    constructor(scene: Phaser.Scene, terrain: Terrain) {
        super(scene, terrain.position.x, terrain.position.y, 'player');

        this.currentTerrain = terrain;
        this.position = terrain.position;
        this.currentXp = gameConfig.STARTING_XP;

        scene.add.existing(this);

        this.play('player-action')
    }

    updateTerrain(destination: Terrain)
    {
        this.increaseXp(score.lastDiceValue);
        this.currentTerrain = destination;

        eventsCenter.emit('PLAYER_SWITCHED_TERRAIN', destination);

        this.updatePosition(destination.position);
    }

    updatePosition(destination: Position)
    {
        this.position = destination;
        this.setPosition(destination.x, destination.y);
        this.anims.play('player-action');
    }

    increaseXp(value: number = 1)
    {
        this.currentXp += value * (1 * ratios.PLAYER_XP);
    }

    restoreEnergy()
    {
        score.energy = score.energyMax;
    }
}