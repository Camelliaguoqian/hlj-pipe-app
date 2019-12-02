<template>
  <div class="page">
    <van-nav-bar title="管线查询"  
    :zIndex="100" 
    fixed
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <section class="page-wrapper">
      <!-- list子组件调用 -->
      <message2-list :listdata="pipelinelist"></message2-list>
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
  name: 'PipeLineQueryListPage',
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
      pipelinelist: [],
      isdatahide: 'hide'
    }
  },
  mounted: function() {
    this.initData();
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
      let entityTypeId = this.$route.query.entityTypeId;
     
      //数据查询-瀑布流滚动加载长列表
      this.request.httpPost(this.requestUrl.pipeLineSearch, {
        entityTypeId: entityTypeId}
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
              node.title = queryListData[i].name;
              node.system = queryListData[i].code;
              node.time = queryListData[i].smallTypeIdName;
              node.url = '/pipeLineQueryDetail';
            
              this.pipelinelist.push(node);
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

