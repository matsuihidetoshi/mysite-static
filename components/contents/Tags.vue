<template>
  <div
    class="
      d-inline-block
      text-center
      mt-3
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
        mt-1
        ml-1
      "
    >
      #{{ tag.name }}
    </v-btn>
  </div>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import tags from '~/data/tags.json'

@Component({
  data () {
    return {
      tags
    }
  }
})

export default class Tags extends Vue { }
</script>
