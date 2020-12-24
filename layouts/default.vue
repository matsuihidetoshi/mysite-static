<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <navigation-menu />
    </v-navigation-drawer>

    <v-app-bar
      color="#fff"
      collapse-on-scroll
      elevate-on-scroll
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>
          {{ mdiHamburger }}
        </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} &nbsp; Matsui Hidetoshi</span>
    </v-footer>
    <scroll-button />
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { mdiHamburger } from '@mdi/js'
import ScrollButton from '~/components/ScrollButton.vue'
import NavigationMenu from '~/components/NavigationMenu.vue'

@Component({
  components: {
    ScrollButton,
    NavigationMenu
  },
  data () {
    return {
      mdiHamburger,
      drawer: false,
      title: 'Matsui Hidetoshi'
    }
  }
})

export default class Default extends Vue { }
</script>
