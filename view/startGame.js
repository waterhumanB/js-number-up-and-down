import readLineAsync from "./readLineAsync.js";

async function getMinMaxInput() {
  let isValid = false
  let inputValue

  while (!isValid){
    console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)")
    inputValue = await readLineAsync("숫자 입력: ");
    const parts = inputValue.split(",")
    console.log(parts)

    if (parts.length === 2 && parts.every((part) => part !== "" && Number(part)) && Number(parts[0]) < Number(parts[1])){
      console.log(inputValue)
      isValid = true
    } 

    if (isValid === false){
      console.log("잘못된 형식입니다! 게임 설정에 맞게 입력해주세요.")
    }
  }
  
  const minValue = Number(inputValue.split(",")[0]?.trim())
  const maxValue = Number(inputValue.split(",")[1]?.trim())

  return { minValue, maxValue}
}

async function getPlayCount() {
  let isValid = false
  let inputValue

  while (!isValid){
    console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요. (예: 5)")
    inputValue = await readLineAsync("숫자 입력: ");

    if ( inputValue !== "" && Number(inputValue) > 0 && !isNaN(inputValue) ){
      console.log(inputValue)
      isValid = true
    }

    if (isValid === false) {
      console.log("잘못된 입력입니다! 게임 설정에 맞게 입력해주세요.")
    }

    return inputValue
  }

  return inputValue
}


async function startGame() {
  const {min, max} = await getMinMaxInput() 
  const playCount = await getPlayCount()

  return {min, max, playCount}
}

// export default startGame

startGame()