<template>
  <div class="message-page page">
    <van-nav-bar title="消息中心" fixed :zIndex="100"></van-nav-bar>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar } from 'vant'

Vue.use(NavBar)

export default {
  name: 'MessageIndexPage',
  props: {
    zIndex: Number,
  },
};
</script>

<style lang="less" scoped>
.page {
  padding: 46px 0 0 0;
}
</style>

