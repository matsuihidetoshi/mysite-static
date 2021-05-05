<template>
  <v-btn
    v-if="position > 200"
    fab
    dark
    fixed
    bottom
    right
    color="primary"
    @click="$vuetify.goTo(0)"
  >
    <v-icon>
      {{ mdiAppleKeyboardControl }}
    </v-icon>
  </v-btn>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mdiAppleKeyboardControl } from '@mdi/js'

@Component
export default class ScrollButton extends Vue {
  position = 0
  mdiAppleKeyboardControl = mdiAppleKeyboardControl

  mounted () {
    window.addEventListener('scroll', this.onScroll)
  }

  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll () {
    this.position = window.scrollY
  }
}
</script>
