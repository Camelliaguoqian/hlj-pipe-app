<template>
  <van-cell-group v-if="listdata">

    <van-cell
      v-for="item in listdata"
      :key="item.id"
      :to="item.url"
      size="large" 
    >
      <template slot="title">
        <div class="title-name">{{ item.title }}</div>
      </template>
      <template slot="label">
        <div class="van-ellipsis label-left">{{ item.system }}</div>
        <div class="van-ellipsis label-right">{{ item.time }}</div>
      </template>
    </van-cell>

  </van-cell-group>
</template>

<script>
import Vue from 'vue'
import {
 Cell,
 CellGroup,
 Tag,
} from 'vant'

Vue.use(Cell)
.use(CellGroup)
.use(Tag)


export default {
  name: 'InfoList',
  props: {
    listdata: {
      id: String,
      title: String,
      time: String,
      system: String,
      url: String,
    },
  },
  data() {
    return {
      
    }
  },
  
}
</script>

<style lang="less" scoped>
  .van-cell__value {
    margin-top: 12px;
  }
  .title-name {
    color: #000;
  }
  .label-left {
    display: inline-block;
    width: 50%;
    text-align: left;
  }
  .label-right {
    display: inline-block;
    width: 50%;
    text-align: right;
  }
</style>
