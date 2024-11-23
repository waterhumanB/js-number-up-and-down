import readLineAsync from "./readLineAsync.js";

export function evaluateGuessMSG(value,answer) {
  if (value === "UP") {
    return console.log("업");
  }
  if (value === "DOWN") {
    return console.log("다운");
  }
  if (value === "CORRECT") {
    console.log(`정답! \n 축하합니다! ${answer.length}번 만에 맞추셨습니다. `);
    return  true
  }
}

export function endGame(answer,count,randomValue){
  if (answer.length > count){
    console.log(`${count}회 초과! 숫자를 맞추지 못했습니다! (정답: ${randomValue})`)
  }
}

export function startGameMSG(min,max) {
  return console.log(`[게임시작] ${min}~${max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요!`);
}

export async function playGameInput() {
  const inputValue = await readLineAsync("숫자 입력: ");

  return inputValue
}

// async function playGame(min,max,count) {
//   const randomValue = getRandomValue(min,max)
// 	let answer = []
//   let result
  
//   evaluateGuessMSG(min,max)

//   while ( answer.length <= count){
//     const inputValue = await playGameInput();  
//     result = validateInput(inputValue,answer,max)

//     if(result === null){
//       console.log("잘못된 입력입니다! 게임 설정에 맞게 입력해주세요.")
//       answer.pop()
//     }
//     if(result !== null) {
//       answer.push(result)
//     }
//     if(evaluateGuess(answer,randomValue ,inputValue,max)) {
//       break
//     }
//     if(endGame(answer,count,randomValue)) {
//       break
//     }
//   }
  
//   return
// }

// export default playGame

