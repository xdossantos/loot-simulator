import {AssetType} from "../../lib/constants";

export enum AnimationType {
    Run = "run",
    Loot = "loot",
    Kaboom = "kaboom",
    AisleMove = "aisleMove"
}

export class AnimationFactory {
    constructor(private _scene: Phaser.Scene) {
        this._init();
    }

    private _init() {
        this._scene.anims.create({
            key: AnimationType.Run,
            frames: this._scene.anims.generateFrameNumbers(AssetType.Enemy, {
                start: 0,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });

        this._scene.anims.create({
            key: AssetType.Player1,
            frames: this._scene.anims.generateFrameNumbers(AssetType.Player1, {
                start: 0,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });

        this._scene.anims.create({
            key: AssetType.Player2,
            frames: this._scene.anims.generateFrameNumbers(AssetType.Player2, {
                start: 0,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });

        this._scene.anims.create({
            key: AnimationType.Kaboom,
            frames: this._scene.anims.generateFrameNumbers(AssetType.Kaboom, {
                start: 0,
                end: 15
            }),
            frameRate: 24,
            repeat: 0,
            hideOnComplete: true
        })
    }
}
