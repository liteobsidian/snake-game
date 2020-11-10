<template lang="pug">
  q-card(class="q-pa-md text-center row gamePageWrapper")
    q-dialog(v-model='prompt' persistent='')
      q-card(style='min-width: 350px')
        q-card-section
          .text-h6 Enter your Name!
        q-card-section.q-pt-none
          q-input(
            dense=''
            v-model='userName'
            autofocus=''
            @keyup.enter='closeDialog'
            :rules="[val => !!val || 'Field is required']"
            )
        q-card-actions.text-primary(align='right')
          q-btn(flat label='Cancel' v-close-popup)
          q-btn(flat label='Save name' @click="closeDialog")
    .col-8
      div.row.full-height.flex.flex-center.items-center.relative-position(ref="gameParent")
        div(id="gameContainer")
        q-card.absolute-full.welcomeScreen(v-if="!game")
          h2.text-primary Welcome
          h2.text-positive to
          h2.text-deep-orange Snake-game
        q-card(
            class="absolute-center flex flex-center items-center q-animate--fade moduleScreen"
            v-if="gamePaused"
            :style="gameSize"
          )
          h2 PAUSE
        q-card.column(
          class="absolute-center flex flex-center items-center q-animate--fade moduleScreen"
          v-if="gameWonValue"
          :style="gameSize"
        )
          h2 YOU WIN!!!
          h3 your score: {{score}}
        q-card(
          class="absolute-center flex column flex-center items-center q-animate--fade moduleScreen"
          v-if="lastGame.finished"
          :style="gameSize"
        )
          h2 GAME OVER
          h3 your score: {{score}}
    right-bar.q-ml-md(
      class="col"
      @fpsChange="changeFps"
      @buttonPressed="buttonPressed"
      @startGame="preStart"
      @pauseGame="pauseGame"
      @playGame="playGame"
      @rename="rename"
      :score="score"
      :gamePaused="gamePaused"
      :isPlaying="isPlaying"
      :gameOver="lastGame.finished"
      :userName="userName"
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
      userName: null,
      prompt: false,
      isRename: false
    }
  },
  computed: {
    ...mapGetters({
      getFinishedGame: 'gameStore/getFinishedGame',
      getGameWon: 'gameStore/getGameWon',
      isDarkTheme: 'gameStore/isDarkTheme'
    }),
    score () {
      return this.game ? this.game.score : 0
    },
    lastGame () {
      return {
        finished: this.getFinishedGame.finished,
        lastScore: this.getFinishedGame.score
      }
    },
    gameWonValue () {
      return this.getGameWon
    },
    gameCellSize () {
      const h = this.$refs.gameParent.clientHeight
      const w = this.$refs.gameParent.clientWidth
      return (h <= w ? h : w) / 12
    },
    gameSize () {
      const size = this.gameCellSize * 12
      return `width: ${size}px; height: ${size}px;`
    }
  },
  watch: {
    isDarkTheme: function (newValue) {
      this.$q.dark.set(newValue)
    }
  },
  methods: {
    ...mapActions({ toggleGame: 'gameStore/toggleGame', gameWon: 'gameStore/gameWon' }),
    changeFps (fps) {
      this.fps = fps
    },
    closeDialog () {
      if (this.userName) {
        this.prompt = false
        !this.isRename && this.startGame()
      }
    },
    rename () {
      this.isRename = true
      this.prompt = true
    },
    preStart () {
      this.userName && this.startGame()
      if (!this.userName) { this.prompt = true }
    },
    startGame () {
      this.removeOldGame()
      this.game = new Logic(12, 12, this.gameCellSize, this.$data.fps, this.$data.userName)

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
.gamePageWrapper {
  height: calc(100vh - 86px);
}
#gameContainer {
  position: relative;
  background: #e7e7e7;

  .cell {
    position: absolute;
    transition: all 0.1s;
    background-color: #e7e7e7;
    //border: 1px solid black;
    &.filled {
      background: center / contain url("../assets/chrome_logo_browser_icon_124322.svg");
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
.welcomeScreen{
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  background-color: #f6ffa7;
  & h2 {
    padding: 0;
    margin: 0;
    font-weight: 700;
  }
}
.moduleScreen {
  background: rgba(66, 141, 93, 0.8);
  font-weight: 700;
  color: #fff;
  & h2 {
    font-weight: 700;
  }
}
</style>
