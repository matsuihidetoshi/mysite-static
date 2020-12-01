<template>
  <v-card
    class="
      pl-5
      pr-5
    "
  >
    <v-card-title>
      What's new
    </v-card-title>

    <v-row>
      <v-col
        v-for="(content, index) in contents"
        :key="index"
        class="text-truncate"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          :color="content.color"
          class="
            ma-1
            white--text
            font-weight-bold
            text-center
          "
          width="120"
        >
          {{ content.typeName }}
        </v-card>

        <nuxt-link
          :to="content.path"
        >
          {{ content.title }}
        </nuxt-link>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  data () {
    return {
      contents: [],
      types: {
        '/articles': {
          name: '日記',
          color: 'pink lighten-1'
        },
        '/media_coverages': {
          name: 'メディア掲載',
          color: 'orange darken-1'
        },
        '/works': {
          name: '製作物',
          color: 'teal lighten-1'
        }
      }
    }
  },
  mounted () {
    this.getLatestContents()
  },
  methods: {
    async getLatestContents () {
      const articles = await this.$content('articles').sortBy('date', 'desc').limit(1).fetch()
      const mediaCoverages = await this.$content('media_coverages').sortBy('date', 'desc').limit(1).fetch()
      const works = await this.$content('works').sortBy('date', 'desc').limit(1).fetch()
      this.contents = articles.concat(mediaCoverages).concat(works)
      this.contents.map((content) => {
        content.typeName = this.types[content.dir].name
        content.color = this.types[content.dir].color
      })
    }
  }
})

export default class Latest extends Vue { }
</script>
