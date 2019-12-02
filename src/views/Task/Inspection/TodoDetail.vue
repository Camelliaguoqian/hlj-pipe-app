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
        @click="onShowDetail">查看</van-button>
        <van-button class="panel-title-link" type="info" size="small" 
        to="/taskSub/inspectionFeedback">反馈</van-button>
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="todolistdata"></simple-list>
        
        <div class="page-wrapper">
          <van-button 
          type="info" 
          size="large"
          @click="onDoneTask"
          >完成任务</van-button>
        </div>
      
      </div>
    </van-panel>

    <van-dialog
      v-model="show"
      title="任务详情"
      confirm-button-text="开始巡检"
      showCancelButton
      @confirm="onConfirmDialog"
    >
      <!-- 简单信息列表组件 -->
      <simple-list :listdata="detaildata"></simple-list>
    </van-dialog>

  </div>
</template>

<script>
import { NavBar,
 Panel, 
 Tab,
 Tabs,
 Button,
 Dialog
} from 'vant'
import SimpleList from 'components/list/SimpleList'

export default {
  name: 'TaskInspectionTodoDetailPage',
  components: {
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
    'simple-list': SimpleList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      show: false,
      todolistdata: [
        {
          label: '任务编码',
          value: 'ZD18394844-499558',
        },
        {
          label: '任务名称',
          value: '氧气传感器',
        },
        {
          label: '巡检方式',
          value: '人工巡检类',
        },
        {
          label: '参考时间',
          value: '10分钟',
        },
        {
          label: '作业指导',
          value: '检查舱内氧气浓度是否正常',
        },
      ],
      detaildata: [
        {
          label: '任务',
          value: '管廊氧气传感器设备维护保养',
        },
        {
          label: '类型',
          value: '维护保养',
        },
        {
          label: '详情',
          value: '1.检查设备的生产日期，如有必要需进行更换。2.保证设备周五环境卫生干净。3.确保逃生通道附近无杂物堆放，必要是进行清理。4.检查防火门的开关状态。5.查看火灾警报探测器、手动报警按钮、火灾警报装置的外观和运行状态。',
        },
        {
          label: '地点',
          value: '整体管廊',
        },
        {
          label: '时间',
          value: '11：30',
        },
      ],
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onShowDetail() {
      this.show = true;
    },
    onConfirmDialog() {
      //this.$toast("任务详情弹框确认按钮点击");
    },
    onDoneTask(e) {
      this.$toast("此项任务已完成");
      
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

