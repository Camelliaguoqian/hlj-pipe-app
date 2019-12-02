<template>
  <div class="page">
    <van-nav-bar title="关于助手" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <section class="page-wrapper bg-white">
      <h2 class="info-title">综合管廊智慧运维助手</h2>
      <ul>
        <li class="info-li">1.定位为“现场作业小助手”。</li>
        <li class="info-li">2.人性化的自然交互模式为现场工作人员提供辅助。</li>
        <li class="info-li">3.为现场工作提供信息支持。</li>
        <li class="info-li">4.便捷的事件记录和上报。</li>
        <li class="info-li">5.结合移动互联技术支持现场作业、远程监控、主动告警、信息推送及交流协同等，提升管廊作业及管理的便捷性。</li>
      </ul>
    </section>

  </div>  
</template>

<script>
import { NavBar,
 Cell, 
 CellGroup,  
 Field,
 DatetimePicker,
 Picker,
 Popup,
 Button
} from 'vant'

export default {
  name: 'BasicUserPage',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Button.name]: Button,
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      
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

  .bg-white {
    margin: 0;
    padding: 10px 20px;
    height: 100vh;
    background-color: #fff;
  }

  .info-title {
    line-height: 30px;
    font-size: 16px;
  }

  .info-li {
    line-height: 24px;
    font-size: 14px;
    color: #323233;
  }

}
</style>

