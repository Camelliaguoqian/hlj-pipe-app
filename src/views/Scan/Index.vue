<template>
  <div class="page">
    <van-nav-bar title="设备" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <section class="page-cover">
      <img class="device-img" :src="devImgUrl" alt="" />
    </section>

    <section class="page-wrapper">
      <!-- 运行控制 -->
      <control-card v-bind:listdata="deviceControl"></control-card>

      <!-- 设备信息 -->
      <info-card v-bind:listdata="devicelist"></info-card>

      <!-- 设备台账 -->
      <van-panel class="page-panel-card" title="设备台账">
        <div class="page-panel-card-content">
          <van-steps direction="vertical" :active="0">
            <van-step v-for="item in deviceAccount" :key="item.id">
              <h3>{{ item.title }}</h3>
              <p>{{ item.time }}</p>
            </van-step>
          </van-steps>
        </div>
      </van-panel>

    </section>

  </div>
</template>

<script>
import { NavBar,
 Panel, 
 Step, 
 Steps, 
} from 'vant'
import ControlCard from 'components/list/ControlCard'
import InfoCard from 'components/list/InfoCard'

export default {
  name: 'ScanIndexPage',
  components: {
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Step.name]: Step,
    [Steps.name]: Steps,
    "control-card": ControlCard,
    "info-card": InfoCard
  },
   props: {
    zIndex: Number,
  },
  data() {
    return {
      devImgUrl: require('assets/image/camera.jpg'),
      deviceControl: {
        isControled: "已开启",
        valueData: [
          {
            label: "当前状态",
            value: "打开",
          },
          {
            label: "当前转速",
            value: "1200RPM",
          },
          {
            label: "当前风量",
            value: "20M³/S",
          },
        ],
      },
      devicelist: [
        {
          label: "设备名称",
          value: "管廊摄像头",
        },
        {
          label: "设备类型",
          value: "摄像头",
        },
        {
          label: "设备编码",
          value: "D345345",
        },
        {
          label: "安装位置",
          value: "彩虹西路综合管廊 电力舱 08分区",
        },
      ],
      deviceAccount: [{
        id: 1,
        title:  '摄像头检修11.11',
        time: '2019-07-12 12:40'
      },{
        id: 2,
        title:  '摄像头检修10.10',
        time: '2019-06-12 12:40'
      },{
        id: 3,
        title:  '摄像头安装',
        time: '2019-05-12 12:40'
      }],
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

  &-panel-card {
    margin: 10px auto;
    padding: 10px;
    width: 90%;
    border-radius: 3%;
    background-color: #fff;
    box-shadow: #ddd 0 0 10px 5px;
  }

  &-cover {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .device-img {
      display: block;
      margin: 0 auto;
      width: 300px;
      height: 240px;
    }
  }
  

}
</style>