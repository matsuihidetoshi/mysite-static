<template>
  <content-list content-type="works" title="制作物" />
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    ContentList: () => import('~/components/contents/List.vue')
  },
  head () {
    return {
      title: '制作物一覧'
    }
  }
})

export default class Index extends Vue { }
</script>
