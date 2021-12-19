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
        /**
         *  TODO: make the bunny animated
        let isMoving: boolean = true;
        let currentX: number = this.position.x;
        let currentY: number = this.position.y;

        while (isMoving) {
            let movement = this.getMovementDirection({x: currentX, y: currentY }, destination);

            if (currentX == destination.x && currentY == destination.y) {
                isMoving = false;
            }

            let movementInProgress = true;

            while(movementInProgress) {
                switch (movement) {
                    case 'up':
                        currentY -= this.velocity;
                        this.anims.play('player-up');
                        break;

                    case 'down':
                        currentY += this.velocity;
                        this.anims.play('player-down');
                        break;

                    case 'right':
                        currentX += this.velocity;
                        this.anims.play('player-right');
                        break;

                    case 'left':
                        currentX -= this.velocity;
                        this.anims.play('player-left');
                        break;

                    default:
                        movementInProgress = false;
                        break;
                }

                this.setPosition(currentX, currentY);
            }
        } */

        this.position = destination;
        this.setPosition(destination.x, destination.y);
        this.anims.play('player-action');
    }

    getMovementDirection(start: Position, end: Position): string
    {
        if (start.x < end.x) {
            return 'right';
        }

        if (start.y < end.y) {
            return 'down';
        }

        if (start.x > end.x) {
            return 'left';
        }

        if (start.y > end.y) {
            return 'up';
        }

        return 'no_movement';
    }
}