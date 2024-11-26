import readline from "readline";

export class GameView {
  async readLineAsync(query) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(query, (input) => {
        resolve(input);
        rl.close(); // 입력 후 바로 닫음
      });
    });
    }
  
  displayError (message) {
    return console.log(message)
  }

  async getGameConfigMinMax() {
    console.log("[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)")
    const minMaxValue = await this.readLineAsync("숫자 입력: ");
  
    return minMaxValue
  }

  async getGameConfigMaxAttempts() {
    console.log("[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요. (예: 5)")
    const maxAttempts = await this.readLineAsync("숫자 입력: ");
  
    return maxAttempts
  }

  async getGuess() {
    const countValue = await this.readLineAsync("숫자 입력: ");
  
    return Number(countValue) 
  }

  displayGameStart(min, max) {
    return console.log(`[게임시작] ${min}~${max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요!`);
  }

  displayResult(result, attempts, answer) {
    switch (result) {
      case 'UP':
        console.log('업');
        console.log('이전 추측:', attempts.join(', '));
        break;
      case 'DOWN':
        console.log('다운');
        console.log('이전 추측:', attempts.join(', '));
        break;
      case 'CORRECT':
        console.log(`정답!\n축하합니다! ${attempts.length}번 만에 맞추셨습니다.`);
        break;
      case 'EXCEEDED':
        console.log(`${attempts.length}회 초과! 숫자를 맞추지 못했습니다! (정답: ${answer})`);
        break;
    }
  }

  async askPlayAgain() {
    const resetGame = await this.readLineAsync("게임을 다시 시작하시겠습니까? (yes/no): ");
    if(resetGame !== "yes" && resetGame !== "no") {
      console.log("yes 또는 no만 입력해주세요.")
      return await this.askPlayAgain()
    }
    if(resetGame == "yes") {
      return resetGame
    }
  }
}

