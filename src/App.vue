<template>
  <div id="app">
    <!-- 头部组件 -->
    <!-- <v-header></v-header> -->

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>

    <!-- 底部tab栏组件 -->
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import TheHeader from '@/components/common/TheHeader'
// import TheFooter from '@/components/common/TheFooter'

export default {
  components: {
    // 'v-header': TheHeader,
    // 'v-footer': TheFooter
  }
}
</script>
