import Phaser from 'phaser';
import { ResourceType } from '~/game';

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader');
    }

    preload()
    {
        this.load.image('board', 'images/boardgame.png');

        // Score
        this.load.image(ResourceType.FOOD, 'images/food.png');
        this.load.image(ResourceType.WOOD, 'images/wood.png');
        this.load.image(ResourceType.STONE, 'images/stone.png');
        this.load.image(ResourceType.GOLD, 'images/gold.png');

        this.load.spritesheet('player', 'images/bunny.png', {
            frameWidth: 72,
        });
        this.load.spritesheet('dice', 'images/diceRed.png', {
            frameWidth: 64,
        });
    }

    create()
    {
        this.anims.create({
            key: 'player-idle',
            frames: [{ key: 'player', frame: 9 }],
        });

        this.anims.create({
            key: 'player-up',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1,
        });

        this.anims.create({
            key: 'player-left',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 7,
            repeat: -1,
        });

        this.anims.create({
            key: 'player-down',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 7,
            repeat: -1,
        });

        this.anims.create({
            key: 'player-right',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 7,
            repeat: -1,
        });

        this.anims.create({
            key: 'player-action',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 27 }),
            frameRate: 7,
            yoyo: true,
        });

        this.scene.start('hello-world');
    }
}