<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface ErrorProp {
  statusCode: number
}

@Component
export default class Error extends Vue {
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }

  @Prop({ type: Object, default: null })
  error: ErrorProp

  pageNotFound = '404 Not Found'
  otherError = 'An error occurred'
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
