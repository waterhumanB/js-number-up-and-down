import readLineAsync from "./readLineAsync.js";

export async function getMinMaxInput() {
  console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)")
  const minMaxValue = await readLineAsync("숫자 입력: ");

  return minMaxValue
}

export async function getPlayCount() {
  console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요. (예: 5)")
  const countValue = await readLineAsync("숫자 입력: ");

  return countValue 
}


// async function startGame() {
//   const minMaxValue = await getMinMaxInput()

//   const {min, max} = validateMinMax(minMaxValue)

//   const countValue = await getPlayCount()

//   const playCount = validateCount(countValue)

//   return {min, max, playCount}
// }

// // export default startGame

// startGame()
