<template>
  <div class="card van-hairline--surround" v-if="listdata">
    
    <van-row class="card-control">
      <van-col span="24" class="card-control-title">运行控制 （<span class="status-name">{{ listdata.isControled }}</span>）</van-col>
      <van-switch :value="checked" @input="onInput" size="20px" class="card-control-switch" />
    </van-row>
    <van-row
    v-for="item in listdata.valueData"
    :key="item.label"
    class="card-item"
    >
      <van-col span="24" class="card-item-label">{{ item.label }}：{{ item.value }}</van-col>
    </van-row>

  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Switch, Dialog } from 'vant'

Vue.use(Row).use(Col).use(Switch).use(Dialog)

export default {
  name: 'InfoCard',
  props: {
    listdata: {
      isControled: String,
      valueData: Array,
      label: String,
      value: String,
    },
  },
  data() {
    return {
      checked: true
    }
  },
  methods: {
    onInput(checked) {
      Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？'
      }).then(() => {
        this.checked = checked;
      });
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
    &-control {
      position: relative;
      &-title {
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      &-switch {
        position: absolute;
        right: 0;
        top: 5px;
      }
    }
    
    &-item {
      line-height: 24px;
      &-label {
        color: #999;
      }

    }
  }
</style>