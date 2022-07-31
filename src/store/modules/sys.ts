import { defineStore } from 'pinia'

export const sysStore = defineStore('sys', {
  state: () => {
    return { count: 0 }
  },
  actions: {
    increment() {
      this.count++
    },
    changeNum: (num:number):number => num * num,
  },
})