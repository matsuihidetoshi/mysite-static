<template>
  <v-card
    class="mt-2"
    :to="content ? content.path : null"
  >
    <v-row>
      <v-col
        cols="4"
        sm="3"
        md="2"
      >
        <v-avatar
          rounded
          class="ml-3"
          size="100"
        >
          <v-img :src="content ? content.image : null" />
        </v-avatar>
      </v-col>

      <v-col
        cols="8"
        sm="9"
        md="10"
      >
        <v-card-title
          class="font-weight-bold"
        >
          新着の雑学
        </v-card-title>
        <v-card-text>
          {{ content ? content.title : null }}
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  data () {
    return {
      content: null
    }
  },
  beforeMount () {
    this.getLatestContents()
  },
  methods: {
    async getLatestContents () {
      const knowledges = await this.$content('knowledges').sortBy('date', 'desc').limit(1).fetch()
      this.content = knowledges[0]
    }
  }
})

export default class NewKnowledge extends Vue { }
</script>
