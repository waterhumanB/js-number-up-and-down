import { GameModel } from "../models/model.js";
import { GameView } from "../view/view.js";
import { ERROR } from "../constants/constants.js"

class GameController {
  constructor(view) {
    this.view = view;
    this.game = null;
  }

  async addStartEvent() {
    let minMaxValue
    let maxAttemptsValue

    this.view.clickButton("start", () => {
      const inputMin = this.view.getInputValue("min")
      const inputMax = this.view.getInputValue("max")
      const inputMinMax = inputMin + "," + inputMax
      minMaxValue = GameModel.validateMinMax(inputMinMax)
  
      const inputMaxAttempts = this.view.getInputValue("attempt")
      maxAttemptsValue = GameModel.validateAttempt(inputMaxAttempts)

      if (minMaxValue === ERROR) {
        this.view.displayError("잘못된 입력입니다. 최소값과 최대값을 올바르게 입력하세요.")
        this.view.clearInput("min")
        this.view.clearInput("max")
        return
      }

      if (maxAttemptsValue === ERROR) {
        this.view.displayError("잘못된 입력입니다. 시도할 횟수를 올바르게 입력하세요.")
        this.view.clearInput("attempt")
        return
      }

      this.game = new GameModel(minMaxValue.min, minMaxValue.max, maxAttemptsValue);
      this.view.createElement("display","displayMsg",`[게임시작] ${minMaxValue.min}~${minMaxValue.max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요!`)
      
      return this.addPlayEvent()
    })
  }

  addPlayEvent() {
      this.view.clickButton("play",() => {
        const guess = this.view.getInputValue("guess");      
        const result = this.game.validateInput(guess)
        
        if (result === ERROR) {
          return this.view.displayError("잘못된 입력입니다! 게임 설정에 맞게 입력해주세요.");
        }
  
        this.game.attempts.push(guess)
        const displayResult = this.game.makeGuess(result)
        const displayMsg = this.view.displayResult(displayResult, this.game.attempts, this.game.answer)
        this.view.createElement("display","displayMsg",displayMsg)

        if (displayResult === "CORRECT") {
          this.game.status = "WON"
        }
  
        if (displayResult === "EXCEEDED") {
          this.game.status = "LOST"
        }

        if (this.game.status !== "PLAYING") {
          this.view.createElement("display","displayMsg","게임이 끝났습니다. 다시 시작하려면 메인 화면으로 돌아가주세요!")
        }
    })
  }
  addResetEvent() {

  }
}

( () => {
  const game = new GameController(new GameView())
  game.addStartEvent()
})();
