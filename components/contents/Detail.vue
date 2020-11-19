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
        :to="content.dir"
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
    content: {
      type: Object,
      required: true
    },
    returnToList: {
      type: Boolean,
      default: true
    }
  }
})

export default class Detail extends Vue { }
</script>
