<template>
  <content-list content-type="media_coverages" title="メディア掲載" />
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import ContentList from '~/components/contents/List.vue'

@Component({
  components: {
    ContentList
  }
})

export default class Index extends Vue { }
</script>
