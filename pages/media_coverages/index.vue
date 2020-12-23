<template>
  <content-list content-type="media_coverages" title="メディア掲載" />
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    ContentList: () => import('~/components/contents/List.vue')
  },
  head () {
    return {
      title: 'メディア掲載一覧'
    }
  }
})

export default class Index extends Vue { }
</script>
