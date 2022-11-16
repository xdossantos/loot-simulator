import {AssetType, bigTextConfig, normalTextConfig, Scenes} from "../lib/constants";

export class Splash extends Phaser.Scene {

    splash: Phaser.GameObjects.Image;
    textManager: TextManager;


    constructor() {
        super({key: Scenes.SplashScreen});
    }

    preload() {
        this.load.setBaseURL("/assets");
        this.load.image(AssetType.SplashScreen, "/images/splash.png");
    }

    create() {
        this.splash = this.add.image(0, 0, AssetType.SplashScreen).setOrigin(0, 0)
        this.textManager = new TextManager(this);

        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {

            this.scene.start('MainScene');

        }, this);

    }

    update(){
        this.textManager.setWinText();

    }

}

export class TextManager {

    line1Text: Phaser.GameObjects.Text;
    line2Text: Phaser.GameObjects.Text;

    constructor(private _scene: Phaser.Scene) {
        this._init();
    }

    private _init() {
        const { width: SIZE_X, height: SIZE_Y } = this._scene.game.canvas;


        this._scene.add.text(16, 16, `HIGH SCORE: 350`, normalTextConfig);
        this.line1Text = this._scene.add
            .text(SIZE_X / 2, 200, "", bigTextConfig)
            .setOrigin(0.5);

        this.line2Text = this._scene.add
            .text(SIZE_X / 2, 500, "", bigTextConfig)
            .setOrigin(0.5);

    }

    setWinText() {
        this._setBigText("Loot Simulator", "PRESS ANY KEY FOR NEW GAME");
    }

    hideText() {
        this._setBigText("", "")
    }

    private _setBigText(line1: string, line2: string) {
        this.line1Text.setText(line1);
        this.line2Text.setText(line2);
    }


    padding(num: number) {
        return `${num}`.padStart(4, "0");
    }
}
