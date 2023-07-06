import Phaser, { Scene } from "phaser";
import Game from "../Game";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Trou extends Phaser.GameObjects.Container {
    private trou: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
    


    

        this.trou = scene.add
          .sprite(0, 0, TextureKeys.Trou)
          .setOrigin(0.5, 1)
    

        this.add(this.trou);
    

        scene.physics.add.existing(this);
    

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(80, 40);
        body.setOffset(-40, -40);
    
  

      }

}