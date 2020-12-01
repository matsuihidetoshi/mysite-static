<template>
  <div>
    <h1>
      <emerge-text
        v-if="content"
        :message="content.title"
      />
    </h1>

    <emerge-text
      v-if="content"
      :message="
        new Date(content.date).toLocaleDateString()
      "
    />

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
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import EmergeText from '~/components/EmergeText.vue'
import tags from '~/data/tags.json'
import Tags from '~/components/contents/Tags.vue'

@Component({
  components: {
    EmergeText,
    Tags
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    returnToList: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tags,
      tagObject: []
    }
  },
  mounted () {
    this.tagObject = this.initializeTagState()
  },
  methods: {
    initializeTagState () {
      return this.tags.map((tag) => { return { name: tag, selected: false } })
    }
  }
})

export default class Detail extends Vue { }
</script>
