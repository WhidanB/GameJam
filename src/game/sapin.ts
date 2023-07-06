import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class sapin extends Phaser.GameObjects.Container {
    private sapin: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
    


    
   
        this.sapin = scene.add
          .sprite(0, 0, TextureKeys.Sapin)
          .setOrigin(0.5, 1)
    

        this.add(this.sapin);
    

        scene.physics.add.existing(this);
    

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(80, 145);
        body.setOffset(-30, -200);
    


      }

}