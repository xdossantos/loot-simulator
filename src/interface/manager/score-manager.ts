import {AssetType, bigTextConfig, normalTextConfig} from "../../lib/constants";

export class ScoreManager {
  scoreText: Phaser.GameObjects.Text;
  line1Text: Phaser.GameObjects.Text;
  line2Text: Phaser.GameObjects.Text;
  player1coins: Phaser.Physics.Arcade.Group;

  get noMoreCoins() {
    return this.player1coins.countActive(true) === 0;
  }

  highScore = 0;
  score = 0;

  constructor(private _scene: Phaser.Scene) {
    this._init();
    this.print();
  }

  private _init() {
    const { width: SIZE_X, height: SIZE_Y } = this._scene.game.canvas;


    this._scene.add.text(16, 16, `SCORE`, normalTextConfig);
    this.scoreText = this._scene.add.text(22, 32, "", normalTextConfig);
    this.line1Text = this._scene.add
      .text(SIZE_X / 2, 320, "", bigTextConfig)
      .setOrigin(0.5);

    this.line2Text = this._scene.add
      .text(SIZE_X / 2, 400, "", bigTextConfig)
      .setOrigin(0.5);

    this._setCoinsText(SIZE_X, normalTextConfig);
  }

  private _setCoinsText(
    SIZE_X: number,
    textConfig: { fontSize: string; fontFamily: string; fill: string }
  ) {
    this._scene.add.text(SIZE_X - 100, 16, `COINS`, textConfig);
    this.player1coins = this._scene.physics.add.group({
      maxSize: 3,
      runChildUpdate: true,
    });
    this.resetCoins();
  }

  resetCoins() {
    let SIZE_X = this._scene.game.canvas.width;
    this.player1coins.clear(true, true)
    for (let i = 0; i < 3; i++) {
      let ship: Phaser.GameObjects.Sprite = this.player1coins.create(
        SIZE_X - 100 + 30 * i,
        60,
        AssetType.Player1
      );
      ship.setOrigin(0.5, 0.5);
      ship.setAngle(90);
      ship.setAlpha(0.6);
    }
  }

  setWinText() {
    this._setBigText("YOU WON!", "PRESS SPACE FOR NEW GAME");
  }

  setGameOverText() {
    this._setBigText("GAME OVER", "PRESS SPACE FOR NEW GAME");
  }

  hideText() {
    this._setBigText("", "")
  }

  private _setBigText(line1: string, line2: string) {
    this.line1Text.setText(line1);
    this.line2Text.setText(line2);
  }

  setHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    this.score = 0;
    this.print();
  }

  print() {
    this.scoreText.setText(`${this.padding(this.score)}`);
  }

  increaseScore(step = 10) {
    this.score += step;
    this.print();
  }

  padding(num: number) {
    return `${num}`.padStart(4, "0");
  }
}
