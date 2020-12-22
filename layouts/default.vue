<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="#fff"
      collapse-on-scroll
      elevate-on-scroll
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} &nbsp; Matsui Hidetoshi</span>
    </v-footer>
    <scroll-button />
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import items from '~/data/items.json'
import ScrollButton from '~/components/ScrollButton.vue'

@Component({
  components: {
    ScrollButton
  },
  data () {
    return {
      items,
      clipped: true,
      drawer: false,
      fixed: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Matsui Hidetoshi'
    }
  }
})

export default class Default extends Vue { }
</script>
