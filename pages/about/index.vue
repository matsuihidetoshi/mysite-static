<template>
  <detail
    content-type="about"
    content-id="index"
    :return-to-list="false"
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
