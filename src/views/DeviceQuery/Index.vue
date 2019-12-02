<template>
  <div class="page">
    <van-nav-bar title="设备查询" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <div class="page-wrapper">
      <van-cell-group>
        <van-field 
          readonly
          required
          clickable
          label="所属管廊"
          :value="pipeName"
          placeholder="请选择所属管廊"
          @click="showPipePicker = true"
        />
        <van-popup v-model="showPipePicker" position="bottom">
          <van-picker 
            show-toolbar
            :columns="pipeColumns"
            @cancel="showPipePicker = false"
            @confirm="onConfirmPipe"
          />
        </van-popup>

        <van-field 
          readonly
          required
          clickable
          label="所属分区"
          :value="zoneName"
          placeholder="请选择所属分区"
          @click="onClickZonePicker"
        />
        <van-popup v-model="showZonePicker" position="bottom">
          <van-picker 
            show-toolbar
            :columns="zoneColumns"
            @cancel="showZonePicker = false"
            @confirm="onConfirmZone"
          />
        </van-popup>

        <van-field 
          readonly
          required
          clickable
          label="所属舱室"
          :value="cabinName"
          placeholder="请选择所属舱室"
          @click="onClickCabinPicker"
        />
        <van-popup v-model="showCabinPicker" position="bottom">
          <van-picker 
            show-toolbar
            :columns="cabinColumns"
            @cancel="showCabinPicker = false"
            @confirm="onConfirmCabin"
          />
        </van-popup>

        <van-field 
          readonly
          required
          clickable
          label="系统名称"
          :value="system"
          placeholder="请选择系统名称"
          @click="showSystemPicker = true"
        />
        <van-popup v-model="showSystemPicker" position="bottom">
          <van-picker 
            show-toolbar
            :columns="systemColumns"
            @cancel="showSystemPicker = false"
            @confirm="onConfirmSystem"
          />
        </van-popup>

        <van-field 
          readonly
          required
          clickable
          label="设备类型"
          :value="deviceType"
          placeholder="请选择设备类型"
          @click="showDeviceTypePicker = true"
        />
        <van-popup v-model="showDeviceTypePicker" position="bottom">
          <van-picker 
            show-toolbar
            :columns="deviceTypeColumns"
            @cancel="showDeviceTypePicker = false"
            @confirm="onConfirmDeviceType"
          />
        </van-popup>

        <!-- <van-field
          v-model="deviceCode"
          clearable
          label="设备编码"
          placeholder="请输入设备编码"
        /> -->

    
      </van-cell-group>
    </div>

    <div class="page-wrapper">
      <van-button 
      type="info" 
      size="large"
      @click="onSubmit"
      >提交查询</van-button>
    </div>
  </div>  
</template>

<script>
import { NavBar,
 Cell, 
 CellGroup,  
 Field,
 Picker,
 Popup,
 Button
} from 'vant'
import DataDictionaryUtil from 'utils/DataDictionaryUtil'

