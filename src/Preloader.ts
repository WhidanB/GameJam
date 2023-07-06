import Phaser from "phaser";
import TextureKeys from "./consts/TextureKeys";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    //load background image
    this.load.image(TextureKeys.Background, "house/background2.png");
    this.load.image(TextureKeys.Essaim, "house/essaim.png");
    this.load.image(TextureKeys.Banquise, "house/banquise.png" );
    this.load.image(TextureKeys.Sapin, "house/SAPIN.png");
    this.load.image(TextureKeys.Grotte, "house/grotte.png");
    this.load.image(TextureKeys.Trou, "house/trou.png");
    this.load.image(TextureKeys.End, "house/End.png")
    

    //lad sprite sheet with texturePacker:
    this.load.atlas(
      TextureKeys.Bear,
      "characters/bear.png",
      "characters/bear.json"
    );
  }

  create() {
    //Mouse run animation
    this.anims.create({
      key: AnimationKeys.BearWalk, //name key of the animation
      //helper to generate frames
      frames: this.anims.generateFrameNames(TextureKeys.Bear, {
        start: 1,
        end: 2,
        prefix: "bearwalk",
        // zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 4,
      repeat: -1, // -1 to loop forever
    });

    //fly animation:
    this.anims.create({
      key: AnimationKeys.BearJump,
      //ganarate frames:
      frames: [
        {
          key: TextureKeys.Bear,
          frame: "bearjump.png",
        },
      ],
    });

    //fall animation:
    this.anims.create({
      key: AnimationKeys.BearFall,
      //ganarate frames:
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
