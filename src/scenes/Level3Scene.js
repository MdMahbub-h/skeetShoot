import { Scene } from "phaser";
export class Level3Scene extends Scene {
    constructor() {
        super("Level3Scene");
        this.initGameState();
        this.isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
    }

    initGameState() {
        this.score = 0;
        this.gameOver = false;
        this.bullets = 6;
        // Calculate scale factor based on game width
        this.scaleFactor = window.innerWidth / 1920; // Base scale on 1920px width
        this.targetTypes = [
            { key: "bottle", points: 100, baseScale: 0.8 },
            { key: "can", points: 150, baseScale: 0.7 },
            { key: "dynamite", points: 200, baseScale: 0.6 },
            { key: "hat", points: 300, baseScale: 0.7 },
        ];
    }

    getScaledSize(baseSize) {
        return baseSize * Math.max(0.5, Math.min(1, this.scaleFactor));
    }

    create() {
        this.initGameState(); // Reset game state on create
        this.setupBackground();
        this.setupUI();
        this.setupGameElements();
    }

    setupBackground() {
        // Add background with lowest depth
        this.background = this.add.image(0, 0, "background");
        this.background.setDepth(0);
        // Change origin to center
        this.background.setOrigin(0.5, 0.5);
        this.scaleBackgroundToFit();
    }

