import {AssetType, Scenes, SoundType} from "../lib/constants";
import {TextManager} from "./textManager";

export class Splash extends Phaser.Scene {

    splash: Phaser.GameObjects.Image;
    textManager: TextManager;
    mainSong ;



    constructor() {
        super({key: Scenes.SplashScreen});
    }

    preload() {
        this.load.setBaseURL("/assets");
        this.load.image(AssetType.SplashScreen, "/images/splash.png");
        this.load.audio(SoundType.MainSong, "/audio/mainsong.wav");

    }

    create() {
        this.splash = this.add.image(0, 0, AssetType.SplashScreen).setOrigin(0, 0)

        this.textManager = new TextManager(this);

        // Add audio
        this.mainSong = this.sound.play(SoundType.MainSong, {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            }
        );

        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {

            this.scene.start(Scenes.MainScene);

        }, this);

    }

    update(){
        this.textManager.setWelcomeText();

    }

}

