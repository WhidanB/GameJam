import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Trou extends Phaser.GameObjects.Container {
    private trou: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
    
        // Get CursorKeys Instance

    
        // Create a rocketbear Sprite:
        this.trou = scene.add
          .sprite(0, 0, TextureKeys.Trou)
          .setOrigin(0.5, 1)
    
        // Add the Rocketbear as a child of Container:
        this.add(this.trou);
    
        // Add a physics body:
        scene.physics.add.existing(this);
    
        // Adjust physics body size and offset:
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(80, 145);
        body.setOffset(-30, -200);
    
        // Add space key event handler

      }

}