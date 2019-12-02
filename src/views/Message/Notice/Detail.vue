<template>
  <div class="page-inner">
    <van-nav-bar title="通知详情" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        通知详情
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="noticelistdata"></simple-list>
      </div>
    </van-panel>

  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar,
 Panel,  
 Icon,
} from 'vant'
import SimpleList from 'components/list/SimpleList'

Vue.use(NavBar)
.use(Panel)
.use(Icon)


export default {
  name: 'MessageNoticeDetailPage',
  components: {
    'simple-list': SimpleList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      noticelistdata: [
        {
          label: '消息名称',
          value: '应急通知',
        },
        {
          label: '消息状态',
          value: '已读',
        },
        {
          label: '发送时间',
          value: '2019-10-08 09：00：00',
        },
        {
          label: '消息内容',
          value: '黑龙江路综合管廊综合舱03分区温度过高，运维人员暂停入廊',
        },
      ]
    };
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  }
}
</script>

<style lang="less" scoped>
.page {
  &-wrapper {
    padding: 0 10px;
    margin: 10px auto;
  }

  &-wrapper:last-child {
    margin-bottom: 0;
  }

  &-panel {
    margin: 10px auto;
  }

  &-panel:last-child {
    margin-bottom: 0;
  }

  &-icon-panel {
    &-content {
      padding: 10px 16px;
    }

    .panel-title {
      position: relative;
      display: flex;
      box-sizing: border-box;
      width: 100%;
      padding: 10px 16px;
      overflow: hidden;
      color: #323233;
      font-size: 14px;
      line-height: 24px;
      background-color: #fff;
      &-icon {
        margin-right: 2px;
        margin-top: 4px;
      }
      &-link {
        margin-left: 10px;
      }
    }
  }

}
</style>




