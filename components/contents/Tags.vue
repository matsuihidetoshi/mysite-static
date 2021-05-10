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
        :small="small"
        :x-small="xSmall"
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
        :small="small"
        :x-small="xSmall"
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
      :small="small"
      :x-small="xSmall"
      class="
        float-right
        font-weight-bold
        mt-1
        ml-2
        mr-1
      "
      @click="clearState()"
    >
      clear
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface Value {
  selected: boolean
}

@Component
export default class Tags extends Vue {
  @Prop({ type: Array, default: () => {} })
  value!: Value[]

  @Prop({ type: Array, default: () => {} })
  only!: []

  @Prop({ type: String, default: null })
  link!: string

  @Prop({ type: Boolean, default: false })
  clear!: boolean

  @Prop({ type: Boolean, default: false })
  small!: boolean

  @Prop({ type: Boolean, default: false })
  xSmall!: false

  toggle (index: number) {
    const value = this.value
    if (value[index].selected) {
      value[index].selected = false
    } else {
      value[index].selected = true
    }
    this.$emit('input', value)
  }

  hideInvisible (value: never) {
    if (!this.only || this.only.includes(value)) {
      return true
    } else {
      return false
    }
  }

  changeColor (selected: boolean) {
    if (selected) {
      return 'secondary'
    } else {
      return ''
    }
  }

  clearState () {
    this.value.map((value: Value) => { value.selected = false })
  }
}
</script>
