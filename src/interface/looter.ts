import {AssetType} from "../lib/constants";

export class Player {
    static create(scene: Phaser.Scene, playerCount: number = 0 ): Phaser.Physics.Arcade.Sprite {
        let player = scene.physics.add.sprite(450 - (playerCount * 150 ) , 500, AssetType.Player1);
        player.setCollideWorldBounds(true);
        const playerConfig = [AssetType.Player1, AssetType.Player2]
        player.play(playerConfig[playerCount]);
        return player;
    }
}
