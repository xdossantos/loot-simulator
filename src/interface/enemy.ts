import { AnimationType } from "./factory/animation-factory";
import { Kaboom } from "./kaboom";
import {AssetType, SoundType} from "../lib/constants";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, AssetType.Enemy)
  }

  kill(explosion: Kaboom) {
    if (explosion) {
      explosion.setX(this.x);
      explosion.setY(this.y);
      explosion.play(AnimationType.Kaboom)
      this.scene.sound.play(SoundType.InvaderKilled)
    }
    this.destroy();
  }
}
