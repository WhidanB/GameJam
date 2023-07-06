import Phaser from "phaser";
import TextureKeys from "./consts/TextureKeys";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
  
    this.load.image(TextureKeys.Background, "house/background2.png");
    this.load.image(TextureKeys.Essaim, "house/essaim.png");
    this.load.image(TextureKeys.Banquise, "house/banquise.png" );
    this.load.image(TextureKeys.Sapin, "house/SAPIN.png");
    this.load.image(TextureKeys.Grotte, "house/grotte.png");
    this.load.image(TextureKeys.Trou, "house/trou.png");
    this.load.image(TextureKeys.End, "house/End.png")
    

  
    this.load.atlas(
      TextureKeys.Bear,
      "characters/bear.png",
      "characters/bear.json"
    );
  }

  create() {
  
    this.anims.create({
      key: AnimationKeys.BearWalk, 
    
      frames: this.anims.generateFrameNames(TextureKeys.Bear, {
        start: 1,
        end: 2,
        prefix: "bearwalk",
       
        suffix: ".png",
      }),
      frameRate: 4,
      repeat: -1, 
    });

 
    this.anims.create({
      key: AnimationKeys.BearJump,
    
      frames: [
        {
          key: TextureKeys.Bear,
          frame: "bearjump.png",
        },
      ],
    });

  
    this.anims.create({
      key: AnimationKeys.BearFall,
     
      frames: [
        {
          key: TextureKeys.Bear,
          frame: "bearjump.png",
        },
      ],
    });

    this.scene.start(SceneKeys.Game);
  }
}
