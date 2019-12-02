<template>
  <div class="page">
    <van-nav-bar title="设备查询"  
    :zIndex="100" 
    fixed
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <section class="page-wrapper">
      <!-- list子组件调用 -->
      <message2-list :listdata="devicelist"></message2-list>
      <!-- 暂无数据组件 -->
      <default-data v-bind:nodata="isdatahide"></default-data> 
    </section>
    
  </div>
</template>

<script>
import { NavBar,
 Panel,
} from 'vant'
import DefaultData from 'components/common/DefaultData'
import Message2List from 'components/list/Message2List'


export default {
  name: 'PipeQueryListPage',
  components: {
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    'default-data': DefaultData,
    'message2-list': Message2List
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      devicelist: [{
        id: '1',
        title: '综合舱摄像头005',
        system: '监控与报警系统',
        time: '2019-11-01',
        url: '/scan'
      },{
        id: '2',
        title: '综合舱氧气传感器001',
        system: '监控与报警系统',
        time: '2019-05-21',
        url: '/scan'
      },{
        id: '3',
        title: '综合舱温湿度传感器003',
        system: '监控与报警系统',
        time: '2019-06-06',
        url: '/scan'
      },],
      isdatahide: 'hide'
    }
  },
  mounted: function() {
    //this.initData();
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    initData: function() {
      /**
       * 获取父组件路由传过来的参数值
       * 方法1：this.$router.currentRoute.query.pipeId
       * 方法2：this.$route.query.pipeId
       */
      let pipeId = this.$route.query.pipeId;
      let zoneId = this.$route.query.zoneId;
      let cabinId = this.$route.query.cabinId;
      let systemId = this.$route.query.systemId;
      let devTypeId = this.$route.query.devTypeId;
      
      //数据查询-瀑布流滚动加载长列表
      this.request.httpPost(this.requestUrl.deviceSearch, {
        pipeId: pipeId,
        zoneId: zoneId,
        cabinId: cabinId,
        systemId: systemId,
        devTypeId: devTypeId,}
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
              node.id = queryListData[i].devid;
              node.title = queryListData[i].devname;
              node.system = queryListData[i].devcode;
              node.time = queryListData[i].installAddress;
              node.url = '/scan';
            
              this.devicelist.push(node);
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

