import {Bullet} from "../interface/bullet";
import {AssetManager} from "../interface/manager/asset-manager";
import {EnemyManager} from "../interface/manager/enemy-manager";
import {Looter} from "../interface/looter";
import {
    AnimationFactory,
    AnimationType,
} from "../interface/factory/animation-factory";
import {Enemy} from "../interface/enemy";
import {Kaboom} from "../interface/kaboom";
import {EnemyBullet} from "../interface/enemy-bullet";
import {ScoreManager} from "../interface/manager/score-manager";
import {GameState} from "../interface/game-state";
import {Scenes, AssetType, SoundType} from "../lib/constants";


export class Splash extends Phaser.Scene {

    splash : Phaser.GameObjects.Image;

    constructor ()
    {
        super({ key: Scenes.SplashScreen });
    }

    preload ()
    {
        this.load.setBaseURL("/assets");
        this.load.image(AssetType.SplashScreen, "/images/splash.png");
    }

    create ()
    {
        this.splash = this.add.image(0, 0, AssetType.SplashScreen).setOrigin(0,0)

        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {

            this.scene.start('MainScene');

        }, this);
    }

}

export class MainScene extends Phaser.Scene {
    state: GameState;
    assetManager: AssetManager;
    animationFactory: AnimationFactory;
    scoreManager: ScoreManager;
    bulletTime = 0;
    firingTimer = 0;
    floorTiles: Phaser.GameObjects.TileSprite;
    player: Phaser.Physics.Arcade.Sprite;
    player2: Phaser.Physics.Arcade.Sprite;
    enemyManager: EnemyManager;
    player1Controls: Phaser.Types.Input.Keyboard.CursorKeys;
    player2Controls: Phaser.Types.Input.Keyboard.CursorKeys;
    aisles;
    fireKey: Phaser.Input.Keyboard.Key;

    constructor() {
        super({
            key: Scenes.MainScene,
        });
    }

