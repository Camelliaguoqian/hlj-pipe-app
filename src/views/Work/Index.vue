<template>
  <div class="page">
    <van-nav-bar title="工作任务" 
    fixed 
    left-arrow 
    :zIndex="100" 
    @click-left="goBack"></van-nav-bar>

    <section class="page-wrapper">
      <van-tabs v-model="activeTab">
          <van-tab title="今日任务" name="dayTab">
            <!-- 任务list子组件调用 -->
            <status-list v-bind:listdata="daylist"></status-list>
            <!-- 暂无数据组件 -->
            <default-data v-bind:nodata="isdaylisthide"></default-data>
          </van-tab>
          <van-tab title="本周任务" name="weekTab">
            <!-- 任务list子组件调用 -->
            <status-list v-bind:listdata="weeklist"></status-list>
            <!-- 暂无数据组件 -->
            <default-data v-bind:nodata="isweeklisthide"></default-data>
          </van-tab>
        </van-tabs>
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
import DataDictionaryUtil from 'utils/DataDictionaryUtil.js'

export default {
  name: 'WorkTaskPage',
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
      activeTab: 'dayTab',
      daylist: [],
      weeklist: [],
      isdaylisthide: 'hide',
      isweeklisthide: 'hide'
    }
  },
  mounted: function() {
    this.initData();
  },
  methods: {
    initData: function() {
      //工作任务- 今日任务 、 本周任务
      this.request.httpPost(this.requestUrl.workTaskList).then(data => {
          let result = data; 
          let resultRetCode = result.retCode; 
          let resultRetMsg = result.retMsg; 
          let resultRetData = result.retData; 
          let todayTaskData = resultRetData.todayTask;
          let weekTaskData = resultRetData.sevenDaysTask;
          console.log(result);
          console.log(resultRetCode);
          console.log(resultRetMsg);
          console.log(resultRetData);

          if(resultRetCode === "SUCCESS"){
            //今日任务
            if(todayTaskData.length > 0) {
              for(let i=0; i<todayTaskData.length; i++) {
                let node = {};
                node.id = todayTaskData[i].resId;
                node.title = todayTaskData[i].name;
                node.time = '开始时间：' + todayTaskData[i].planStartTime;
                node.content = '结束时间：' + todayTaskData[i].planEndTime;
                node.status = DataDictionaryUtil.commonJudgeStatusType(todayTaskData[i].status).status;
                node.type = DataDictionaryUtil.commonJudgeStatusType(todayTaskData[i].status).classNameType;
                node.url = '/workDetail';

                this.daylist.push(node);
              }
            }else{
              //暂无数据
              this.isdaylisthide='show';
            }
            

            //本周任务
            if(weekTaskData.length > 0) {
              for(let i=0; i<weekTaskData.length; i++) {
                let node = {};
                node.id = weekTaskData[i].resId;
                node.title = weekTaskData[i].name;
                node.time = '开始时间：' + weekTaskData[i].planStartTime;
                node.content = '结束时间：' + weekTaskData[i].planEndTime;
                node.status = DataDictionaryUtil.commonJudgeStatusType(weekTaskData[i].status).status;
                node.type = DataDictionaryUtil.commonJudgeStatusType(weekTaskData[i].status).classNameType;
                node.url = '/workDetail';

                //console.log(DataDictionaryUtil.commonJudgeStatusType(weekTaskData[i].status));

                this.weeklist.push(node); 
              }
            }else{
              //暂无数据
              this.isweeklisthide='show';
            }
          
          }
          if(resultRetCode === "FAIL"){
            //暂无数据
            this.isdaylisthide='show';
            this.isweeklisthide='show';
            this.$toast(resultRetMsg);
          }  

        }).catch((error) => {
          //暂无数据
          this.isdaylisthide='show';
          this.isweeklisthide='show';
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

