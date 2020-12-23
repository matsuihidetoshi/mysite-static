<template>
  <content-list content-type="works" title="制作物" />
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import ContentList from '~/components/contents/List.vue'

@Component({
  components: {
    ContentList
  },
  head () {
    return {
      title: '制作物一覧'
    }
  }
})

export default class Index extends Vue { }
</script>
