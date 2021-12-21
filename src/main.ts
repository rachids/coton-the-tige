import Phaser from 'phaser'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

import Preloader from './scenes/Preloader';
import HelloWorldScene from './scenes/HelloWorldScene'
import ScoreScene from './scenes/UI/ScoreScene';
import CurrentTerrainInfos from './scenes/UI/CurrentTerrain';
import BuildingScene from './scenes/BuildingScene';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: { }
	},
	scene: [
		Preloader,
		HelloWorldScene,
		BuildingScene,

		// UI
		ScoreScene,
		CurrentTerrainInfos,
	],
	plugins: {
		scene: [{
			key: 'rexUI',
			plugin: RexUIPlugin,
			mapping: 'rexUI'
		},]
	},
}

export default new Phaser.Game(config)
