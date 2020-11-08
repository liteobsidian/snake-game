
export default {
  saveScore (state, score) {
    if (score.score > state.maxScore) {
      state.maxScore = score.score
    }
    state.scores.push(score)
    console.log(score.score)
  },

  setMaxScore (state, score) {
    state.maxScore = score
  },

  toggleGame (state, lastGame) {
    state.lastGame.finished = lastGame.finished
    state.lastGame.score = lastGame.score
  },

  gameWon (state, won) {
    state.gameWon = won
  }
}
