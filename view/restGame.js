import readLineAsync from "./readLineAsync.js";

async function restGame(callback) {
  const resetGame = await readLineAsync("게임을 다시 시작하시겠습니까? (yes/no): ");
  if(resetGame !== "yes" && resetGame !== "no") {
    console.log("yes 또는 no만 입력해주세요.")
    return await restGame()
  }
  if(resetGame == "yes") {
    return callback()
  }
}

export default restGame