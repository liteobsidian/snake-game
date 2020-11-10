<template lang="pug">
  div.wrapper
    q-card.full-height
      q-tabs.text-grey(
        v-model='tab'
        dense narrow-indicator
        active-color='primary'
        indicator-color='primary'
        align='justify'
      )
        q-tab(name='controls' label='Controls')
        q-tab(name='scores' label='Scores' v-if="allScores.length")
      q-separator
      q-tab-panels(v-model='tab' animated style="height: calc(100% - 37px);")
        q-tab-panel.controlsBar(name='controls')
          div
            .userName
              .text-h5.text-positive.margin(v-if="userName" ) {{userName}}
              .text-h5.text-warning.margin(v-else) Enter nickname
              q-btn.redact(round color="positive" icon="create" @click="rename")
            h4 Score: {{score}}
            .q-pa-md.q-gutter-sm.q-mb-none
              q-btn.full-width(push color="deep-orange" label="start" @click="startGame" v-if="(!isPlaying || gameOver) && !gamePaused")
              q-btn.full-width(push color="deep-orange" :label="pauseLabel" @click="toggleGame" v-else)
            h4 Settings
            .q-pa-md
              .text-subtitle1 Speed: {{currentSpeed}}
              q-slider(v-model="currentSpeed" @change="emitSpeed" :min="1" :max="20")
            .controls-container.text-center
              q-btn(padding="sm" size="xl" color="secondary" icon="arrow_drop_up" @click="buttonPressed(38)")
              br
              q-btn(padding="sm" size="xl" color="secondary" icon="arrow_left" @click="buttonPressed(37)")
              q-btn(padding="sm" size="xl" color="secondary" icon="arrow_drop_down" @click="buttonPressed(40)")
              q-btn(padding="sm"  size="xl" color="secondary" icon="arrow_right" @click="buttonPressed(39)")
        q-tab-panel(name='scores')
          q-table(:data='allScores' row-key='index' hide-bottom)

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RightBar',
  props: {
    score: {
      type: Number,
      default: 0
    },
    gamePaused: {
      type: Boolean,
      default: false
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    gameOver: {
      type: Boolean,
      default: false
    },
    userName: {
      type: String,
      default: 'noName'
    }
  },
  data () {
    return {
      currentSpeed: 5,
      tab: 'controls'
    }
  },
  computed: {
    ...mapGetters({ allScores: 'gameStore/getAllScores' }),
    pauseLabel () {
      return this.gamePaused ? 'play' : 'pause'
    }
  },
  methods: {
    emitSpeed () {
      this.$emit('fpsChange', this.currentSpeed)
    },
    buttonPressed (key) {
      this.$emit('buttonPressed', key)
    },
    startGame () {
      this.$emit('startGame')
    },
    toggleGame () {
      !this.gamePaused && this.$emit('pauseGame')
      this.gamePaused && this.$emit('playGame')
    },
    rename () {
      this.$emit('rename')
    }
  },
  created () {
    this.$emit('fpsChange', this.currentSpeed)
  }
}
</script>

<style lang="scss" scoped>
.userName {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.margin {
  margin-right: 10px;
}

.controlsBar {
  text-align: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  & h4 {
    margin: 0;
    padding: 0;
    font-weight: 400;
  }
}
</style>
