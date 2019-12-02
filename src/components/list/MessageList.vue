<template>
  <van-cell-group v-if="listdata">

    <van-cell
      v-for="item in listdata"
      :key="item.id"
      :to="item.url"
      size="large" 
    >
      <template slot="default">
        <van-tag :type="item.type">{{ item.status }}</van-tag>
      </template>
      <template slot="title">
        <div class="van-ellipsis">{{ item.title }}</div>
      </template>
      <template slot="label">
        <div class="van-ellipsis">{{ item.time }}</div>
        <div class="van-ellipsis">{{ item.content }}</div>
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
      status: String,
      type: Array,
      content: String,
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
</style>
