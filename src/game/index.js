import React from "react";
import { GameEngine } from "react-game-engine";
import Renderer from "./graphics/renderer";
import Systems from "./systems";
import Loader from "./levels/loader";
import Level1 from "./levels/level-01";
import "../index.css";

class Game extends React.Component {
  render() {
    return (
      <GameEngine
        className="game"
        systems={Systems}
        entities={Loader(Level1)}
        renderer={Renderer()}
      />
    );
  }
}

export default Game;
