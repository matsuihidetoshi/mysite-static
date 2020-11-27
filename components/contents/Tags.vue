<template>
  <div
    class="
      d-inline-block
      text-center
      mt-3
      mb-3
    "
  >
    <div
      v-for="(tag, index) in value"
      :key="index"
      class="d-inline"
    >
      <v-btn
        v-if="hideInvisible(tag.name)"
        :color="changeColor(tag.selected)"
        class="
          font-weight-bold
          mt-1
          ml-1
        "
        @click="toggle(index)"
      >
        #{{ tag.name }}
      </v-btn>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  props: {
    value: {
      type: Array,
      required: true
    },
    visibles: {
      type: Array
    }
  },
  methods: {
    toggle (index) {
      const value = this.value
      if (value[index].selected) {
        value[index].selected = false
      } else {
        value[index].selected = true
      }
      this.$emit('input', value)
    },
    hideInvisible (value) {
      if (!this.visibles || this.visibles.includes(value)) {
        return true
      } else {
        return false
      }
    },
    changeColor (selected) {
      if (selected) {
        return 'secondary'
      } else {
        return ''
      }
    }
  }
})

export default class Tags extends Vue { }
</script>
