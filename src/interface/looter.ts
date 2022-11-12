import { AssetType } from "./assets";

export class Looter {
    static create(scene: Phaser.Scene, playerCount: number = 0 ): Phaser.Physics.Arcade.Sprite {
        let looter = scene.physics.add.sprite(300 + (playerCount * 150 ) , 500, AssetType.Looter);
        looter.setCollideWorldBounds(true);
        return looter;
    }
}