    preload() {
        this.load.setBaseURL("/assets");
        this.load.image(AssetType.FloorTiles, "/images/floortiles.png");
        this.load.image(AssetType.Bullet, "/images/bullet.png");
        this.load.image(AssetType.EnemyBullet, "/images/enemy-bullet.png");
        this.load.image(AssetType.Banana, "/images/shelf/banana.png");
        this.load.image(AssetType.Aisle, "/images/shelf/shelf.png");
        this.load.image(AssetType.Grapes, "/images/shelf/grapes.png");
        this.load.image(AssetType.Koo, "/images/shelf/koo.png");
        this.load.image(AssetType.Milk, "/images/shelf/milk.png");
        this.load.image(AssetType.Omo, "/images/shelf/omo.png");

        this.load.spritesheet(AssetType.Enemy, "/images/invader.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet(AssetType.Player1, "/images/redplayer1.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet(AssetType.Player2, "/images/greenplayer2.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        // this.load.image(AssetType.Player1, "/images/player.png");

        this.load.spritesheet(AssetType.Kaboom, "/images/explode.png", {
            frameWidth: 128,
            frameHeight: 128,
        });

        this.sound.volume = 0.5;
        this.load.audio(SoundType.Shoot, "/audio/shoot.wav");
        this.load.audio(SoundType.Kaboom, "/audio/explosion.wav");
        this.load.audio(SoundType.InvaderKilled, "/audio/invaderkilled.wav");
    }

    create() {
        this.state = GameState.Playing;
        this.floorTiles = this.add
            .tileSprite(0, 0, 800, 600, AssetType.FloorTiles)
            .setOrigin(0, 0);
        this.assetManager = new AssetManager(this);
        this.animationFactory = new AnimationFactory(this);
        this.player1Controls = this.input.keyboard.createCursorKeys();
        this.player2Controls = this.input.keyboard.addKeys({
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'down': Phaser.Input.Keyboard.KeyCodes.S
        });

        this.fireKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.player = Looter.create(this);
        this.player2 = Looter.create(this, 1);


        this.enemyManager = new EnemyManager(this);
        this.scoreManager = new ScoreManager(this);

        this.fireKey.on("down", () => {
            switch (this.state) {
                case GameState.Win:
                case GameState.GameOver:
                    this.restart();
                    break;
            }
        })
    }

    update() {
        this.floorTiles.tilePositionY -= 1;
        this._looterKeyboardHandler();
        if (this.time.now > this.firingTimer) {
            this._enemyFires();
        }

        this.physics.overlap(
            this.assetManager.bullets,
            this.enemyManager.enemies,
            this._bulletHitEnemies,
            null,
            this
        );
        this.physics.overlap(
            this.assetManager.enemyBullets,
            this.player,
            this._enemyBulletHitPlayer,
            null,
            this
        );
        this.physics.overlap(
            this.assetManager.enemyBullets,
            this.player2,
            this._enemyBulletHitPlayer,
            null,
            this
        );
    }

    private _looterKeyboardHandler() {
        let playerBody = this.player.body as Phaser.Physics.Arcade.Body;
        playerBody.setVelocity(0, 0);

        let player2Body = this.player2.body as Phaser.Physics.Arcade.Body;
        player2Body.setVelocity(0, 0);

        if (this.player1Controls.left.isDown) {
            playerBody.setVelocityX(-200);
        } else if (this.player1Controls.right.isDown) {
            playerBody.setVelocityX(200);
        } else if (this.player1Controls.up.isDown) {
            playerBody.setVelocityY(-200);
        } else if (this.player1Controls.down.isDown) {
            playerBody.setVelocityY(200);
        }

        if (this.player2Controls.left.isDown) {
            player2Body.setVelocityX(-200);
        } else if (this.player2Controls.right.isDown) {
            player2Body.setVelocityX(200);
        } else if (this.player2Controls.up.isDown) {
            player2Body.setVelocityY(-200);
        } else if (this.player2Controls.down.isDown) {
            player2Body.setVelocityY(200);
        }

        if (this.fireKey.isDown) {
            this._fireBullet();
        }
    }

    private _bulletHitEnemies(bullet: Bullet, enemy: Enemy) {
        let explosion: Kaboom = this.assetManager.explosions.get();
        bullet.kill();
        enemy.kill(explosion);
        this.scoreManager.increaseScore();
        if (!this.enemyManager.hasAliveEnemies) {
            this.scoreManager.increaseScore(1000);
            this.scoreManager.setWinText();
            this.state = GameState.Win;
        }
    }

    private _enemyBulletHitPlayer(ship, enemyBullet: EnemyBullet) {
        let explosion: Kaboom = this.assetManager.explosions.get();
        enemyBullet.kill();
        let live: Phaser.GameObjects.Sprite = this.scoreManager.lives.getFirstAlive();
        if (live) {
            live.setActive(false).setVisible(false);
        }

        explosion.setPosition(this.player.x, this.player.y);
        explosion.play(AnimationType.Kaboom);
        this.sound.play(SoundType.Kaboom)
        if (this.scoreManager.noMoreLives) {
            this.scoreManager.setGameOverText();
            this.assetManager.gameOver();
            this.state = GameState.GameOver;
            this.player.disableBody(true, true);
        }
    }

    private _enemyFires() {
        if (!this.player.active) {
            return;
        }
        let enemyBullet: EnemyBullet = this.assetManager.enemyBullets.get();
        let randomEnemy = this.enemyManager.getRandomAliveEnemy();
        if (enemyBullet && randomEnemy) {
            enemyBullet.setPosition(randomEnemy.x, randomEnemy.y);
            this.physics.moveToObject(enemyBullet, this.player, 120);
            this.firingTimer = this.time.now + 2000;
        }
    }

    private _fireBullet() {
        if (!this.player.active) {
            return;
        }

        if (this.time.now > this.bulletTime) {
            let bullet: Bullet = this.assetManager.bullets.get();
            if (bullet) {
                bullet.shoot(this.player.x, this.player.y - 18);
                this.bulletTime = this.time.now + 200;
            }
        }
    }

    restart() {
        this.state = GameState.Playing;
        this.player.enableBody(true, this.player.x, this.player.y, true, true);
        this.scoreManager.resetLives();
        this.scoreManager.hideText();
        this.enemyManager.reset();
        this.assetManager.reset();
    }
}
