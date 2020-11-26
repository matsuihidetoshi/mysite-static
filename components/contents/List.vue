<template>
  <div>
    <h1
      class="
        text-center
        ma-2
      "
    >
      <emerge-text :message="title" />
    </h1>

    <div
      class="
        d-flex
        justify-space-between
        mb-3
      "
    >
      <v-btn
        v-for="(tag, index) in tags"
        :key="index"
        :color="'#' + tag.color"
        class="
          white--text
          font-weight-bold
        "
      >
        {{ tag.name }}
      </v-btn>
    </div>

    <v-pagination
      v-model="page"
      :length="pageLength"
      @input="getContentList()"
    />

    <v-row
      v-if="contents.length > 0"
    >
      <v-col
        v-for="(content, index) in contents"
        :key="index"
        xs="12"
        sm="6"
        md="4"
        class="pa-3"
      >
        <nuxt-link
          :to="content.path"
        >
          <v-card
            v-ripple
          >
            <v-img
              :src="content.image"
              height="120"
            />

            <v-card-title
              class="
                text-truncate
                ml-2
              "
            >
              <emerge-text :message="$truncate(content.title, 12)" />
            </v-card-title>

            <v-card-text
              class="ml-2"
            >
              <emerge-text :message="new Date(content.date).toLocaleDateString()" />
            </v-card-text>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>

    <v-row
      v-else
    >
      <v-col
        class="pa-3"
      >
        <v-card>
          <v-card-title>
            <emerge-text message="No posts yet." />
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-model="page"
      :length="pageLength"
      @input="getContentList()"
    />

    <v-row>
      <v-spacer />

      <v-btn
        to="/"
        class="
          mt-2
          mr-3
          mb-9
        "
      >
        home
      </v-btn>
    </v-row>

    <v-overlay :value="overlay">
      <v-progress-circular
        v-if="!loaded"
        indeterminate
        :size="80"
        :width="10"
      />
    </v-overlay>
  </div>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import EmergeText from '~/components/EmergeText.vue'
import tags from '~/data/tags.json'

@Component({
  components: {
    EmergeText
  },
  props: {
    contentType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tags,
      contents: [],
      page: 1,
      pageLength: 0,
      limit: 6,
      skip: 0,
      overlay: true,
      loaded: false
    }
  },
  mounted () {
    this.getContentList().then(() => {
      this.getTotalLength()
    }).catch(() => {
    }).finally(() => {
      this.overlay = false
      this.loaded = true
    })
  },
  methods: {
    async getContentList () {
      this.contents = []
      this.skip = (this.page - 1) * this.limit
      this.contents = await this.$content(this.contentType).sortBy('date', 'desc').skip(this.skip).limit(this.limit).fetch()
    },
    async getTotalLength () {
      const contents = await this.$content(this.contentType).fetch()
      this.pageLength = Math.ceil(contents.length / this.limit)
    }
  }
})

export default class List extends Vue { }
</script>
