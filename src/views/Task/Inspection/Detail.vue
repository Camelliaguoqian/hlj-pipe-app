<template>
  <div class="task-query-page page">
    <van-nav-bar title="任务详情" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        项目清单
        <van-button class="panel-title-link" type="info" size="small" 
        to="/taskSub/inspectionTodo">查看</van-button>
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="tasklistdata"></simple-list>
        
        <div class="page-wrapper">
          <van-button 
          type="info" 
          size="large"
          @click="onSignIn"
          >签到</van-button>
        </div>
      
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
  name: 'TaskInspectionDetailPage',
  components: {
    'simple-list': SimpleList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      tasklistdata: [
        {
          label: '任务编码',
          value: 'GD-20191121-000001',
        },
        {
          label: '任务名称',
          value: '综合舱传感器巡检',
        },
        {
          label: '巡检频次',
          value: '日检',
        },
        {
          label: '巡检方式',
          value: '人工巡检类',
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
          label: '起始分区',
          value: '01#',
        },
        {
          label: '终止分区',
          value: '11#',
        },
        {
          label: '巡检备注',
          value: '',
        },
      ]
     
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onSignIn() {
      Toast("签到成功");
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

