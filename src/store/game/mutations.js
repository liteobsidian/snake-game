
export default {
  saveScore (state, score) {
    state.scores.push(score)
  },

  toggleGame (state, lastGame) {
    state.lastGame.finished = lastGame.finished
    state.lastGame.score = lastGame.score
  },

  gameWon (state, won) {
    state.gameWon = won
  },

  setDarkTheme (state, theme) {
    state.darkTheme = theme
  }
}
