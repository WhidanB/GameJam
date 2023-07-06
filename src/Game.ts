import Phaser from "phaser";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";
import TextureKeys from "./consts/TextureKeys";
import Bear from "./game/Bear";
import Trou from "./game/trou"


export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Game);
  }

  private background!: Phaser.GameObjects.TileSprite;

  create() {
    //store the width and height of the game screen:
    const width = this.scale.width;
    const height = this.scale.height;

    //add background, setting it to the size of the game screen and fixed to the camera:
    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    const bear = new Bear(this, width * 0.15, height);
    this.add.existing(bear);
    

    const body = bear.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);

    const trou = new Trou(this, width, height);
    this.add.existing(trou)
    

    //Set bear x velocity:
    body.setVelocityX(100);

    this.physics.world.setBounds(0, 0, 5760, height - 30);

    this.cameras.main.startFollow(bear);
    this.cameras.main.setBounds(0, 0, 5760, height);
  }

  update() {
    this.background.setTilePosition(this.cameras.main.scrollX);
  }

}
