<template>
  <div>
    <h1>
      {{ content.title }}
    </h1>

    <p>
      <time
        :datetime="
          content.date
        "
      >
        {{ new Date(content.date).toLocaleDateString() }}
      </time>
    </p>

    <tags
      v-model="tagObject"
      :only="content.tags"
      :link="content.dir"
    />

    <nuxt-content
      v-if="content"
      :document="content"
    />

    <tags
      v-model="tagObject"
      :only="content.tags"
      :link="content.dir"
    />

    <v-row>
      <v-spacer />

      <v-btn
        v-if="returnToList"
        class="
          mt-2
          mr-3
        "
        :to="content.dir"
      >
        index
      </v-btn>

      <v-btn
        class="
          mt-2
          mr-3
          mb-9
        "
        to="/"
      >
        home
      </v-btn>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
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

export default class Detail extends Vue {
  @Prop({ type: Object, required: true })
  content!: any

  @Prop({ type: Boolean, default: true })
  returnToList!: boolean

  tags = tags
  tagObject: TagState[] = []

  mounted () {
    this.tagObject = this.initializeTagState()
  }

  initializeTagState () {
    return this.tags.map((tag: string) => { return { name: tag, selected: false } })
  }
}
</script>
