import 'phaser';
import { MainScene} from './scenes/main';
import {Splash} from "./scenes/splash";

const config: Phaser.Types.Core.GameConfig = {
    title: "Looter Simulator",
    type: Phaser.AUTO,
    backgroundColor: 'rgb(47, 52, 55)',
    width: 800,
    height: 600,
    scene: [Splash, MainScene],
    physics: {
        default: "arcade"
    },
    parent: "LootersSimulator"
};

class LootersSimulator extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)
    }
}

const game = new LootersSimulator(config);
