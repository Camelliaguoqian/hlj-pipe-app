<template>
  <div class="page">
    <van-nav-bar title="环境监测" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        监测基本信息
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="envlistdata"></simple-list>
      </div>
    </van-panel>

  </div>
</template>

<script>
import { NavBar,
 Panel,  
} from 'vant'
import SimpleList from 'components/list/SimpleList'

export default {
  name: 'EnvironmentalMonitoringListPage',
  components: {
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    'simple-list': SimpleList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      envlistdata: [
        {
          label: '所属管廊',
          value: '黑龙江路综合管廊',
        },
        {
          label: '所属分区',
          value: '03分区',
        },
        {
          label: '所属舱室',
          value: '燃气舱',
        },
        {
          label: '温度',
          value: '65℃',
        },
        {
          label: '湿度',
          value: '26%RH',
        },
        {
          label: '氧气含量',
          value: '15%',
        },
        {
          label: '甲烷含量',
          value: '0.9%LEL',
        },
        {
          label: '硫化氢含量',
          value: '16mg/m3',
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




