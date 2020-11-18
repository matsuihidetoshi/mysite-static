<template>
  <div>
    <h1>
      <name
        v-if="content"
        :message="content.title"
      />
    </h1>

    <name
      v-if="content"
      :message="
        new Date(content.date).toLocaleDateString()
      "
    />

    <nuxt-content
      v-if="content"
      :document="content"
    />

    <v-row>
      <v-spacer />

      <v-btn
        v-if="returnToList"
        class="
          mt-2
          mr-3
        "
        :to="'/' + contentType"
      >
        back
      </v-btn>

      <v-btn
        class="
          mt-2
          mr-3
        "
        to="/"
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
import Name from '~/components/Name.vue'

@Component({
  components: {
    Name
  },
  props: {
    contentType: {
      type: String,
      required: true
    },
    contentId: {
      type: String,
      required: true
    },
    returnToList: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      content: null,
      overlay: true,
      loaded: false
    }
  },
  mounted () {
    this.getContent().then((contents) => {
      this.content = contents[0]
      this.overlay = false
      this.loaded = true
    })
  },
  methods: {
    async getContent () {
      return await this.$content(this.contentType).where({ id: this.contentId }).fetch()
    },
    baseUrl () {
      return process.env.baseUrl
    }
  }
})

export default class Detail extends Vue { }
</script>
