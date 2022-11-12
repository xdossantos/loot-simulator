import { AssetType } from "./assets";

export class Looter {
    static create(scene: Phaser.Scene): Phaser.Physics.Arcade.Sprite {
        let looter = scene.physics.add.sprite(400, 500, AssetType.Looter);
        looter.setCollideWorldBounds(true);
        return looter;
    }
}
