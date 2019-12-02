<template>
  <div class="task-query-page page">
    <van-nav-bar title="任务清单" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        我的任务清单
      </div>
      <div class="page-panel-content">
        <!-- 任务list子组件调用 -->
        <info-list v-bind:listdata="todolistdata"></info-list>
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
} from 'vant'
import InfoList from 'components/list/InfoList'

Vue.use(NavBar)
.use(Panel)
.use(Icon)
.use(Tab)
.use(Tabs)

export default {
  name: 'TaskInspectionTodoPage',
  components: {
    'info-list': InfoList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      activeName: 'unHandleTab',
      todolistdata: [
        {
          id: '1',
          code: '执行中',
          time: '2019-01-02 12:00:00',
          title: '氧气传感器',
          url: '/taskSub/inspectionTodoDetail',
        },
        {
          id: '2',
          code: '执行中',
          time: '2019-01-03 16:00:00',
          title: '温湿度传感器',
          url: '/taskSub/inspectionTodoDetail',
        },
      ],
    
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
    }
  }

}
</style>

