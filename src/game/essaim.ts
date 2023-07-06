import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class essaim extends Phaser.GameObjects.Container {
    private essaim: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
    


    
   
        this.essaim = scene.add
          .sprite(0, 0, TextureKeys.Essaim)
          .setOrigin(0.5, 1)
    

        this.add(this.essaim);
    

        scene.physics.add.existing(this);
    

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(40, 45);
        body.setOffset(-20, -40);
    


      }

}