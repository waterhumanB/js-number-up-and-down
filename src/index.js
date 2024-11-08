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

// 입출력 예시
async function play() {
	console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
  const answer = Math.ceil(Math.random() * 50)
  const inputValue = await readLineAsync("숫자 입력: ");
  
}

play();