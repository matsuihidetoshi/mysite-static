<template>
  <detail
    content-type="articles"
    :content-id="$route.params.id"
  />
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'
import Detail from '~/components/contents/Detail.vue'

@Component({
  components: {
    Detail
  }
})

export default class Id extends Vue { }
</script>
