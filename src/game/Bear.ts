import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Bear extends Phaser.GameObjects.Container {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private bear: Phaser.GameObjects.Sprite;
  private isJumping: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);


    this.cursors = scene.input.keyboard.createCursorKeys();
    this.isJumping = false;


    this.bear = scene.add
      .sprite(0, 0, TextureKeys.Bear)
      .setScale(0.3)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.BearWalk);


    this.add(this.bear);


    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(60, 145);
    body.setOffset(-20, -200);

 
    scene.input.keyboard.on('keydown-SPACE', () => {
      this.handleJump();
    });
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (body.blocked.down && !this.isJumping) {
      this.bear.play(AnimationKeys.BearWalk, true);
    } else if (body.velocity.y > 0) {
      this.bear.play(AnimationKeys.BearFall, true);
    }
  }

  handleJump() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (body.blocked.down) {
      body.setVelocityY(-500);
      
      this.bear.play(AnimationKeys.BearJump);
      this.isJumping = true;

  
      this.scene.time.delayedCall(200, () => {
        this.isJumping = false;
      });
    }
  }
}
