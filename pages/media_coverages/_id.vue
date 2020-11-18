<template>
  <detail
    content-type="media_coverages"
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
