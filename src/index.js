import {evaluateGuess,validateMinMax,validateCount,validateInput} from "../domain/domain.js"
import getRandomValue from "../utils/getRandomValue.js"
import {getMinMaxInput, getPlayCount} from "../view/startGame.js"
import {evaluateGuessMSG, endGame, startGameMSG, playGameInput} from "../view/playGame.js"
import errorMSG from "../view/errorMSG.js"
import restGame from "../view/restGame.js"

async function startGame() {
  let minMaxInput
  let countInput
  let minMaxValue
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

  const {min, max} = validateMinMax(minMaxInput)
  const playCount = validateCount(countValue)  

  return {min, max, playCount}
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
 // 게임 시작 설정 최대,최소,횟수
  const {min, max, playCount} = await startGame()

 // 게임 진행 업,다운, 끝
  await playGame(min,max,playCount)

 // 게임 다시 실행
  await restGame(play)
}

play();
