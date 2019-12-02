<template>
  <div class="page">
    <van-nav-bar title="报警查询" 
    fixed 
    left-arrow 
    :zIndex="100" 
    @click-left="goBack"></van-nav-bar>

    <section class="page-wrapper">
      <!-- 任务list子组件调用 -->
      <status-list v-bind:listdata="alarmquerylist"></status-list>
      <!-- 暂无数据组件 -->
      <default-data v-bind:nodata="isdatahide"></default-data> 
    </section>

  </div>
</template>

<script>
import { NavBar,
  Panel, 
  Tab,
  Tabs,
  Image,
} from 'vant'
import DefaultData from 'components/common/DefaultData'
import StatusList from 'components/list/StatusList'
import DataDictionaryUtil from 'utils/DataDictionaryUtil'

export default {
  name: 'AlarmQueryListPage',
  components: {
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Image.name]: Image,
    'default-data': DefaultData,
    'status-list': StatusList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      alarmquerylist: [],
      alarmquerylist0: [{
        id: '1',
        title: '综合舱氧气浓度过低',
        time: '报警时间：2019-11-06 12:00:24',
        content: '报警位置：综合舱 01#',
        status: '一级',
        type: 'danger',
        url: 'alarmQueryDetail'
      },{
        id: '2',
        title: '综合舱温度过高',
        time: '报警时间：2019-11-05 06:00:00',
        content: '报警位置：综合舱 02#',
        status: '二级',
        type: 'warning',
        url: 'alarmQueryDetail'
      },{
        id: '3',
        title: '综合舱湿度过高',
        time: '报警时间：2019-11-04 11:02:04',
        content: '报警位置：综合舱 09#',
        status: '三级',
        type: 'primary',
        url: 'alarmQueryDetail'
      },{
        id: '4',
        title: '入侵报警',
        time: '报警时间：2019-11-03 09:09:09',
        content: '报警位置：综合舱 03#',
        status: '四级',
        type: 'success',
        url: 'alarmQueryDetail'
      }],
      isdatahide: 'hide'
    }
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    initData: function() {
      /**
       * 获取父组件路由传过来的参数值
       * 方法1：this.$router.currentRoute.query.pipeId
       * 方法2：this.$route.query.pipeId
       */
      let pipeId = this.$route.query.pipeId;
      let zoneId = this.$route.query.zoneId;
      let cabinId = this.$route.query.cabinId;
      let startTime = this.$route.query.startTime;
      let endTime = this.$route.query.endTime;
      let systemId = this.$route.query.systemId;
      let alarmLevel = this.$route.query.alarmLevel;
     
      //数据查询-瀑布流滚动加载长列表
      this.request.httpPost(this.requestUrl.alarmSearch, {
        pipeId: pipeId,
        zoneId: zoneId,
        cabinId: cabinId,
        startTime: startTime,
        endTime: endTime,
        systemId: systemId,
        alarmLevel: alarmLevel}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; 
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        let queryListData = resultRetData;
        
        if(resultRetCode === "SUCCESS"){
          if(queryListData.length > 0) {
            for(let i=0; i<queryListData.length; i++) {
              let node = {};
              node.id = queryListData[i].resId;
              node.title = queryListData[i].devname + ' ' + queryListData[i].almstr;
              node.time = '报警时间：' + queryListData[i].eventTime;
              node.content = '报警位置：' + queryListData[i].spacename;
              node.status = DataDictionaryUtil.commonJudgeAlarmType(queryListData[i].alarmStatus).status;
              node.type = DataDictionaryUtil.commonJudgeAlarmType(queryListData[i].alarmStatus).classNameType;
              this.alarmquerylist.push(node);
            }

          }else{
            //暂无数据
            this.isdatahide = 'show';
          }

        }
        if(resultRetCode === "FAIL"){
          //暂无数据
          this.isdatahide = 'show';
          this.$toast(resultRetMsg);
        }  

      }).catch((error) => {
        //暂无数据
        this.isdatahide = 'show';
        this.$toast("请求失败"+error);
      });
    },
    goBack: function() {
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

