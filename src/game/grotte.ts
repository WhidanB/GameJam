import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Grotte extends Phaser.GameObjects.Container {
    private grotte: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
    


    
   
        this.grotte = scene.add
          .sprite(0, 0, TextureKeys.Grotte)
          .setOrigin(0.5, 1)
    

        this.add(this.grotte);
    

        scene.physics.add.existing(this);
    

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(430, 250);
        body.setOffset(-200, -260);
    


      }

}