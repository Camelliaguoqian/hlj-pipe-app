<template>
  <div class="task-query-page page">
    <van-nav-bar title="维修任务" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        我的维修
      </div>
      <div class="page-panel-content">
        <van-tabs v-model="activeName">
          <van-tab title="待处理" name="unHandleTab">
            <!-- 任务list子组件调用 -->
            <info-list v-bind:listdata="unhandlelistdata"></info-list>
          </van-tab>
          <van-tab title="处理中" name="handlingTab">
            <!-- 任务list子组件调用 -->
            <info-list v-bind:listdata="handlinglistdata"></info-list>
          </van-tab>
          <van-tab title="已完成" name="handledTab">
            <!-- 任务list子组件调用 -->
            <info-list v-bind:listdata="handledlistdata"></info-list>
          </van-tab>
        </van-tabs>

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
  name: 'TaskRepairListPage',
  components: {
    'info-list': InfoList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      activeName: 'unHandleTab',
      unhandlelistdata: [
        {
          id: '1',
          code: 'GD-20191121-000001',
          time: '2019-01-02 12:00:00',
          title: '无线AP',
          url: '/taskSub/repairDetail',
        },
        {
          id: '2',
          code: 'GD-20191121-000002',
          time: '2019-01-03 16:00:00',
          title: '声光报警器08',
          url: '/taskSub/repairDetail',
        },
      ],
      handlinglistdata: [
        {
          id: '3',
          code: 'GD-20191121-000003',
          time: '2019-01-02 12:00:00',
          title: '门禁控制器20',
          url: '/taskSub/repairDetail',
        },
        {
          id: '4',
          code: 'GD-20191121-000004',
          time: '2019-01-03 16:00:00',
          title: '声光报警器08',
          url: '/taskSub/repairDetail',
        },
      ],
      handledlistdata: [
        {
          id: '5',
          code: 'GD-20191121-000005',
          time: '2019-01-02 12:00:00',
          title: '门禁控制器66',
          url: '/taskSub/repairDetail',
        },
        {
          id: '6',
          code: 'GD-20191121-000006',
          time: '2019-01-03 16:00:00',
          title: '门禁控制器11',
          url: '/taskSub/repairDetail',
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

