<template>
  <div class="page">
    <van-nav-bar title="报警查询" 
    fixed 
    left-arrow 
    :zIndex="100" 
    @click-left="goBack"></van-nav-bar>

    <div class="page-wrapper">
      <van-cell-group>
        <van-field 
          readonly
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
          clickable
          label="报警级别"
          :value="level"
          placeholder="请选择报警级别"
          @click="showLevelPicker = true"
        />
        <van-popup v-model="showLevelPicker" position="bottom">
          <van-picker 
            show-toolbar
            :columns="levelColumns"
            @cancel="showLevelPicker = false"
            @confirm="onConfirmLevel"
          />
        </van-popup>

        <van-field 
          readonly
          clickable
          label="起始时间"
          :value="startDateVal"
          placeholder="请选择起始时间"
          @click="showStartDatePicker = true"
        />
        <van-popup v-model="showStartDatePicker" position="bottom">
          <van-datetime-picker 
            v-model="startDate"
            type="date"
            :min-date="minDate"
            @cancel="showStartDatePicker = false"
            @confirm="onConfirmStartDate"
          />
        </van-popup>

        <van-field 
          readonly
          clickable
          label="终止时间"
          :value="endDateVal"
          placeholder="请选择终止时间"
          @click="onClickEndDatePicker"
        />
        <van-popup v-model="showEndDatePicker" position="bottom">
          <van-datetime-picker 
            v-model="endDate"
            type="date"
            :min-date="minDate"
            @cancel="showEndDatePicker = false"
            @confirm="onConfirmEndDate"
          />
        </van-popup>        

    
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
 DatetimePicker,
 Picker,
 Popup,
 Button
} from 'vant'
import DateUtil from 'utils/DateUtil'
import DataDictionaryUtil from 'utils/DataDictionaryUtil'

export default {
  name: 'AlarmQueryIndexPage',
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
      minDate: DateUtil.format(DateUtil.date(),'YYYY-MM-DD'),
      startDateVal: '',
      endDateVal: '',
      startDate: new Date(),
      endDate: new Date(),
      showStartDatePicker: false,
      showEndDatePicker: false,
      orderCode: '',
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
      level: '',
      alamLevelId: '',
      showLevelPicker: false,
      levelColumns: [],
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

      //字典值-告警级别
      this.request.httpPost(this.requestUrl.getDicListByCode, {
        dicCode: 'POW_DEF_ALARM.ALARM_LEVEL'}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          for(let i=0; i<resultRetData.length; i++) {
            this.levelColumns.push(resultRetData[i].name);
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
      this.showCabinPicker = false;
    },

    onConfirmSystem: function(system) {
      this.system = system;
      //根据系统名称反查id
      this.systemId = DataDictionaryUtil.commonJudgeSystemId(system);
      this.showSystemPicker = false;
    },
    onConfirmLevel: function(level) {
      this.level = level;
      //根据报警级别名称反查id
      this.alamLevelId = DataDictionaryUtil.commonJudgeAlarmLevelId(level);
      this.showLevelPicker = false;
    },

    onConfirmStartDate: function(val) {
      console.log(val);
      let currentVal = DateUtil.format(val,'YYYY-MM-DD');
      this.startDateVal = currentVal;
      this.showStartDatePicker = false;
    },
    onClickEndDatePicker: function() {
      //终止时间选择前，先选择起始时间
      if(this.startDateVal =='') {
        this.$toast("请先选择起始时间");
      }else {
        this.showEndDatePicker = true;
      }
    },
    onConfirmEndDate: function(val) {
      console.log(val);
      let currentVal = DateUtil.format(val,'YYYY-MM-DD');
      this.endDateVal = currentVal;
      this.showEndDatePicker = false;
    },
    onSubmit: function (e) {
      e.preventDefault();
      //校验
      if(this.pipeId == '' 
      && this.zoneId == '' 
      && this.cabinId == '' 
      && this.startDateVal == '' 
      && this.endDateVal == '' 
      && this.systemId == '' 
      && this.level == ''){
        this.$toast("请至少选择一项查询条件");
        return false;
      }else {
        //带参数的跳转页面
        this.$router.push({
          path:"alarmQueryList",
          query: {
          pipeId: this.pipeId,
          zoneId: this.zoneId,
          cabinId: this.cabinId,
          startTime: this.startDateVal,
          endTime: this.endDateVal,
          systemId: this.systemId,
          alarmLevel: this.alamLevelId
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

