import readLineAsync from "./readLineAsync.js";


async function startGame() {
  console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)")
  const inputValue = await readLineAsync("숫자 입력: ");
  console.log(minMaxValue)
  const minValue = Number(inputValue.split(",")[0].trim())
  const maxValue = Number(inputValue.split(",")[1].trim())

  console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.")
  const playCount = await readLineAsync("숫자 입력: ");
  
  return { minValue,maxValue, playCount}
}

//export default startGame

startGame()