export default {
  name: 'DeviceQueryIndexPage',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Button.name]: Button
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      pipeName: '',
      pipeId: '',
      showPipePicker: false,
      pipeColumns: [],
      zoneName: '',
      zoneId: '',
      showZonePicker: false,
      zoneColumns: [],
      cabinName: '',
      cabinId: '',
      showCabinPicker: false,
      cabinColumns: [],
      system: '',
      systemId: '',
      showSystemPicker: false,
      systemColumns: [],
      deviceType: '',
      devTypeId: '',
      showDeviceTypePicker: false,
      deviceTypeColumns: [],
      deviceCode: '',
    }
  },
  mounted: function() {
    this.getDicCode();
    this.getPipeName();
  },
  methods: {
    goBack: function() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    getDicCode: function() {
      //字典值-系统名称
      this.request.httpPost(this.requestUrl.getDicListByCode, {
        dicCode: 'IOT_DEVICE.SYSTEMID'}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          for(let i=0; i<resultRetData.length; i++) {
            this.systemColumns.push(resultRetData[i].name);
          }
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });

      //字典值-设备类型
      this.request.httpPost(this.requestUrl.getDicListByCode, {
        dicCode: 'IOT_DEVICE.DEVTYPEID'}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          for(let i=0; i<resultRetData.length; i++) {
            this.deviceTypeColumns.push(resultRetData[i].name);
          }
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });

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
            this.pipeColumns.push(resultRetData[i].name);
          }
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
            this.zoneColumns.push(resultRetData[i].name);
          }
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });
    },
    initCabinPicker(pid,zid) {
      //根据管廊ID、分区ID查询舱室接口
      this.request.httpPost(this.requestUrl.getCabinByPipeZone, {
        pipeId: pid,
        zoneId: zid}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          for(let i=0; i<resultRetData.length; i++) {
            this.cabinColumns.push(resultRetData[i].name);
          }
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });
    },


    onConfirmPipe: function(pipeName) {
      this.pipeName = pipeName;
      switch(pipeName) {
        case '黑龙江路综合管廊':
          this.pipeId = '26';
          break;
      }
      this.showPipePicker = false;

      //根据管廊ID查询分区接口
      this.initZonePicker(this.pipeId);
    },
    onClickZonePicker: function() {
      //分区选择前先选择管廊
      if(this.pipeName =='') {
        this.$toast("请先选择所属管廊");
      }else {
        this.showZonePicker = true;
      }
    },
    onConfirmZone: function(zoneName) {
      this.zoneName = zoneName;
      switch(zoneName) {
        case '01#':
          this.zoneId = '201';
          break;
        case '02#':
          this.zoneId = '202';
          break;
        case '03#':
          this.zoneId = '203';
          break;
        case '04#':
          this.zoneId = '204';
          break;
        case '05#':
          this.zoneId = '205';
          break;
      }
      this.showZonePicker = false;

      //根据管廊ID查询分区接口
      this.initCabinPicker(this.pipeId,this.zoneId);
    },
    onClickCabinPicker: function() {
      //舱室选择前先选择管廊和分区
      if(this.pipeName =='') {
        this.$toast("请先选择所属管廊");
      }else if(this.zoneName =='') {
        this.$toast("请先选择所属分区");
      }else {
        this.showCabinPicker = true;
      }
    },
    onConfirmCabin: function(cabinName) {
      this.cabinName = cabinName;
      switch(cabinName) {
        case '综合舱001':
          this.cabinId = '601';
          break;
        case '综合中层001':
          this.cabinId = '612';
          break;
        case '综合中层002':
          this.cabinId = '613';
          break;
        
      }
      this.showCabinPicker = false;
    },
    onConfirmSystem: function(system) {
      this.system = system;
      //根据系统名称反查id
      this.systemId = DataDictionaryUtil.commonJudgeSystemId(system);
      this.showSystemPicker = false;
    },
    onConfirmDeviceType: function(deviceType) {
      this.deviceType = deviceType;
      this.devTypeId = '104027';
      this.showDeviceTypePicker = false;
    },
    onSubmit: function (e) { console.log(this.pipeId + ''+ this.zoneId+ ''+ this.cabinId+''+this.systemId+ ''+ this.devTypeId);
      e.preventDefault();
      //校验
      if(this.pipeId == ''
      || this.zoneId == ''
      || this.cabinId == ''
      || this.systemId == ''
      || this.devTypeId == ''){
        this.$toast("请选择所有必填选择");
        return false;
      }else {
        //带参数的跳转页面
        this.$router.push({
          path:"deviceQueryList",
          query: {
            pipeId: this.pipeId,
            zoneId: this.zoneId,
            cabinId: this.cabinId,
            systemId: this.systemId,
            devTypeId: this.devTypeId,
          }
        })
      }
    }
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

