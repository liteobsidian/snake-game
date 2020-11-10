<template lang="pug">
  q-layout(view="hHh lpR lfr")
    q-header.bg-positive.text-white(elevated)
      q-toolbar
        q-toolbar-title
          q-avatar.shadow-4.q-mx-md.q-my-sm
            img(src="https://image.flaticon.com/icons/png/128/3159/3159052.png")
          | Snake game
        q-toggle(
          :label="theme"
          color="black"
          false-value="Light Theme"
          true-value="Dark Theme"
          v-model="theme"
          @input="changeTheme"
          )
    q-page-container
      router-view
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
      theme: 'Light Theme'
    }
  },
  methods: {
    ...mapActions({ setTheme: 'gameStore/setDarkTheme' }),
    changeTheme () {
      this.theme === 'Dark Theme' ? this.setTheme(true) : this.setTheme(false)
    }
  }
}
</script>
