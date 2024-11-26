import { GameModel } from "../models/model.js";
import { GameView } from "../view/view.js";

class GameController {
  constructor(view) {
    this.view = view;
    this.game = null;
  }

  async start() {
    let minMaxValue
    let maxAttemptsValue

    while (!minMaxValue) {
      const inputMinMax = await this.view.getGameConfigMinMax();
      
      minMaxValue = GameModel.validateMinMax(inputMinMax)
      if(minMaxValue === null) {
        this.view.displayError("잘못된 입력입니다. 최소값과 최대값을 올바르게 입력하세요.")
      }
    }

    while(!maxAttemptsValue){
      const inputMaxAttempts = await this.view.getGameConfigMaxAttempts()
      maxAttemptsValue = GameModel.validateAttempt(inputMaxAttempts)
  
      if(maxAttemptsValue === null) {
        this.view.displayError("잘못된 입력입니다. 시도할 횟수를 올바르게 입력하세요.")
      }
    }

    this.game = new GameModel(minMaxValue.min, minMaxValue.max, maxAttemptsValue);
    this.view.displayGameStart(this.game.min, this.game.max);
    console.log("정답",this.game.answer)
    
    await this.playGame();
  }

  async playGame() {
    while (this.game.status === 'PLAYING') {
      const guess = await this.view.getGuess();      
      const result = this.game.validateInput(guess)
      
      if (result === null) {
        this.view.displayError("잘못된 입력입니다! 게임 설정에 맞게 입력해주세요.");
        continue;
      }

      this.game.attempts.push(guess)

      const displayResult = this.game.makeGuess(result)
      this.view.displayResult(displayResult, this.game.attempts, this.game.answer)

      console.log("Display",displayResult)
      
      if (displayResult === "CORRECT"){
        this.game.status = "WON"
      }

      if (displayResult === "EXCEEDED"){
        this.game.status = "LOST"
      }
    }

    const playAgain = await this.view.askPlayAgain();
    if (playAgain === "yes") {
      await this.start();
    }
  }
}

(async () => {
  const game = new GameController(new GameView())
  await game.start()
})();
