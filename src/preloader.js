export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "Preloader" });
    }

    preload() {
        this.load.setPath("assets");
        this.load.image("logo", "coin.png");
        this.load.image("background", "background.png");
        this.load.image("bottle", "bottle.png");
        this.load.image("bullet-gold", "bullet-gold.png");
        this.load.image("bullet-grey", "bullet-grey.png");
        this.load.image("can", "can.png");
        this.load.image("coin", "coin.png");
        // this.load.image("control-pad", "control-v2.png");
        this.load.image("control", "control.png");
        this.load.image("controlMiddle", "controlMiddle.png");
        this.load.image("crosshair", "crosshair.png");
        this.load.image("dynamite", "dynamite.png");
        this.load.image("gun", "gun.png");
        this.load.image("hat", "hat.png");
        this.load.image("pause", "pause.png");
        this.load.image("red-cross", "red-cross.png");
        this.load.image("sherif-badge", "sherif-badge.png");
        this.load.image("shoot-button", "shoot-button.png");
        this.load.image("star-badge", "star-badge.png");

        this.load.image("bottle", "/targets/bottle.png");
        this.load.image("can", "/targets/can.png");
        this.load.image("dynamite", "/targets/dynamite.png");
        this.load.image("hat", "/targets/hat.png");

        this.load.audio("break", `break.mp3`);
        this.load.audio("shoot", `shoot.mp3`);

        // level2
        this.load.image("saloon2", "/level2/Saloon.png");
        this.load.image("bottle1", "/level2/bottle1.png");
        this.load.image("bottle2", "/level2/bottle2.png");
        this.load.image("bottleBroken", "/level2/bottleBroken.png");
        this.load.image("outlawWhiskey", "/level2/outlawWhiskey.png");
        this.load.image("can2", "/level2/can.png");
        this.load.image("canShot", "/level2/canShot.png");
        this.load.image("goldenStar", "/level2/goldenStar.png");
        this.load.image("A", "/level2/A.png");
        this.load.image("starBroken", "/level2/starBroken.png");
    }

    create() {
        const config = {
            image: "logo",
            width: 31,
            height: 25,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET6,
            charsPerRow: 10,
            spacing: { x: 1, y: 1 },
        };
        this.cache.bitmapFont.add(
            "logo",
            Phaser.GameObjects.RetroFont.Parse(this, config)
        );

        this.scene.start("SplashScene");
    }
}
