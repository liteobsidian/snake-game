export default {
  saveScore ({ commit }, score) {
    commit('saveScore', score)
  },

  toggleGame ({ commit }, lastGame) {
    commit('toggleGame', lastGame)
  },

  gameWon ({ commit }, won) {
    commit('gameWon', won)
  }
}
