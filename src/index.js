import readline from "readline";

function readLineAsync(query) {
    // 내부 로직 구현
     // readline 인터페이스 생성
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // 사용자 입력을 Promise로 반환
  return new Promise((resolve) => {
    rl.question(query, (input) => {
      resolve(input);
      rl.close();
    });
  });
}

async function reset(callback) {
  const resetGame = await readLineAsync("게임을 다시 시작하시겠습니까? (yes/no): ");
  if(resetGame != "yes" && resetGame != "no") {
    console.log("yes 또는 no만 입력해주세요.")
    return await reset()
  }
  if(resetGame == "yes") {
    return callback()
  }
  return
}

// 입출력 예시
async function play() {
	let answer = []
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
  const correctAnswer = Math.ceil(Math.random() * 50)
  
  while ( answer.length < 6){
    const inputValue = await readLineAsync("숫자 입력: ");
    answer.push(inputValue)

    if (inputValue > 50) {
      console.log("숫자는 1 ~ 50 까지만 입력해주세요.")
      answer.pop()
    }
    if(answer[answer.length-1] < correctAnswer && inputValue <= 50)
    {
      console.log("업")
      console.log("이전 추축:", ...answer)
      console.log("")
    }
    if(answer[answer.length-1]  > correctAnswer && inputValue <= 50)
    {
      console.log("다운")
      console.log("이전 추축:", ...answer)
      console.log("")
    }
    if(answer[answer.length-1] == correctAnswer && inputValue <= 50 )
    {
      console.log("정답!")
      console.log(`축하합니다! ${answer.length}번 만에 맞추셨습니다.`)
      console.log("")
      return await reset(play)
    }
  }

  if(answer.length > 5 ){
    console.log(`5회 초과! 숫자를 맞추지 못했습니다! (정답: ${correctAnswer})`)
    console.log("")
    return await reset(play)
  }
}

play();