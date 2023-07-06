import Phaser from "phaser";

import Game from "./Game";
import Preloader from "./Preloader";
import SceneKeys from "./consts/SceneKeys";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1600,
  height: 768,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: true,
    },
  },
  scene: [Preloader, Game],
};

export default new Phaser.Game(config);
