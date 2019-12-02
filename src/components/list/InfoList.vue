<template>
  <van-cell-group v-if="listdata">

    <van-cell
      v-for="item in listdata"
      :key="item.id"
      :label="item.time"
      :to="item.url"
      size="large" 
      is-link
    >
      <template slot="title">
        <van-tag type="primary">{{ item.code }}</van-tag>
        <div class="van-ellipsis">{{ item.title }}</div>
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
      code: String,
      time: String,
      title: String,
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
  .van-cell__right-icon {
    margin-top: 24px;
  }
</style>
