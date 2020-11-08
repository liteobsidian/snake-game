<template lang="pug">
  q-layout(view="hHh lpR lfr")
    q-header(elevated class="bg-positive text-white")
      q-toolbar
        q-toolbar-title
          q-avatar.shadow-4(class="q-mx-md q-my-sm")
            img(src="https://image.flaticon.com/icons/png/128/3159/3159052.png")
          | Snake game
    q-page-container
      router-view
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      right: true
    }
  }
}
</script>
