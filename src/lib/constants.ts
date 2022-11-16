export enum Scenes {
    SplashScreen = "SplashScreen",
    MainScene = "MainScene"
}

export enum AssetType {
    Bullet = "bullet",
    EnemyBullet = "enemyBullet",
    Enemy = "enemy",
    Player1 = "player1",
    Player2 = "player2",
    Aisle = "aisle",
    SplashScreen = "splashScreen",
    Kaboom = "kaboom",
    FloorTiles = "floorTiles",
    Banana = "banana",
    Grapes = "grapes",
    Koo = "koo",
    Milk = "milk",
    Omo = "omo"
}

export enum SoundType {
    Kaboom = "kaboom",
    Shoot = "shoot",
    MainSong = "mainSong",

    InvaderKilled = "invaderKilled",
    Pickup = "pickup",
    Slip = "slip",
    Background= "background",
    LoadShedding= "loadShedding",
}

export const textConfig = {
    fontFamily: `'Arial', sans-serif`,
    fill: "#ffffff",
};
export const normalTextConfig = {
    ...textConfig,
    fontSize: "16px",
};

export const bigTextConfig = {
    ...textConfig,
    fontSize: "36px",
};
