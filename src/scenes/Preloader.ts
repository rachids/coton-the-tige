import Phaser from 'phaser';
import { diceManager } from '~/app/Services/DiceService';
import playerManager from '~/app/Services/PlayerService';
import fieldState from '~/app/Stores/fields';
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

        // UI
        this.load.image('buttonNormal', 'images/button_normal.png');
        this.load.image('buttonPressed', 'images/button_pressed.png');
        this.load.image('closeBtn', 'images/box_cross.png');
        this.load.image('nextPage', 'images/next_page.png');
        this.load.image('grayPanel', 'images/gray_panel.png');
        this.load.image('work-ratio', 'images/work.png');
        this.load.image('discovery-ratio', 'images/compass.png');

        // Ressources
        this.load.image(ResourceType.FOOD, 'images/food.png');
        this.load.image(ResourceType.WOOD, 'images/wood.png');
        this.load.image(ResourceType.STONE, 'images/stone.png');
        this.load.image(ResourceType.GOLD, 'images/gold.png');

        // Terrain
        this.load.image('terrain-zero', 'images/terrain_zero.png');
        this.load.image('terrain-one', 'images/terrain_one.png');
        this.load.image('terrain-two', 'images/terrain_two.png');
        this.load.image('terrain-three', 'images/terrain_three.png');
        this.load.image('terrain-four', 'images/terrain_four.png');

        // Player
        this.load.spritesheet('player', 'images/bunny.png', {
            frameWidth: 72,
        });

        // Dice
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

        this.anims.create({
            key: 'dice-roll',
            frames: this.anims.generateFrameNumbers('dice', { 
                frames: diceManager.getDiceSprite(),
             })
        });

        // G??n??rer les terrains
        fieldState.generateFields();

        // G??n??rer le personnage
        playerManager.generatePlayer(fieldState.getFieldById(1).id);

        this.scene.start('hello-world');
    }
}