<template>
  <div class="list" v-if="listdata">
    <van-row
    v-for="item in listdata"
    :key="item.label"
    class="list-item"
    >
      <van-col span="7" class="list-item-label">{{ item.label }} :</van-col>
      <van-col span="16" class="list-item-value">{{ item.value }}</van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col } from 'vant'

Vue.use(Row).use(Col)

export default {
  name: 'SimpleList',
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
  .list {
    background-color: #f8f8f8;
    &-item {
      line-height: 24px;
      font-size: 14px;
      &-label {
        padding-right: 10px;
        text-align: right;
        color: #666;
      }

      &-value {
        color: #333;
      }

    }
  }
</style>