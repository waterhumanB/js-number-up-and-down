import {evaluateGuess,validateMinMax,validateCount,validateInput} from "../domain/domain.js"
import getRandomValue from "../utils/getRandomValue.js"
import {getMinMaxInput, getPlayCount} from "../view/startGame.js"
import {evaluateGuessMSG, endGame, startGameMSG, playGameInput} from "../view/playGame.js"
import errorMSG from "../view/errorMSG.js"
import restGame from "../view/restGame.js"

async function startGame() {
  let minMaxInput
  let minMaxValue
  let countInput
  let countValue

  while(!minMaxValue) {
    minMaxInput = await getMinMaxInput()
    minMaxValue = validateMinMax(minMaxInput)
    errorMSG(minMaxValue)
  }
  
  while(!countValue) {
    countInput = await getPlayCount()
    countValue = validateCount(countInput)  
    errorMSG(countValue)
  }

  return {
    min: minMaxValue.min,
    max: minMaxValue.max, 
    playCount: countValue
  }
}

async function playGame(min,max,count) {
  const randomValue = getRandomValue(min,max)
	let answer = []
  let result
  
  startGameMSG(min,max)

  while ( answer.length <= count){
    const inputValue = await playGameInput()
    result = validateInput(inputValue,answer,max)
    
    errorMSG(result)
    
    if(result !== null) {
      answer.push(result)
    }
    
    if(evaluateGuessMSG(evaluateGuess(answer,randomValue ,inputValue,max),answer)){
      break
    }

    if(endGame(answer,count,randomValue)) {
      break
    }
  }
  
  return
}

async function play() {
  const {min, max, playCount} = await startGame()

  await playGame(min,max,playCount)

  await restGame(play)
}

play();

class GameController {
  constructor(view) {
    this.view = view;
    this.game = null;
  }

  async start() {
    const config = await this.view.getGameConfig();
    if (!config) return;

    this.game = new Game(config.min, config.max, config.maxAttempts);
    this.view.displayGameStart(this.game.min, this.game.max);
    
    await this.playGame();
  }

  async playGame() {
    while (this.game.status === 'PLAYING') {
      const guess = await this.view.getGuess();
      const result = this.game.makeGuess(guess);
      
      if (!result) {
        this.view.displayError('Invalid input');
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
