import Phaser from "phaser";
import eventsCenter from "../EventsCenter";
import Terrain from "./Terrain";
import { Position } from "./Types/Position";

export default class Player extends Phaser.GameObjects.Sprite {

    position: Position;
    velocity: number = 14;
    currentTerrain: Terrain;

    constructor(scene: Phaser.Scene, terrain: Terrain) {
        super(scene, terrain.position.x, terrain.position.y, 'player');

        this.currentTerrain = terrain;
        this.position = terrain.position;

        scene.add.existing(this);

        this.play('player-action')
    }

    updateTerrain(destination: Terrain)
    {
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
}