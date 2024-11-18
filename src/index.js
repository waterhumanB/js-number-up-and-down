import startGame from "../view/startGame"

async function play() {
 // 게임 시작 설정 최대,최소,횟수
  const {min, max, payCount} = await startGame()

 // 게임 진행 업,다운

 // 게임 끝 or 다시 실행

}


play();