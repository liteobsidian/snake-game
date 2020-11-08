export default {
  getAllScores: state => state.scores.concat().sort((scoreA, scoreB) => {
    return scoreB.score - scoreA.score
  }),

  getFinishedGame: state => {
    return {
      finished: state.lastGame.finished,
      score: state.lastGame.score
    }
  },

  getGameWon: state => state.gameWon
}
