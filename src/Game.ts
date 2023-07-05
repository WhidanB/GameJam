import Phaser from "phaser";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";
import TextureKeys from "./consts/TextureKeys";
import RocketMouse from "./game/RocketMouse";
import LaserObstacle from "./game/LaserObstacle";

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

    const mouse = new RocketMouse(this, width * 0.5, height - 30);
    this.add.existing(mouse);

    const body = mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);

    //Set mouse x velocity:
    body.setVelocityX(200);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

    this.cameras.main.startFollow(mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
  }

  update() {
    this.background.setTilePosition(this.cameras.main.scrollX);
  }

}
