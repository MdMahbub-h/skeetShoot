import { Scene } from "phaser";

export class MenuScene extends Scene {
    constructor() {
        super("MenuScene");
        this.isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        // this.scene.start("Level2Scene");
        // this.scene.start("MainScene");

        this.background = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            "background"
        );
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.7);
        graphics.fillRect(0, 0, this.scale.width, this.scale.height);
        // logo_game.setOrigin(0.5, 0.5);
        // logo_game.postFX.addShine(1, 0.2, 5);

        this.title = this.add
            .text(
                this.scale.width / 2,
                this.scale.height * 0.2,
                "Welcome to Skeet Shoot",
                {
                    fontFamily: "Arial",
                    fontSize: "52px",
                    color: "#f17a33",
                    fontStyle: "bold",
                    align: "center",
                }
            )
            .setOrigin(0.5);
        if (this.isMobile) {
            this.title
                .setText("Welcome\nto Skeet Shoot")
                .setScale(0.8)
                .setY(this.scale.height * 0.15);
        }

        let level = 0;

        this.level1 = this.add
            .image(
                this.scale.width * 0.3,
                this.scale.height * 0.45,
                "background"
            )
            .setDisplaySize(150, 100)
            .setInteractive({ useHandCursor: true });
        this.level1Border = this.add.graphics();
        this.level1Border.setVisible(false);
        this.level1.on("pointerdown", () => {
            level = 1;
            this.level1Border.clear();
            this.level1Border.lineStyle(5, 0xffff00);
            this.level1Border.strokeRect(
                this.level1.x - this.level1.displayWidth / 2,
                this.level1.y - this.level1.displayHeight / 2,
                this.level1.displayWidth,
                this.level1.displayHeight
            );
            this.level1Border.setVisible(true);
            this.level2Border.setVisible(false);
            this.level3Border.setVisible(false);
            this.play.setColor("#f9bf33");
        });
        this.easy = this.add
            .text(
                this.level1.x,
                this.level1.y + this.level1.displayHeight / 2 + 40,
                "Easy",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    color: "#f9bf33",
                }
            )
            .setOrigin(0.5);

        this.level2 = this.add
            .image(this.scale.width * 0.5, this.scale.height * 0.45, "saloon2")
            .setDisplaySize(150, 100)
            .setInteractive({ useHandCursor: true });
        this.level2Border = this.add.graphics();
        this.level2Border.setVisible(false);
        this.level2.on("pointerdown", () => {
            level = 2;
            this.level2Border.clear();
            this.level2Border.lineStyle(5, 0xffff00);
            this.level2Border.strokeRect(
                this.level2.x - this.level2.displayWidth / 2,
                this.level2.y - this.level2.displayHeight / 2,
                this.level2.displayWidth,
                this.level2.displayHeight
            );
            this.level2Border.setVisible(true);
            this.level1Border.setVisible(false);
            this.level3Border.setVisible(false);
            this.play.setColor("#f9bf33");
        });
        this.medium = this.add
            .text(
                this.level2.x,
                this.level2.y + this.level1.displayHeight / 2 + 40,
                "Medium",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    fontStyle: "bold",
                    color: "#f9bf33",
                }
            )
            .setOrigin(0.5);

        this.level3 = this.add
            .image(
                this.scale.width * 0.7,
                this.scale.height * 0.452,
                "background"
            )
            .setDisplaySize(150, 100)
            .setInteractive({ useHandCursor: true });
        this.level3Border = this.add.graphics();
        this.level3Border.setVisible(false);
        this.level3.on("pointerdown", () => {
            level = 1;
            this.level3Border.clear();
            this.level3Border.lineStyle(5, 0xffff00);
            this.level3Border.strokeRect(
                this.level3.x - this.level3.displayWidth / 2,
                this.level3.y - this.level3.displayHeight / 2,
                this.level3.displayWidth,
                this.level3.displayHeight
            );
            this.level3Border.setVisible(true);
            this.level1Border.setVisible(false);
            this.level2Border.setVisible(false);
            this.play.setColor("#f9bf33");
        });
        this.hard = this.add
            .text(
                this.level3.x,
                this.level3.y + this.level1.displayHeight / 2 + 40,
                "Hard",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    color: "#f9bf33",
                }
            )
            .setOrigin(0.5);

        this.play = this.add
            .text(this.scale.width / 2, this.scale.height * 0.75, "Play", {
                fontFamily: "Arial",
                fontSize: "70px",
                fontStyle: "bold",
                color: "#b3926e",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                if (level == 1) {
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    setTimeout(() => {
                        this.scene.start("MainScene");
                    }, 1000);
                } else if (level == 2) {
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    setTimeout(() => {
                        this.scene.start("Level2Scene");
                    }, 1000);
                } else if (level == 3) {
                    this.cameras.main.fadeOut(1000, 0, 0, 0);
                    setTimeout(() => {
                        this.scene.start("Level3Scene");
                    }, 1000);
                } else {
                    console.log("select a level");
                }
            });
        if (this.isMobile) {
            this.level1.setY(this.scale.height * 0.32);
            this.level1.setX(this.scale.width * 0.5);
            this.easy.setY(this.scale.height * 0.4);
            this.easy.setX(this.scale.width * 0.5);

            this.level2.setY(this.scale.height * 0.495);
            this.medium.setY(this.scale.height * 0.575);

            this.level3.setY(this.scale.height * 0.67);
            this.level3.setX(this.scale.width * 0.5);
            this.hard.setY(this.scale.height * 0.75);
            this.hard.setX(this.scale.width * 0.5);

            this.play.setY(this.scale.height * 0.85);
        }
    }
}
