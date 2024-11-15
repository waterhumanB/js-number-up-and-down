import readline from "readline";

const RANDOM_NUMBER_RANGE = 50
const ANSWER_LIMIT = 6
const ARR_LAST_IDX = -1

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
  if(resetGame !== "yes" && resetGame !== "no") {
    console.log("yes 또는 no만 입력해주세요.")
    return await reset()
  }
  if(resetGame == "yes") {
    return callback()
  }
  return
}

// function validateInput(input, answer) {
//   return (
//     (!Number(input) && console.log("숫자만 입력해주세요!") && answer.pop()) ||
//     (input < 0 || input > RANDOM_NUMBER_RANGE && console.log("숫자는 1 ~ 50 까지만 입력해주세요.") && answer.pop()) ||
//     (answer.includes(input) && console.log("이미 추측한 숫자입니다! 다른 숫자를 입력해주세요.") && answer.pop()) ||
//     (input === "" && console.log("입력값이 비어있습니다. 숫자를 입력해주세요.") && answer.pop()) ||
//     (input === null || input === undefined && console.log("입력값이 올바르지 않습니다. 숫자를 입력해주세요.") && answer.pop())
//   );
// }

function validateInput(input, answer) {
  if (!Number(input)) {
    console.log("숫자만 입력해주세요!");
    return answer.pop(); 
  }
  if (input < 0 || input > RANDOM_NUMBER_RANGE) {
    console.log("숫자는 1 ~ 50 까지만 입력해주세요.");
    return answer.pop(); 
  }
  if (answer.includes(input)) {
    console.log("이미 추측한 숫자입니다! 다른 숫자를 입력해주세요.");
    return answer.pop(); 
  }
  if (input === "") {
    console.log("입력값이 비어있습니다. 숫자를 입력해주세요.");
    return answer.pop(); 
  }
  if (input === null || input === undefined) {
    console.log("입력값이 올바르지 않습니다. 숫자를 입력해주세요.");
    return answer.pop(); 
  }

  return 
}

async function evaluateGuess(answer, correctAnswer, inputValue, play) {
  const lastGuess = answer.at(ARR_LAST_IDX);

  if (lastGuess < correctAnswer && inputValue <= RANDOM_NUMBER_RANGE) {
    console.log("업");
    console.log("이전 추측:", ...answer);
  } 
  if (lastGuess > correctAnswer && inputValue <= RANDOM_NUMBER_RANGE) {
    console.log("다운");
    console.log("이전 추측:", ...answer);
  } 
  if (lastGuess === correctAnswer && inputValue <= RANDOM_NUMBER_RANGE) {
    console.log("정답!");
    console.log(`축하합니다! ${answer.length}번 만에 맞추셨습니다.`);
    return await reset(play);
  }
}

// 입출력 예시
async function play() {
	let answer = []
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
  const correctAnswer = Math.ceil(Math.random() *  RANDOM_NUMBER_RANGE)
  
  while ( answer.length < ANSWER_LIMIT){
    const inputValue = await readLineAsync("숫자 입력: ");
    answer.push(Number(inputValue))

    validateInput(inputValue,answer)
    
    evaluateGuess(answer,correctAnswer,inputValue,play)
  }

  if (answer.at(ARR_LAST_IDX) !== correctAnswer && answer.length === ANSWER_LIMIT ){
    console.log(`5회 초과! 숫자를 맞추지 못했습니다! (정답: ${correctAnswer})`)
    console.log("")
    return await reset(play)
  }
}


play();