import { GameModel } from "../models/model.js";
import { GameView } from "../view/view.js";

class GameController {
  constructor(view) {
    this.view = view;
    this.game = null;
  }

  async start() {
    const input = await this.view.getGameConfig();
    const config = this.view.validateMinMax(input)
    if (config === null) {
      this.view.displayError("잘못된 입력입니다. 최소값과 최대값을 올바르게 입력하세요.")
    }

    this.game = new GameModel(config.min, config.max, config.maxAttempts);
    this.view.displayGameStart(this.game.min, this.game.max);
    
    await this.playGame();
  }

  async playGame() {
    while (this.game.status === 'PLAYING') {
      const guess = await this.view.getGuess();
      const result = this.game.makeGuess(guess);
      
      if (!result) {
        this.view.displayError("잘못된 입력입니다! 게임 설정에 맞게 입력해주세요.");
        continue;
      }

      this.view.displayResult(result);
    }

    const playAgain = await this.view.askPlayAgain();
    if (playAgain) {
      await this.start();
    }
  }
}

(async () => {
  const game = new GameController(new GameView())
  await game.start()
})();
