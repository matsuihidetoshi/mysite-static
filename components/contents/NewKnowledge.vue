<template>
  <v-card
    class="mx-auto mt-3"
    :to="content ? content.path : null"
  >
    <v-list-item
      v-if="content"
      three-line
    >
      <v-list-item-content>
        <div
          class="
            overline
            font-weight-bold
          "
        >
          新着の雑学
        </div>

        <v-list-item-title
          class="
            subheading
            font-weight-bold
            mb-1
          "
        >
          {{ content.title }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ new Date(content.date).toLocaleDateString() + " -" }}
          {{ content.description }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
      >
        <v-img
          :src="content.image"
        />
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NewKnowledge extends Vue {
  $content: any
  content = null

  beforeMount () {
    this.getLatestContents()
  }

  async getLatestContents () {
    const knowledges = await this.$content('knowledges').sortBy('date', 'desc').limit(1).fetch()
    this.content = knowledges[0]
  }
}
</script>
