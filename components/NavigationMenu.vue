<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.link"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>{{ icons[item.icon] }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import {
  mdiApps,
  mdiInformationOutline,
  mdiWrench,
  mdiCamera,
  mdiNewspaperVariantMultipleOutline,
  mdiLightbulbOutline,
  mdiCommentTextOutline
} from '@mdi/js'
import items from '../data/items'

@Component
export default class NavigationMenu extends Vue {
  items = items
  icons = {
    mdiApps,
    mdiInformationOutline,
    mdiWrench,
    mdiCamera,
    mdiNewspaperVariantMultipleOutline,
    mdiLightbulbOutline,
    mdiCommentTextOutline
  }
}
</script>
