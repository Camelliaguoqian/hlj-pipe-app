<template>
  <div class="page">
    <van-nav-bar title="环境监测" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    
    <van-sticky :offset-top="50">
      <div class="choose-title">
        <van-button class="choose-icon" icon="wap-nav" type="info" @click="onChoosePipeZone" />
      </div>
    </van-sticky>

    <div class="title-header-name">{{ pipeName }} {{ zoneName }}</div>

    <van-popup 
      v-model="showPipeZoneTreePicker" 
      :overlay="overlayHide" 
      position="right"
      :style="{ width: '80%',height: '73%' }">
      <van-collapse v-model="pipeActiveName" accordion>

        <van-collapse-item 
          v-for="item in pipeColumns"
          :key="item.id"
          :title="item.title" 
          class="pipe-list-wrapper" 
          :name="item.indexNum">
            <div class="zone-list-wrapper">
              <van-cell 
                v-for="zoneItem in zoneColumns"
                :key="zoneItem.id"
                :title="zoneItem.name" 
                is-link 
                @click="onChooseZoneLi(item.title,zoneItem.name)" />
            </div>
        </van-collapse-item>

      </van-collapse>
    </van-popup>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        综合舱
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="envlistdata"></simple-list>
      </div>
    </van-panel>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        综合中层
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="envlistdatalayer01"></simple-list>
      </div>
    </van-panel>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        综合中层
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="envlistdatalayer02"></simple-list>
      </div>
    </van-panel>

  </div>
</template>

<script>
import { NavBar,
  Panel,
  Sticky,
  Collapse, 
  CollapseItem,
  Cell, 
  CellGroup,
  Popup,
  Button
} from 'vant'
import SimpleList from 'components/list/SimpleList'

export default {
  name: 'EnvironmentalMonitoringListPage',
  components: {
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Sticky.name]: Sticky,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Button.name]: Button,
    'simple-list': SimpleList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      pipeName: '',
      zoneName: '',
      pipeColumns:[],
      zoneColumns:[],
      showPipeZoneTreePicker: false,
      overlayHide: true,
      pipeActiveName: '0',
      envlistdata: [
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
        
      ],
      envlistdatalayer01: [
        {
          label: '温度',
          value: '33℃',
        },
        {
          label: '湿度',
          value: '20%RH',
        },
        {
          label: '氧气含量',
          value: '22%',
        },
        
      ],
      envlistdatalayer02: [
        {
          label: '温度',
          value: '76℃',
        },
        {
          label: '湿度',
          value: '29%RH',
        },
        {
          label: '氧气含量',
          value: '25%',
        },
        
      ]
    };
  },
  mounted: function() {
    this.getPipeName();
    this.initZonePicker(26);
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    getPipeName: function() {
      //管廊名称
      this.request.httpPost(this.requestUrl.getPipe).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          for(let i=0; i<resultRetData.length; i++) {
            //this.pipeColumns.push(resultRetData[i].name);
            let node = {};
            node.id = resultRetData[i].resId;
            node.title = resultRetData[i].name;
            node.indexNum = JSON.stringify(i);

            this.pipeColumns.push(node);
          }
          this.pipeName = resultRetData[0].name;
        
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });
    },

    initZonePicker(pid) {
      //根据管廊ID查询分区接口
      this.request.httpPost(this.requestUrl.getZoneByPipe, {
        pipeId: pid}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          for(let i=0; i<resultRetData.length; i++) {
            //this.zoneColumns.push(resultRetData[i].name);
            let node = {};
            node.id = resultRetData[i].resId;
            node.name = resultRetData[i].name;
            
            this.zoneColumns.push(node);
          }
          this.zoneName = resultRetData[0].name;
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });
    },


    onChoosePipeZone: function() {
      //切换管廊分区
      this.showPipeZoneTreePicker = true;
    },
    onChooseZoneLi: function(pname, zname) {
      //选择分区
      this.showPipeZoneTreePicker = false;
      //更新页面上管廊和分区名称
      
      this.pipeName = pname;
      this.zoneName = zname;
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

  .choose-title {
    padding: 10px;
    height: 30px;
    background-color: transparent;
  }
  .choose-icon {
    float: right;
    z-index: 110;
    height: 30px;
    padding: 0 10px;
    line-height: 30px;
  }

  .title-header-name {
    position: absolute;
    top: 50px;
    padding: 10px;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    color: #6888c7;
  }

  .zone-list-wrapper {
    height: 500px;
    overflow-y: scroll;
  }

}
</style>




