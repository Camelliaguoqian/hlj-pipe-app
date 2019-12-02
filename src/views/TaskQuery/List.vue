<template>
  <div class="page">
    <van-nav-bar title="任务查询" 
    fixed 
    left-arrow 
    :zIndex="100" 
    @click-left="goBack"></van-nav-bar>

    <section class="page-wrapper">
      <!-- 任务list子组件调用 -->
      <status-list v-bind:listdata="taskquerylist"></status-list>
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
  name: 'TaskQueryListPage',
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
      taskquerylist: [],
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
      let startTime = this.$route.query.startTime;
      let endTime = this.$route.query.endTime;
      let status = this.$route.query.status;
      let code = this.$route.query.code;
     
      //数据查询-瀑布流滚动加载长列表
      this.request.httpPost(this.requestUrl.taskSearch, {
        pipeId: pipeId,
        startTime: startTime,
        endTime: endTime,
        status: status,
        code: code}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; 
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        let queryListData = resultRetData;
        
        if(resultRetCode === "SUCCESS"){
          //今日任务
          if(queryListData.length > 0) {
            for(let i=0; i<queryListData.length; i++) {
              let node = {};
              node.id = queryListData[i].resId;
              node.title = queryListData[i].name;
              node.time = '开始时间：' + queryListData[i].planStartTime;
              node.content = '结束时间：' + queryListData[i].planEndTime;
              node.status = DataDictionaryUtil.commonJudgeStatusType(queryListData[i].status).status;
              node.type = DataDictionaryUtil.commonJudgeStatusType(queryListData[i].status).classNameType;

              this.taskquerylist.push(node);
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

