import Phaser from 'phaser'
import GameDice from '~/app/Models/Dice/GameDice';
import eventsCenter from '~/app/EventsCenter';
import colors from '~/utils/Colors';
import TerrainGameObject from '~/objects/TerrainGameObject';
import fieldManager from '~/app/Services/FieldService';
import PlayerGameObject from '~/objects/PlayerGameObject';
export default class HelloWorldScene extends Phaser.Scene
{
    dice!: GameDice;
    player!: PlayerGameObject;
    terrains: TerrainGameObject[];
    debugCoordinates!: Phaser.GameObjects.Text;

	constructor()
	{
		super('hello-world')
        this.terrains = [];
	}

    create()
    {
        this.lights.enable();
        this.lights.setAmbientColor(colors.LAVENDER_GRAY);

        eventsCenter.on('PLAYER_SWITCHED_TERRAIN', this.handleTerrainSwitch, this);
        this.add.image(400, 300, 'board').setPipeline('Light2D').setAlpha(0.8);

        this.lights.addLight(270, 260, 128, colors.TART_ORANGE, 3)

        this.dice = new GameDice(this, 560, 90);

        this.drawFields();
        this.drawPlayer();

        this.scene.run('score-scene');
        this.scene.run('player-info');
        this.scene.run('notification');
        this.scene.run('current-terrain-infos');

        this.debugCoordinates = this.add.text(640, 520, 'Cursors to move').setScrollFactor(0);
    }

    update(): void {
        this.terrains.forEach(terrainGameObject => {
            terrainGameObject.updateInfos();
        });

        this.debugCoordinates.setText([
            'screen x: ' + this.input.x,
            'screen y: ' + this.input.y,
        ]);
    }

    handleTerrainSwitch()
    {
        this.player.updatePosition();
    }

    drawFields()
    {
        let fields = fieldManager.fields;

        fields.forEach(field => {
            let fieldGameObject = new TerrainGameObject(this, field.id);
            fieldGameObject.setOrigin(0, 0);
            fieldGameObject.setPipeline('Light2D').setAlpha(0.9);

            this.add.existing(fieldGameObject);
            this.terrains.push(fieldGameObject);
        });
    }

    drawPlayer()
    {
        this.player = new PlayerGameObject(this);
        this.add.existing(this.player);
    }
}
