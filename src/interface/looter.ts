import { AssetType } from "./assets";
import {AnimationType} from "./factory/animation-factory";

export class Looter {
    static create(scene: Phaser.Scene, playerCount: number = 0 ): Phaser.Physics.Arcade.Sprite {
        let looter = scene.physics.add.sprite(300 + (playerCount * 150 ) , 500, AssetType.Player1);
        looter.setCollideWorldBounds(true);
        (playerCount === 0) ? looter.play(AssetType.Player1) : looter.play(AssetType.Player2);
        return looter;
    }
}
