<template>
  <div class="home-page page">
    <van-nav-bar title="首页" fixed :zIndex="100">
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>

    <section class="page-wrapper">
      <van-grid clickable :column-num="2">
        <van-grid-item :icon="navIconUrlScan" text="扫一扫" @click="scanTest" />
        <van-grid-item :icon="navIconUrlWork" dot text="工作" to="/work" />
      </van-grid>
    </section>

    <section class="navs-wrapper">
      <van-grid clickable :gutter="10">
        <van-grid-item
          v-for="item in navs"
          :key="item.id"
          :icon="item.icon"
          :text="item.name"
          :to="item.url"
        />
        <van-grid-item
          text="更多"
          :icon="navIconUrlMore"
          @click="onClickNavLink"
        />
      </van-grid>
    </section>

    <section class="page-wrapper">
      <van-notice-bar left-icon="volume-o">{{ noticeMsg }}</van-notice-bar>
    </section>

    <van-panel class="page-panel" title="最近报警动态">
      <div class="page-panel-content">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="item in alarms" :key="item.id">
            <h3>{{ item.title }}</h3>
            <p>{{ item.time }}</p>
          </van-step>
        </van-steps>
      </div>
    </van-panel>

    <van-panel class="page-panel" title="最近任务动态">
      <div class="page-panel-content">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="item in tasks" :key="item.id">
            <h3>{{ item.title }}</h3>
            <p>{{ item.time }}</p>
          </van-step>
        </van-steps>
      </div>
    </van-panel>

    <section class="page-wrapper">
      <van-divider :style="{ color: '#969799', borderColor: '#969799', padding: '0 16px' }">
        我是有底线的
      </van-divider>
    </section>

    <!-- 底部tab栏组件 -->
    <v-footer></v-footer>
  </div>
</template>

<script>
import { NavBar, 
Panel, 
Grid, 
GridItem, 
NoticeBar, 
Step, 
Steps, 
Divider} from 'vant'
import TheFooter from 'components/common/TheFooter'
import Mplat from 'utils/Mplat'

export default {
  name: 'HomeIndexPage',
  components: {
    'v-footer': TheFooter,
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [NoticeBar.name]: NoticeBar,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Divider.name]: Divider
  },
  props: {
    zIndex: Number,
  },
  data () {
    return {
      navIconUrlScan: require('assets/image/nav/scan.png'),
      navIconUrlWork: require('assets/image/nav/work.png'),
      navIconUrlMore: require('assets/image/nav/more-query.png'),
      noticeMsg: '2019年11月21日 黑龙江路管廊综合舱温度过高发出告警，请相关人员及时进行处理',
      navs: [{
        id: 1,
        name: '任务查询',
        icon: require('assets/image/nav/task-query.png'),
        url: '/taskQuery',
      },{
        id: 2,
        name: '报警查询',
        icon: require('assets/image/nav/alarm-query.png'),
        url: '/alarmQuery',
      },{
        id: 3,
        name: '管廊查询',
        icon: require('assets/image/nav/pipe-query.png'),
        url: '/pipeQuery',
      },{
        id: 4,
        name: '管线查询',
        icon: require('assets/image/nav/pipeline-query.png'),
        url: '/pipelineQuery',
      },{
        id: 5,
        name: '设备查询',
        icon: require('assets/image/nav/device-query.png'),
        url: '/deviceQuery',
      },{
        id: 6,
        name: '环境监测',
        icon: require('assets/image/nav/env-query.png'),
        url: '/environmentalMonitoring',
      },{
        id: 7,
        name: '统计分析',
        icon: require('assets/image/nav/statistic.png'),
        url: '/statistic',
      }],
      alarms: [{
        id: 1,
        title:  '黑龙江路 08# 综合舱 湿度过高',
        time: '2019-07-12 12:40'
      },{
        id: 2,
        title:  '黑龙江路 02# 综合舱 入侵报警',
        time: '2019-06-12 12:40'
      },{
        id: 3,
        title:  '黑龙江路 11# 综合舱 湿度过高',
        time: '2019-05-12 12:40'
      },{
        id: 4,
        title:  '黑龙江路 14# 综合舱 湿度过高',
        time: '2019-04-12 12:40'
      },{
        id: 5,
        title:  '黑龙江路 06# 综合舱 湿度过高',
        time: '2019-03-12 12:40'
      }],
      tasks: [{
        id: 1,
        title:  '综合舱氧气传感器巡检完成',
        time: '2019-07-12 12:40'
      },{
        id: 2,
        title:  '综合舱温湿度传感器巡检完成',
        time: '2019-06-12 12:40'
      },{
        id: 3,
        title:  '对管廊内消防设施、防护设施进行巡检，对逃生通道进行保养',
        time: '2019-05-12 12:40'
      },{
        id: 4,
        title:  '本周起，对消防器材进行重点巡检，请相关人员做好准备',
        time: '2019-04-12 12:40'
      },{
        id: 5,
        title:  '综合舱摄像头设备巡检完成',
        time: '2019-03-12 12:40'
      }],
    }
  },
  methods: {
    onClickNavLink: function () {
      this.$toast("更多功能暂未开放，敬请期待");
    },
    //测试Mplat调用原生api的scan功能
    scanTest: function () {
      this.$toast('二维码扫描成功');
      this.$router.push('scan');

      //调用移动框架接口
      Mplat.init(function(){
        this.$toast('初始化');
        //Mplat.getUserInfos();
        Mplat.scanGetCode({
          params: {
            "width":"",
            "height":""
          },
          callback: function(data) {
            var result=eval("(" + data + ")");
            this.$toast(result);
          }
       })
      });
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 46px 0 50px 0;
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

}
</style>