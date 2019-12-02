<template>
  <div class="task-query-page page">
    <van-nav-bar title="工单详情" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        <span>工单编码: {{ orderCode }}</span>
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="tasklistdata"></simple-list>
      </div>
    </van-panel>

  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar,
 Panel, 
 Icon,
 Tab,
 Tabs,
 Button,
 Toast
} from 'vant'
import SimpleList from 'components/list/SimpleList'


Vue.use(NavBar)
.use(Panel)
.use(Icon)
.use(Tab)
.use(Tabs)
.use(Button)
.use(Toast)

export default {
  name: 'TaskRepairDetailPage',
  components: {
    'simple-list': SimpleList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      orderCode: 'ZD091011-0045734',
      btnType: '反馈', //签到 、反馈
      tasklistdata: [
        {
          label: '工单名称',
          value: '无线AP12巡检',
        },
        {
          label: '所属管廊',
          value: '黑龙江路综合管廊',
        },
        {
          label: '所属舱室',
          value: '综合舱',
        },
        {
          label: '所属分区',
          value: '分区06',
        },
        {
          label: '工单备注',
          value: '',
        },
      ]
     
    }
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
  padding: 46px 0 0 0;
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

