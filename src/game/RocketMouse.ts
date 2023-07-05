import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class RocketMouse extends Phaser.GameObjects.Container {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private mouse: Phaser.GameObjects.Sprite;
  private isJumping: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Get CursorKeys Instance
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.isJumping = false;

    // Create a rocketmouse Sprite:
    this.mouse = scene.add
      .sprite(0, 0, TextureKeys.RocketMouse)
      .setScale(0.3)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun);

    // Add the RocketMouse as a child of Container:
    this.add(this.mouse);

    // Add a physics body:
    scene.physics.add.existing(this);

    // Adjust physics body size and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width, this.mouse.height);
    body.setOffset(this.mouse.width, -this.mouse.height);

    // Add space key event handler
    scene.input.keyboard.on('keydown-SPACE', () => {
      this.handleJump();
    });
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (body.blocked.down && !this.isJumping) {
      this.mouse.play(AnimationKeys.RocketMouseRun, true);
    } else if (body.velocity.y > 0) {
      this.mouse.play(AnimationKeys.RocketMouseFall, true);
    }
  }

  handleJump() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (body.blocked.down) {
      body.setVelocityY(-400);
      this.mouse.play(AnimationKeys.RocketMouseJump);
      this.isJumping = true;

      // Reset isJumping flag after a short delay
      this.scene.time.delayedCall(200, () => {
        this.isJumping = false;
      });
    }
  }
}
