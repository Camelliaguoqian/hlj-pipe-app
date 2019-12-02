<template>
  <div class="default-data" :class="nodata">
    <van-image
      class="default-data-img"
      width="76"
      height="48"
      :src="imgUrl"
    />
    <p class="default-data-text">暂无数据</p>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image } from 'vant'

Vue.use(Image)

export default {
  name: 'DefaultData',
  props: {
    nodata: String
  },
  data() {
    return {
      imgUrl: require('assets/image/default_data.png')
    }
  }
}
</script>

<style lang="less" scoped>
.default-data {
  margin: 0 auto;
  padding: 50px 0;
  height: 100px;
  font-size: 14px;
  color: #8a8a8a;
  text-align: center;
  &-img {
    margin: 10px auto;
  }
  &-text {
    line-height: 20px;
  }
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>