<template>
  <div>home</div>
  <div>{{count}}</div>
  <el-button type="primary" @click="goLayout">layout</el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { sysStore } from '/@/store/modules/sys'

const store = sysStore()
const { count } = storeToRefs(store)


const router = useRouter()
//按钮点击
const goLayout = () => {
  router.push({
    path: '/layout'
  })
}


/* setTimeout(() => {
  store.count++
  store.increment();

  console.log(store.changeNum(12))
}, 1000)
setTimeout(() => {
  store.count++
  store.increment();

  console.log(store.changeNum(12))
}, 2000)
setTimeout(() => {
  store.count++
  store.increment();

  console.log(store.changeNum(12))
}, 3000)

const subscribe = store.$subscribe((mutation, state) => {
  console.log(mutation, 'mutation')

  console.log(state)

}) */


//sysStore
</script>