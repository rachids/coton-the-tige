import Phaser from 'phaser'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { Plugin as NineSlice } from 'phaser3-nineslice';

import Preloader from './scenes/Preloader';
import HelloWorldScene from './scenes/HelloWorldScene'
import ScoreScene from './scenes/UI/ScoreScene';
import CurrentTerrainInfos from './scenes/UI/CurrentTerrain';
import ConquestScene from './scenes/ConquestScene';
import NotificationScene from './scenes/UI/NotificationScene';
import PlayerInfoScene from './scenes/UI/PlayerInfoScene';

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
		ConquestScene,
		NotificationScene,

		// UI
		ScoreScene,
		CurrentTerrainInfos,
		PlayerInfoScene,
	],
	plugins: {
		global: [NineSlice.DefaultCfg],
		scene: [{
			key: 'rexUI',
			plugin: RexUIPlugin,
			mapping: 'rexUI'
		},]
	},
}

export default new Phaser.Game(config)
