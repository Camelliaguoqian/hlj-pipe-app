<template>
  <div class="task-query-page page">
    <van-nav-bar title="任务查询" 
    fixed 
    left-arrow 
    :zIndex="100" 
    @click-left="goBack"></van-nav-bar>

    <div class="page-wrapper">
      <van-cell-group>
        <van-field 
          :value="pipeName"
          readonly
          clickable
          label="所属管廊"
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

        <van-field 
          readonly
          clickable
          label="工单状态"
          :value="status"
          placeholder="请选择工单状态"
          @click="showStatusPicker = true"
        />
        <van-popup v-model="showStatusPicker" position="bottom">
          <van-picker 
            show-toolbar
            :columns="statusColumns"
            @cancel="showStatusPicker = false"
            @confirm="onConfirmStatus"
          />
        </van-popup>

        <van-field
          v-model="orderCode"
          clearable
          label="工单编码"
          right-icon="question-o"
          placeholder="请输入工单编码"
          @click-right-icon="$toast('包含巡检任务和维修任务的工单编码')"
        />
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
  name: 'TaskQueryIndexPage',
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
      status: '',
      statusId: '',
      showStatusPicker: false,
      statusColumns: [],
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
      //字典值-工单状态
      this.request.httpPost(this.requestUrl.getDicListByCode, {
        dicCode: 'GL_WORK_ORDER.STATUS'}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          for(let i=0; i<resultRetData.length; i++) {
            this.statusColumns.push(resultRetData[i].name);
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
    onConfirmPipe: function(pipeName) {
      this.pipeName = pipeName;
      switch(pipeName) {
        case '黑龙江路综合管廊':
          this.pipeId = '26';
          break;
      }
      this.showPipePicker = false;
    },

    onConfirmStatus: function(status) {
      this.status = status;
      //根据状态值反查状态id
      this.statusId = DataDictionaryUtil.commonJudgeStatusTypeId(status);
      this.showStatusPicker = false;
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
      && this.startDateVal == '' 
      && this.endDateVal == '' 
      && this.statusId == '' 
      && this.orderCode == ''){
        this.$toast("请至少选择一项查询条件");
        return false;
      }else {
        //带参数的跳转页面
        this.$router.push({
          path:"taskQueryList",
          query: {
            pipeId: this.pipeId,
            startTime: this.startDateVal,
            endTime: this.endDateVal,
            status: this.statusId,
            code: this.orderCode
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

