import { Enemy } from "../enemy";
import { AnimationType } from "../factory/animation-factory";

export class EnemyManager {
    enemies: Phaser.Physics.Arcade.Group;
    get hasAliveEnemies(): boolean {
        return !!this.enemies.children.size
    }

    constructor(private _scene: Phaser.Scene) {
        this.enemies = this._scene.physics.add.group({
            maxSize: 3,
            classType: Enemy,
            runChildUpdate: true
        });
        this.enemies.setOrigin(0, 0)
        this._sortEnemies();
        this._animate();
    }

    getRandomAliveEnemy(): Enemy {
        let random = Phaser.Math.RND.integerInRange(1, this.enemies.children.size);
        let enemies = this.enemies.children.getArray() as Enemy[];
        return enemies[random];
    }

    reset() {
        this._sortEnemies();
        this._animate();
    }

    private _sortEnemies() {
        let ORIGIN_X = 100;
        let ORIGIN_Y = 100;
        this.enemies.clear(true, true);
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 10; x++) {
                let enemy: Enemy = this.enemies.create(ORIGIN_X + x * 48, ORIGIN_Y + y * 50);
                enemy.setOrigin(0.5, 0.5);
                enemy.play(AnimationType.Run)
                enemy.setImmovable(false);
            }
        }
    }

    private _animate() {
        this.enemies.children.iterate((c: Enemy) => {
            this._scene.tweens.add({
                targets: c,
                ease: "Linear",
                duration: 2000,
                x: "+=200",
                paused: false,
                delay: 0,
                yoyo: true,
                repeat: -1
            })
        })
    }
}
