import readLineAsync from "./readLineAsync.js";

export function evaluateGuessMSG(value,answer) {
  if (value === "UP") {
    return console.log("업");
  }
  if (value === "DOWN") {
    return console.log("다운");
  }
  if (value === "CORRECT") {
    console.log(`정답! \n축하합니다! ${answer.length}번 만에 맞추셨습니다. `);
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
