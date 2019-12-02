<template>
  <van-nav-bar title="标题" fixed :zIndex="100"></van-nav-bar>
</template>

<script>
import Vue from 'vue'
import { NavBar } from 'vant'

Vue.use(NavBar)

export default {
  props: {
    zIndex: Number,
  }
}
</script>

