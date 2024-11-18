import readLineAsync from "./readLineAsync.js";
import getRandomValue from "../domain/getRandomValue.js";
import { validateInput } from "../domain/validation.js";

const ARR_LAST_IDX = -1

function evaluateGuess(answer, randomNum, inputValue, max) {
  const lastGuess = answer.at(ARR_LAST_IDX);

  if (lastGuess < randomNum && inputValue <= max) {
    console.log("업");
    console.log("이전 추측:", ...answer);
  } 
  if (lastGuess > randomNum && inputValue <= max) {
    console.log("다운");
    console.log("이전 추측:", ...answer);
  } 
  if (lastGuess === randomNum && inputValue <= max) {
    console.log("정답!");
    console.log(`축하합니다! ${answer.length}번 만에 맞추셨습니다.`);
    return true
  }
}

function endGame(answer,count,randomValue){
  if (answer.length > count){
    console.log(`${count}회 초과! 숫자를 맞추지 못했습니다! (정답: ${randomValue})`)
  }
}

async function playGame(min,max,count) {
  const randomValue = getRandomValue(min,max)
	let answer = []
  let result
  
  console.log(`[게임시작] ${min}~${max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요!`);

  while ( answer.length <= count){
    const inputValue = await readLineAsync("숫자 입력: ");  
    result = validateInput(inputValue,randomValue,answer,max)

    if(result === null){
      console.log("잘못된 입력입니다! 게임 설정에 맞게 입력해주세요.")
      answer.pop()
    }
    if(result !== null) {
      answer.push(result)
    }
    if(evaluateGuess(answer,randomValue ,inputValue,max)) {
      break
    }
    if(endGame(answer,count,randomValue)) {
      break
    }
  }
  
  return
}

export default playGame

