<template>
  <content-list content-type="articles" title="日記" />
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
      title: '日記一覧'
    }
  }
})

export default class Index extends Vue { }
</script>
