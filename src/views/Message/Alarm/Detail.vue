<template>
  <div class="page-inner">
    <van-nav-bar title="报警详情" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        报警详情
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="alarmlistdata"></simple-list>
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
  name: 'MessageAlarmDetailPage',
  components: {
    'simple-list': SimpleList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      alarmlistdata: [
        {
          label: '所属管廊',
          value: '黑龙江路综合管廊',
        },
        {
          label: '所属分区',
          value: '04#',
        },
        {
          label: '所属舱室',
          value: '综合舱',
        },
        {
          label: '发生时间',
          value: '2019-10-08 09：00：00',
        },
        {
          label: '监测来源',
          value: '监控与报警系统',
        },
        {
          label: '告警内容',
          value: '黑龙江路综合管廊综合舱04分区温度过高，运维人员暂停入廊',
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




