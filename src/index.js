import startGame from "../view/startGame.js"
import playGame from "../view/playGame.js"
import restGame from "../view/restGame.js"

async function play() {
 // 게임 시작 설정 최대,최소,횟수
  const {min, max, playCount} = await startGame()

 // 게임 진행 업,다운, 끝
  await playGame(min,max,playCount)

 // 게임 다시 실행
  await restGame(play)
}

play();