    setupUI() {
        // Scale UI elements
        const fontSize = this.getScaledSize(32);
        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: `${fontSize}px`,
            fill: "#fff",
            stroke: "#000",
            strokeThickness: this.getScaledSize(4),
        });
        this.scoreText.setDepth(2);

        this.bulletSprites = [];
        this.setupBulletUI();
    }

    setupGameElements() {
        // Setup targets
        this.targets = this.physics.add.group();
        this.spawnTarget();

        // Setup crosshair with highest depth
        this.crosshair = this.add.image(0, 0, "crosshair");
        this.crosshair.setScale(this.getScaledSize(0.3));
        this.crosshair.setDepth(3);

        if (this.isMobile) {
            // Mobile controls
            this.setupMobileControls();

            // Start crosshair in center for mobile
            this.crosshair.x = this.cameras.main.width / 2;
            this.crosshair.y = this.cameras.main.height / 2;
        } else {
            // Desktop controls
            this.input.on("pointermove", (pointer) => {
                this.crosshair.x = pointer.x;
                this.crosshair.y = pointer.y;
            });

            this.input.on("pointerdown", (pointer) => {
                this.shoot(pointer);
            });
        }
    }

    scaleBackgroundToFit() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        // Calculate scale to cover the entire screen while maintaining aspect ratio
        const scaleX = gameWidth / this.background.width;
        const scaleY = gameHeight / this.background.height;
        const scale = Math.max(scaleX, scaleY);

        this.background.setScale(scale);

        // Center the background
        this.background.setPosition(gameWidth / 2, gameHeight / 2);
    }

    setupBulletUI() {
        this.bulletSprites.forEach((sprite) => sprite.destroy());
        this.bulletSprites = [];

        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        const bulletScale = this.getScaledSize(0.5);
        const spacing = this.getScaledSize(40);

        for (let i = 0; i < this.bullets; i++) {
            const bullet = this.add.image(
                gameWidth - this.getScaledSize(50) - i * spacing,
                gameHeight - this.getScaledSize(100),
                "bullet-gold"
            );
            bullet.setScale(bulletScale);
            bullet.setDepth(2);
            this.bulletSprites.push(bullet);
        }

        if (this.reloadBtn) {
            this.reloadBtn.setPosition(
                gameWidth - this.getScaledSize(70),
                gameHeight - this.getScaledSize(150)
            );
        }
    }

    getRandomTarget() {
        return this.targetTypes[
            Math.floor(Math.random() * this.targetTypes.length)
        ];
    }

    spawnTarget() {
        const targetType = this.getRandomTarget();

        // Determine spawn point (left or right side)
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const spawnFromLeft = Math.random() > 0.5;
        const startX = spawnFromLeft ? -50 : gameWidth + 50;
        const startY = gameHeight - 50;

        const target = this.targets.create(startX, startY, targetType.key);

        // Scale target based on screen size
        const scaledSize = this.getScaledSize(targetType.baseScale);
        target.setScale(scaledSize);

        target.setInteractive();
        target.points = targetType.points;
        target.setDepth(1);

        // Adjust velocity based on screen size
        const angle = spawnFromLeft
            ? Phaser.Math.Between(-75, -45)
            : Phaser.Math.Between(-135, -105);

        // Scale speed based on screen width
        const baseSpeed = Phaser.Math.Between(700, 900);
        const scaledSpeed =
            baseSpeed * Math.max(0.6, Math.min(1, this.scaleFactor));

        const velocity = this.physics.velocityFromAngle(angle, scaledSpeed);
        target.setVelocity(velocity.x, velocity.y);

        // Scale gravity with screen size
        target.body.gravity.y = 800 * this.scaleFactor;

        target.rotationSpeed =
            (spawnFromLeft ? 1 : -1) * Phaser.Math.Between(5, 8);
        target.checkWorldBounds = true;
        target.outOfBoundsKill = true;

        this.time.delayedCall(1500, () => {
            if (this.targets.countActive() < 3) {
                this.spawnTarget();
            }
        });
    }

    reload() {
        this.bullets = 6;
        this.setupBulletUI(); // This will recreate all bullet sprites
    }

    showGameOver() {
        this.gameOver = true;

        // Create semi-transparent overlay
        const overlay = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.7
        );
        overlay.setDepth(4);

        // Add game over text
        const gameOverText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 100,
            "GAME OVER",
            {
                fontSize: "64px",
                fill: "#fff",
                fontFamily: "Western, Arial",
                stroke: "#000",
                strokeThickness: 6,
            }
        );
        gameOverText.setOrigin(0.5);
        gameOverText.setDepth(5);

        // Add final score
        const finalScoreText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            `Final Score: ${this.score}`,
            {
                fontSize: "32px",
                fill: "#fff",
                fontFamily: "Western, Arial",
                stroke: "#000",
                strokeThickness: 4,
            }
        );
        finalScoreText.setOrigin(0.5);
        finalScoreText.setDepth(5);

        // Add restart button
        const restartButton = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 100,
            "Play Again",
            {
                fontSize: "32px",
                fill: "#fff",
                backgroundColor: "#4a524a",
                padding: { x: 20, y: 10 },
                fontFamily: "Western, Arial",
                stroke: "#000",
                strokeThickness: 4,
            }
        );
        restartButton.setOrigin(0.5);
        restartButton.setDepth(5);
        restartButton.setInteractive({ useHandCursor: true });

        // Hover effects
        restartButton.on("pointerover", () => {
            restartButton.setStyle({ fill: "#ffff00" });
        });

        restartButton.on("pointerout", () => {
            restartButton.setStyle({ fill: "#fff" });
        });

        // Click handler
        restartButton.on("pointerdown", () => {
            this.scene.restart();
        });
    }

    shoot(pointer) {
        if (this.gameOver) return; // Don't allow shooting if game is over
        if (this.bullets <= 0) return;

        this.sound.play("shoot");
        this.bullets--;
        this.bulletSprites[this.bullets].destroy();

        this.targets.children.each((target) => {
            const distance = Phaser.Math.Distance.Between(
                pointer.x,
                pointer.y,
                target.x,
                target.y
            );

            if (distance < 50) {
                this.sound.play("break");
                target.destroy();
                this.score += target.points;
                this.scoreText.setText("Score: " + this.score);

                // Spawn a new target after hitting one
                this.time.delayedCall(1000, () => {
                    if (this.targets.countActive() < 3) {
                        this.spawnTarget();
                    }
                });
            }
        });

        // Check for game over condition
        if (this.bullets <= 0) {
            this.time.delayedCall(1000, () => {
                this.showGameOver();
            });
        }
    }

    update() {
        // Update target rotations based on their rotation speed
        this.targets.children.each((target) => {
            if (target.active) {
                target.rotation += target.rotationSpeed * (Math.PI / 180);
            }
        });

        // Ensure there are always targets in play
        if (this.targets.countActive() === 0) {
            this.spawnTarget();
        }
    }

    setupMobileControls() {
        if (!this.isMobile) return;

        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        // Add control pad on the left side
        this.controlPad = this.add.image(
            this.getScaledSize(100), // x position
            gameHeight - this.getScaledSize(100), // y position
            "control-pad"
        );
        this.controlPad.setScale(this.getScaledSize(0.5));
        this.controlPad.setDepth(4);
        this.controlPad.setAlpha(0.7);
        this.controlPad.setInteractive();

        // Add shoot button on the right side
        this.shootButton = this.add.image(
            gameWidth - this.getScaledSize(100),
            gameHeight - this.getScaledSize(100),
            "shoot-button"
        );
        this.shootButton.setScale(this.getScaledSize(0.5));
        this.shootButton.setDepth(4);
        this.shootButton.setAlpha(0.7);
        this.shootButton.setInteractive();

        // Control pad drag handling
        this.input.on("pointermove", (pointer) => {
            if (pointer.isDown) {
                const distance = Phaser.Math.Distance.Between(
                    this.controlPad.x,
                    this.controlPad.y,
                    pointer.x,
                    pointer.y
                );

                if (distance < this.getScaledSize(150)) {
                    // Control radius
                    const angle = Phaser.Math.Angle.Between(
                        this.controlPad.x,
                        this.controlPad.y,
                        pointer.x,
                        pointer.y
                    );

                    // Move crosshair based on control pad movement
                    const speed = this.getScaledSize(15);
                    this.crosshair.x += Math.cos(angle) * speed;
                    this.crosshair.y += Math.sin(angle) * speed;

                    // Keep crosshair within bounds
                    this.crosshair.x = Phaser.Math.Clamp(
                        this.crosshair.x,
                        0,
                        gameWidth
                    );
                    this.crosshair.y = Phaser.Math.Clamp(
                        this.crosshair.y,
                        0,
                        gameHeight
                    );
                }
            }
        });

        // Shoot button handling
        this.shootButton.on("pointerdown", () => {
            this.shoot({ x: this.crosshair.x, y: this.crosshair.y });
        });
    }
}
