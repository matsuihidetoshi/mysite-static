<template>
  <content-list content-type="articles" title="日記" />
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    ContentList: () => import('~/components/contents/List.vue')
  },
  head () {
    return {
      title: '日記一覧'
    }
  }
})

export default class Index extends Vue { }
</script>
