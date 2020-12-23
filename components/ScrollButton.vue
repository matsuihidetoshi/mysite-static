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
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { mdiAppleKeyboardControl } from '@mdi/js'

@Component({
  data () {
    return {
      position: 0,
      mdiAppleKeyboardControl
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      this.position = window.scrollY
    }
  }
})

export default class ScrollButton extends Vue { }
</script>
