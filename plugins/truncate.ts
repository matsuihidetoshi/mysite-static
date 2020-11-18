import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $truncate(message: string, length: number): string
  }
}

Vue.prototype.$truncate = (message: string, length: number): string => {
  return message.length <= length ? message : (message.substr(0, length) + "...")
}