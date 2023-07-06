import Phaser from "phaser";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";
import TextureKeys from "./consts/TextureKeys";
import Bear from "./game/Bear";
import Trou from "./game/Trou";
import Grotte from "./game/Grotte";
import sapin from "./game/sapin";
import essaim from "./game/essaim";

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private bear!: Bear;
  private trous!: Phaser.Physics.Arcade.Group;
  public score = 0;
  public scoreText;
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
    body.setVelocityX(200);

    this.trous = this.physics.add.group({
      classType: Trou
    });
    
    for (let i = 0; i < 6; i++) {
      const x = Phaser.Math.Between(200, 5360);
      const y = height;

      const trou = this.trous.get(x, y, 'platform');
      this.add.existing(trou);
      
      const bodyTrou = trou.body as Phaser.Physics.Arcade.Body;
      bodyTrou.setCollideWorldBounds(true);
      bodyTrou.updateFromGameObject();
    }

    this.sapins = this.physics.add.group({
      classType: sapin
    });

    for (let i = 0; i < 9; i++) {
      const x = Phaser.Math.Between(700, 5360);
      const y = height;
      
      const sapin = this.sapins.get(x, y, 'platform');
      this.add.existing(sapin);

      const bodySapin = sapin.body as Phaser.Physics.Arcade.Body;
      bodySapin.setCollideWorldBounds(true);
      bodySapin.updateFromGameObject();
    }

    this.physics.add.collider(this.trous, this.sapins);
    this.physics.add.collider(this.trous, this.trous)
    
    this.trous.children.iterate((trou: Trou) => {
      this.physics.add.collider(this.bear, trou, () => {
        this.bearDeath();
        this.bear.setPosition(0, 0);
      });
    });
    
    this.essaims = this.physics.add.group({
      classType: essaim
    })

    this.sapins.children.each((sapin:sapin) =>{
      const x = sapin.x;
      const y = sapin.y*0.4;
      
      const essaim = this.essaims.get(x, y, TextureKeys.Essaim);
      this.add.existing(essaim)
      
      const bodyEssaim = essaim.body as Phaser.Physics.Arcade.Body;
      bodyEssaim.setCollideWorldBounds(true);
      bodyEssaim.updateFromGameObject();
    })
    this.physics.add.collider(this.sapins, this.essaims)
    
    const grotte = new Grotte(this, 5740, height);
    this.add.existing(grotte);
    
    const bodyGrotte = grotte.body as Phaser.Physics.Arcade.Body;
    bodyGrotte.setCollideWorldBounds(true);
    bodyGrotte.updateFromGameObject();

    const style = {color: '#fff', fontsize: 48}
    this.scoreText = this.add.text(150, height*0.1, 'Score:' + this.score, style).setScrollFactor(0,0)
    
    this.physics.add.overlap(this.bear, this.essaims, this.handleEssaimCollision, null, this);
    this.physics.add.overlap(this.bear, grotte, this.gameWin, undefined, this);
    
    this.physics.world.setBounds(0, 0, 5760, height - 30);
    
    this.cameras.main.startFollow(this.bear);
    this.cameras.main.setBounds(0, 0, 5760, height);
  }

  update() {
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.scoreText.setText('Score:' + this.score)
  }

  bearDeath() {
    this.score=0;
    this.scene.restart();
  }

  gameWin() {
    this.add.image(5000, 200, TextureKeys.End);
  }

  handleEssaimCollision(bear, essaim) {
    // Incrémente le score
    this.score++;
  
    // Détruit l'essaim qui a été ramassé
    essaim.destroy();
  
    // Affiche le score mis à jour dans la console
    console.log("Score:", this.score);
  }
  
}
