<template lang="pug">
  div.wrapper.customBar
    h4.q-pa-md.q-my-sm.text-center Score: {{score}}
    .q-pa-md.q-gutter-sm.q-mb-none
      q-btn.full-width(push color="deep-orange" label="start" @click="startGame")
      br
      q-btn.full-width(push color="deep-orange" :label="pauseLabel" @click="toggleGame")
    h4.q-pa-md.q-ma-none.text-center Settings
    .q-pa-md
      .text-subtitle1 Speed: {{currentSpeed}}
      q-slider(v-model="currentSpeed" @change="emitSpeed" :min="1" :max="20")
    .controls-container.text-center
      q-btn(padding="sm" size="xl" color="secondary" icon="arrow_drop_up" @click="buttonPressed(38)")
      br
      q-btn(padding="sm" size="xl" color="secondary" icon="arrow_left" @click="buttonPressed(37)")
      q-btn(padding="sm" size="xl" color="secondary" icon="arrow_drop_down" @click="buttonPressed(40)")
      q-btn(padding="sm"  size="xl" color="secondary" icon="arrow_right" @click="buttonPressed(39)")
</template>

<script>
export default {
  name: 'RightBar',
  props: {
    score: Number,
    gamePaused: Boolean
  },
  data () {
    return {
      currentSpeed: 5
    }
  },
  computed: {
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
    }
  },
  created () {
    this.$emit('fpsChange', this.currentSpeed)
  }
}
</script>

<style lang="scss" scoped>
.customBar {
  border-left: 3px inset;
}
</style>
