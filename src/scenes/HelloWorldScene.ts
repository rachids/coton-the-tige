import Phaser from 'phaser'
import GameDice from '~/app/Models/Dice/GameDice';
import Player from '~/app/Models/Player';
import getLandingCase from '~/app/Models/CasePosition';
import eventsCenter from '~/app/EventsCenter';
import score from '~/app/Stores';
import colors from '~/utils/Colors';
import TerrainGameObject from '~/objects/TerrainGameObject';
import fieldManager from '~/app/Services/FieldService';
import PlayerGameObject from '~/objects/PlayerGameObject';
import { TurnHandler } from '~/app/TurnHandler';
import playerManager from '~/app/Services/PlayerService';
export default class HelloWorldScene extends Phaser.Scene
{
    dice: GameDice;
    player!: PlayerGameObject;
    terrains: TerrainGameObject[];
    text: Phaser.GameObjects.Text;

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
        this.scene.run('notification');

        //eventsCenter.on('NEW_TURN', this.player.restoreEnergy, this);

        this.text = this.add.text(640, 520, 'Cursors to move').setScrollFactor(0);
    }

    update(): void {
        this.terrains.forEach(terrainGameObject => {
            terrainGameObject.updateInfos();
        });

        this.text.setText([
            'screen x: ' + this.input.x,
            'screen y: ' + this.input.y,
        ]);
    }

    handleTerrainSwitch()
    {
        let field = fieldManager.getFieldAtPosition(playerManager.player.getFieldId());

        if ( field.id > 6) {
            score.hasLeftStartOfBoard = true;
        }

        if ( field.id <= 6 && score.hasLeftStartOfBoard) {
            score.turn++;
            score.hasLeftStartOfBoard = false;
            eventsCenter.emit('NEW_TURN');
        }

        this.player.updatePosition(field.position);

        field.onLanding();

        this.scene.run('current-terrain-infos', { fieldId: field.id });
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
