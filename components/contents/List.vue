<template>
  <div>
    <h1
      class="
        text-center
        ma-2
      "
    >
      {{ title }}
    </h1>

    <tags
      v-model="tagState"
      :clear="true"
    />

    <v-pagination
      v-model="page"
      :length="pageLength"
      @input="getContentListByTags(tagState)"
    />

    <v-row
      v-if="contents.length > 0"
    >
      <v-col
        v-for="(content, index) in contents"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="pa-3"
      >
        <v-card
          :to="content.path"
        >
          <v-img
            :src="content.image"
            height="120"
          />

          <v-card-title>
            <div
              class="
                text-truncate
                font-weight-bold
              "
            >
              {{ content.title }}
            </div>
          </v-card-title>

          <v-card-subtitle
            class="ml-2"
          >
            <time
              :datetime="
                content.date
              "
            >
              {{ new Date(content.date).toLocaleDateString() }}
            </time>
          </v-card-subtitle>

          <v-card-actions
            class="ml-2"
          >
            <tags
              v-model="tagState"
              :only="content.tags"
              :x-small="true"
            />
          </v-card-actions>
        </v-card>
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
            No posts yet.
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-model="page"
      :length="pageLength"
      @input="getContentListByTags(tagState)"
    />

    <tags
      v-model="tagState"
      :clear="true"
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
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { tags } from '../../data/tags'
import Tags from '../../components/contents/Tags.vue'

interface TagState {
  name: string
  selected: boolean
}

@Component({
  components: {
    Tags
  }
})

export default class List extends Vue {
  $route: any
  $content: any

  @Prop({ type: String, required: true })
  contentType!: string

  @Prop({ type: String, required: true })
  title!: string

  tags = tags
  tagState:TagState[] = []
  contents = []
  page = 1
  pageLength = 0
  limit = 6
  skip = 0
  overlay = true
  loaded = false

  @Watch('tagState', { deep: true })
  handler () {
    this.getContentListByTags(this.tagState)
  }

  mounted () {
    this.initializeTagState()
    if (this.$route.query.tag) {
      const tag = this.$route.query.tag
      this.tagState.map((state: any) => {
        if (tag === state.name) {
          state.selected = true
        }
      })
    } else {
      this.getContentList().then(() => {
        this.getTotalLength()
      }).catch(() => {
      }).finally(() => {
        this.overlay = false
        this.loaded = true
      })
    }
  }

  async getContentList (tags = null) {
    this.contents = []
    this.skip = (this.page - 1) * this.limit
    if (tags) {
      this.contents = await this.$content(this.contentType).where({ tags: { $contains: tags } }).sortBy('date', 'desc').skip(this.skip).limit(this.limit).fetch()
    } else {
      this.contents = await this.$content(this.contentType).sortBy('date', 'desc').skip(this.skip).limit(this.limit).fetch()
    }
  }

  async getTotalLength (tags = null) {
    let contents = []
    if (tags) {
      contents = await this.$content(this.contentType).where({ tags: { $contains: tags } }).fetch()
    } else {
      contents = await this.$content(this.contentType).fetch()
    }
    this.pageLength = Math.ceil(contents.length / this.limit)
  }

  initializeTagState () {
    this.tags.map((tag: string) => this.tagState.push({ name: tag, selected: false }))
  }

  getContentListByTags (tags:TagState[] = []) {
    const tagNames: any = tags.map((tag) => {
      if (tag.selected) { return tag.name }
    }).filter(v => v)
    this.overlay = true
    this.loaded = false
    this.getContentList(tagNames).then(() => {
      this.getTotalLength(tagNames)
    }).catch(() => {
    }).finally(() => {
      this.overlay = false
      this.loaded = true
    })
  }
}
</script>
