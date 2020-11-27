<template>
  <div class="EmergeText">
    <div>
      <div
        v-for="(letter, index) in letters"
        :key="index"
        color="#abcdef"
        class="
          d-inline-block
        "
        :class="`fade--${letter.animationType}`"
      >
        <span
          v-if="letter.value == ' '"
        >
          &nbsp;
        </span>
        {{ letter.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      letters: []
    }
  },
  created () {
    this.letters = this.parseLetters(this.message)
    this.shuffle()
  },
  methods: {
    parseLetters (message) {
      const result = []
      Array.from(message).forEach((letter) => {
        result.push({ value: letter })
      })
      return result
    },
    shuffle () {
      const dataArray = [...Array(this.letters.length).keys()].map(i => ++i)
      const randomNumbers = []
      for (let i = 0; i < dataArray.length; i++) {
        randomNumbers.push(Math.random())
      }
      const result = dataArray.sort((a, b) => {
        return randomNumbers[dataArray.indexOf(a)] - randomNumbers[dataArray.indexOf(b)]
      })
      this.letters.forEach((letter, index) => {
        letter.animationType = result[index] % 5
      })
    }
  }
})

export default class EmergeText extends Vue { }
</script>

<style>
.fade--0 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.05s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--1 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.1s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--2 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.15s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--3 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.2s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--4 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.25s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadein {
  from {
      opacity: 0;
      transform: translateY(20px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
}
</style>
