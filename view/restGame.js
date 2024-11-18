async function restGame(answers, count) {
  if (answer.at(ARR_LAST_IDX) !== correctAnswer && answer.length === ANSWER_LIMIT ){
    console.log(`${count}회 초과! 숫자를 맞추지 못했습니다! (정답: ${correctAnswer})`)
    console.log("")
    return await reset(play)
  }
}