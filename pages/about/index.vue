<template>
  <detail
    :content="content"
    :return-to-list="false"
  />
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Detail from '../../components/contents/Detail.vue'

@Component({
  components: {
    Detail
  }
})

export default class Id extends Vue {
  content: any

  async asyncData ({ $content }: any): Promise<object> {
    const content = await $content('about', 'index').fetch()
    return { content }
  }

  head () {
    return {
      title: this.content.title,
      meta: [
        {
          hid: 'description',
          property: 'description',
          content: this.content.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.content.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.baseUrl + this.content.path
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.content.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.baseUrl + this.content.image
        }
      ]
    }
  }
}
</script>
