import readLineAsync from "./readLineAsync.js";
import getRandomValue from "../domain/getRandomValue.js";
import { validateInput } from "../domain/validation.js";

async function playGame(min,max,count) {
	let answer = []
  let result
  console.log(`[게임시작] ${min}~${max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요!`);

  while ( answer.length < count){
    const inputValue = await readLineAsync("숫자 입력: ");
    const randomValue = getRandomValue(min,max)
    result = validateInput(inputValue,randomValue,answer)

    if(!result){
      console.log("잘못된 입력입니다! 게임 설정에 맞게 입력해주세요.")
      answer.pop()
    }

    if(result !== null) {
      answer.push(result)
    }
  }
  
  return answer
}

export default playGame
