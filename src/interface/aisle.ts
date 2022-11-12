import { AssetType } from "./assets";

export class Aisle {
    static create(scene: Phaser.Scene, side: "left" | "right"  ): Phaser.Physics.Arcade.Sprite {
        let position
        if (side == "left"){
            position = 200;
        } else {
            position = 600;
        }
        let aisle = scene.physics.add.sprite(position , 500, AssetType.Looter);
        aisle.setCollideWorldBounds(true);
        return aisle;
    }
}
