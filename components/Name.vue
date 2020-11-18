<template>
  <div class="Name">
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
      Array.from(message).forEach((letter, index) => {
        result.push({ value: letter, animationType: index + 1 })
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
        letter.animationType = result[index]
      })
    }
  }
})

export default class Name extends Vue { }
</script>

<style>
.fade--1 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.05s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--2 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.1s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--3 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.15s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--4 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.2s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--5 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.25s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--6 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.3s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--7 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.35s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--8 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.4s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--9 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.45s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--10 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.5s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--11 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.55s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--12 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.6s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--13 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.65s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--14 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.7s;
  animation-name: fadein;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.fade--15 {
  opacity: 0;
  animation-duration: 0.15s;
  animation-delay : 0.75s;
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
