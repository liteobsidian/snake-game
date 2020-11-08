<template lang="pug">
  q-card(class="q-pa-md text-center row")
    .col-8
      div.row.full-height.flex.flex-center.items-center
        div(id="gameContainer")
        q-card(class="my-card")
    right-bar(
      class="col"
      @fpsChange="changeFps"
      @buttonPressed="buttonPressed"
      @startGame="startGame"
      @pauseGame="pauseGame"
      @playGame="playGame"
      :score="score"
      :gamePaused="gamePaused"
      )
</template>

<script>
import Logic from './snakeLogic'
import RightBar from './RightBar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'game',
  components: { RightBar },
  data () {
    return {
      fps: 0,
      game: null,
      isPlaying: false,
      gameStarted: false,
      gamePaused: false,
      isLeftButtonPressed: false,
      isUpButtonPressed: false,
      isRightButtonPressed: false,
      isDownButtonPressed: false
    }
  },
  computed: {
    ...mapGetters({ getFinishedGame: 'gameStore/getFinishedGame', getGameWon: 'gameStore/getGameWon' }),
    score () {
      return this.game ? this.game.score : 0
    },
    lastGame () {
      return {
        finished: this.getFinishedGame.finished,
        lastScore: this.getFinishedGame.score
      }
    }
    // gameWon () {
    //   return this.getGameWon
    // }
  },
  methods: {
    ...mapActions({ toggleGame: 'gameStore/toggleGame', gameWon: 'gameStore/gameWon' }),
    changeFps (fps) {
      this.fps = fps
    },
    startGame () {
      this.removeOldGame()
      this.game = new Logic(12, 12, 35, this.$data.fps)

      this.gameStarted = true
      this.isPlaying = true
      this.gamePaused = false

      this.toggleGame({ finished: false, score: 0 })
      this.gameWon(false)
    },
    pauseGame () {
      if (this.game) {
        this.isPlaying = this.game.finishLoop()
        this.gamePaused = true
      }
    },
    playGame () {
      if (this.game) {
        this.isPlaying = this.game.startLoop()
        this.gamePaused = false
      }
    },
    buttonPressed (key) {
      this.gameStarted && this.game.snake.controller(key)
    },
    removeOldGame () {
      if (this.game) {
        const stage = this.game.stage
        console.log(stage)
        while (stage.hasChildNodes()) {
          stage.removeChild(stage.lastChild)
        }
      }
    }
  },
  created () {
    window.addEventListener('keydown', (e) => {
      this.buttonPressed(e.keyCode)
    })
  }
}
</script>

<style lang="scss">
#gameContainer {
  position: relative;

  .cell {
    position: absolute;
    transition: all 0.1s;
    background-color: #e7e7e7;
    //border: 1px solid black;
    &.filled {
      background: center / contain url("../assets/pages-black-18dp.svg");
      //transform: scale(1);

      &.food {
        background: center / contain url("../assets/strawberry_astonished_icon_152120.svg") !important;
        //transform: scale(1);
      }

      &.head {
        background: center / contain url("../assets/snorlax_icon-icons.com_67505.svg") !important;
        //transform: scale(1);
      }
    }

    &.empty {
    }
  }

  .back-cell {
    @extend .cell;
  }
}
</style>
