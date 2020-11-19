import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $truncate(message: string, length: number): string
  }
}

Vue.prototype.$truncate = (message: string, length: number): string => {
  let appearanceLength: number = 0
  let truncatedMessage: string = ''
  message.split('').forEach(letter => {
    if (letter.match(/[ -~]/)) {
      appearanceLength += 0.5
    } else {
      appearanceLength += 1
    }
    if (appearanceLength < length) {
      truncatedMessage += letter
    }
  })

  return appearanceLength <= length ? truncatedMessage : truncatedMessage + "..."
}