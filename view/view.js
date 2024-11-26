import readline from "readline";

export class GameView {
  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async readLineAsync(query) {
    return new Promise((resolve) => {
      this.readline.question(query, (input) => {
        resolve(input);
      });
    })
  }

  
  displayError (message) {
   return console.log(message)
  }

  async getGameConfig() {
    console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)")
    const minMaxValue = await this.readLineAsync("숫자 입력: ");
  
    return minMaxValue
  }

  async getGuess() {
    console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요. (예: 5)")
    const countValue = await this.readLineAsync("숫자 입력: ");
  
    return countValue 
  }

  displayGameStart(min, max) {
    return console.log(`[게임시작] ${min}~${max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요!`);
  }

  displayResult(result, attempts) {
    switch (result) {
      case 'UP':
        console.log('업');
        break;
      case 'DOWN':
        console.log('다운');
        break;
      case 'CORRECT':
        console.log(`정답!\n축하합니다! ${attempts.length}번 만에 맞추셨습니다.`);
        break;
      case 'EXCEEDED':
        console.log(`${attempts.length}회 초과! 숫자를 맞추지 못했습니다!`);
        break;
    }
    console.log('이전 추측:', attempts.join(', '));
  }

  endGame(attempts,maxAttempts,answer){
    if (attempts.length > maxAttempts){
      console.log(`${maxAttempts}회 초과! 숫자를 맞추지 못했습니다! (정답: ${answer})`)
    }
  }

  async askPlayAgain() {
    const resetGame = await this.readLineAsync("게임을 다시 시작하시겠습니까? (yes/no): ");
    if(resetGame !== "yes" && resetGame !== "no") {
      console.log("yes 또는 no만 입력해주세요.")
      return await this.askPlayAgain()
    }
    if(resetGame == "yes") {
      return await this.getGameConfig()
    }
  }

  close() {
    this.readline.close(); // 게임이 완전히 종료된 후 인터페이스 닫기
  }
}

