
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


async function play() {
 // 게임 시작 설정 최대,최소,횟수

 // 게임 진행 업,다운

 // 게임 끝 or 다시 실행

}


play();