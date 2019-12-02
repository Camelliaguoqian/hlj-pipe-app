<template>
  <div class="card van-hairline--surround" v-if="listdata">
    <van-row
    v-for="item in listdata"
    :key="item.label"
    class="card-item"
    >
      <van-col span="24" class="card-item-label">{{ item.label }}</van-col>
      <van-col span="24" class="card-item-value">{{ item.value }}</van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col } from 'vant'

Vue.use(Row).use(Col)

export default {
  name: 'InfoCard',
  props: {
    listdata: {
      label: String,
      value: String,
    },
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .card {
    margin: 10px auto;
    padding: 10px;
    width: 90%;
    border-radius: 3%;
    background-color: #fff;
    box-shadow: #ddd 0 0 10px 5px;
    &-item {
      line-height: 24px;
      &-label {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      &-value {
        color: #999;
      }

    }
  }
</style>