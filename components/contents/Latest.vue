<template>
  <v-card
    class="
      mt-3
    "
  >
    <v-card-title
      class="font-weight-bold"
    >
      What's New
    </v-card-title>

    <v-row
      class="
        pr-4
        pl-4
      "
    >
      <v-col
        v-for="(content, index) in contents"
        :key="index"
        class="
          text-truncate
        "
        cols="12"
        sm="6"
        md="4"
      >
        <v-chip
          :color="content.color"
          outlined
          class="
            mr-1
            mb-1
            font-weight-bold
          "
          width="150"
          :to="content.dir"
        >
          <v-icon
            :color="content.color"
            class="mr-1"
          >
            {{ icons[items.find(item => item.link == content.dir).icon] }}
          </v-icon>
          {{ content.typeName }}
        </v-chip>

        <nuxt-link
          :to="content.path"
        >
          {{ content.title }}
        </nuxt-link>
      </v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import {
  mdiWrench,
  mdiCamera,
  mdiNewspaperVariantMultipleOutline
} from '@mdi/js'
import { items } from '../../data/items'

interface Content {
  dir: string
  typeName: string
  color: string
}

@Component
export default class Latest extends Vue {
  $content: any
  items = items
  contents = []

  icons = {
    mdiWrench,
    mdiCamera,
    mdiNewspaperVariantMultipleOutline
  }

  types = [
    {
      path: '/articles',
      name: '日記',
      color: 'pink lighten-1'
    },
    {
      path: '/media_coverages',
      name: 'メディア掲載',
      color: 'orange darken-1'
    },
    {
      path: '/works',
      name: '製作物',
      color: 'teal lighten-1'
    }
  ]

  mounted () {
    this.getLatestContents()
  }

  async getLatestContents () {
    const articles = await this.$content('articles').sortBy('date', 'desc').limit(1).fetch()
    const mediaCoverages = await this.$content('media_coverages').sortBy('date', 'desc').limit(1).fetch()
    const works = await this.$content('works').sortBy('date', 'desc').limit(1).fetch()
    this.contents = articles.concat(mediaCoverages).concat(works)
    this.contents.map((content: Content) => {
      content.typeName = this.types.find((contentType) => { return contentType.path === content.dir })?.name || ''
      content.color = this.types.find((contentType) => { return contentType.path === content.dir })?.color || ''
    })
  }
}
</script>
