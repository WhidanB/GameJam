import Phaser from "phaser";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";
import TextureKeys from "./consts/TextureKeys";
import Bear from "./game/Bear";
import Trou from "./game/Trou";
import Grotte from "./game/Grotte";

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private bear!: Bear;
  private trous!: Phaser.Physics.Arcade.Group;

  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.bear = new Bear(this, width * 0.15, height);
    this.add.existing(this.bear);

    const body = this.bear.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setVelocityX(600);

    this.trous = this.physics.add.group({
      classType: Trou
    });

    for (let i = 0; i < 9; i++) {
      const x = Phaser.Math.Between(200, 5360);
      const y = height;

      const trou = this.trous.get(x, y, 'platform');
      this.add.existing(trou);

      const bodyTrou = trou.body as Phaser.Physics.Arcade.Body;
      bodyTrou.setCollideWorldBounds(true);
      bodyTrou.updateFromGameObject();
    }

    this.physics.add.collider(this.trous, this.trous);

    this.trous.children.iterate((trou: Trou) => {
      this.physics.add.collider(this.bear, trou, () => {
        this.bearDeath();
        this.bear.setPosition(0, 0);
      });
    });

    const grotte = new Grotte(this, 5740, height);
    this.add.existing(grotte);

    const bodyGrotte = grotte.body as Phaser.Physics.Arcade.Body;
    bodyGrotte.setCollideWorldBounds(true);
    bodyGrotte.updateFromGameObject();

    this.physics.add.overlap(this.bear, grotte, this.gameWin, undefined, this);

    this.physics.world.setBounds(0, 0, 5760, height - 30);

    this.cameras.main.startFollow(this.bear);
    this.cameras.main.setBounds(0, 0, 5760, height);
  }

  update() {
    this.background.setTilePosition(this.cameras.main.scrollX);
  }

  bearDeath() {
    this.scene.restart();
  }

  gameWin() {
    this.add.image(5000, 200, TextureKeys.End);
  }
}
