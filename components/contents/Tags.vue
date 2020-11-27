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
        v-if="hideInvisible(tag.name) && !link"
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
      <v-btn
        v-if="hideInvisible(tag.name) && link"
        :color="changeColor(tag.selected)"
        class="
          font-weight-bold
          mt-1
          ml-1
        "
        :to="link + '?tag=' + tag.name"
      >
        #{{ tag.name }}
      </v-btn>
    </div>

    <v-btn
      v-if="clear"
      color="primary"
      class="
        float-right
        font-weight-bold
        mt-1
        ml-1
        mr-1
      "
      @click="clearState()"
    >
      clear
    </v-btn>
  </div>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  props: {
    value: {
      type: Array
    },
    only: {
      type: Array
    },
    link: {
      type: String,
      default: null
    },
    clear: {
      type: Boolean,
      default: false
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
      if (!this.only || this.only.includes(value)) {
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
    },
    clearState () {
      this.value.map((value) => { value.selected = false })
    }
  }
})

export default class Tags extends Vue { }
</script>
