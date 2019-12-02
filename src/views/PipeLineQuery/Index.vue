<template>
  <div class="page">
    <van-nav-bar title="管线查询" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <div class="page-wrapper">
      <van-cell-group>
        <van-field 
          readonly
          clickable
          label="管线类别"
          :value="pipelineType"
          placeholder="请选择管线类别"
          @click="showPipelineTypePicker = true"
        />
        <van-popup v-model="showPipelineTypePicker" position="bottom">
          <van-picker 
            show-toolbar
            :columns="pipelineTypeColumns"
            @cancel="showPipelineTypePicker = false"
            @confirm="onConfirmPipelineType"
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
 Picker,
 Popup,
 Button
} from 'vant'
import DataDictionaryUtil from 'utils/DataDictionaryUtil'

export default {
  name: 'PipeLineQueryIndexPage',
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
      pipelineType: '',
      pipelineTypeId: '',
      showPipelineTypePicker: false,
      pipelineTypeColumns: [],
    }
  },
  mounted: function() {
    this.getDicCode();
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    getDicCode: function() {
      //字典值-管线类型
      this.request.httpPost(this.requestUrl.getDicListByCode, {
        dicCode: 'GL_PIPELINE.ENTITY_TYPE_ID'}
      ).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          for(let i=0; i<resultRetData.length; i++) {
            this.pipelineTypeColumns.push(resultRetData[i].name);
          }
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });
    },
    onConfirmPipelineType(pipelineType) {
      this.pipelineType = pipelineType;
      //根据管线类别名称反查id
      this.pipelineTypeId = DataDictionaryUtil.commonJudgePineLineTypeId(pipelineType);
      this.showPipelineTypePicker = false;
    },
    onSubmit: function (e) {
      e.preventDefault();
      //校验
      if(this.pipelineType == ''){
        this.$toast("请选择管线类别");
        return false;
      }else {
        //带参数的跳转页面
        this.$router.push({
          path:"pipeLineQueryList",
          query: {
            entityTypeId: this.pipelineTypeId,
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

