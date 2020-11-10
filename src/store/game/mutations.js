
export default {
  saveScore (state, score) {
    state.scores.push(score)
  },

  toggleGame (state, lastGame) {
    state.lastGame = lastGame
  },

  gameWon (state, won) {
    state.gameWon = won
  },

  setDarkTheme (state, theme) {
    state.darkTheme = theme
  }
}
