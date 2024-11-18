import readLineAsync from "./readLineAsync.js";
import { validateCount, validateMinMax } from "../domain/validation.js";

async function getMinMaxInput() {
  let inputValue
  let result

  while (!result){
    console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)")
    inputValue = await readLineAsync("숫자 입력: ");
    result = validateMinMax(inputValue)
    
    if (!result){
      console.log("잘못된 형식입니다! 게임 설정에 맞게 입력해주세요.")
    }
  }
  
  return result
}

async function getPlayCount() {
  let inputValue
  let result

  while (!result){
    console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요. (예: 5)")
    inputValue = await readLineAsync("숫자 입력: ");
    result = validateCount(inputValue)
    
    if (!result) {
      console.log("잘못된 입력입니다! 게임 설정에 맞게 입력해주세요.")
    }
  }

  return result
}


async function startGame() {
  const {min, max} = await getMinMaxInput() 
  const playCount = await getPlayCount()

  return {min, max, playCount}
}

export default startGame
