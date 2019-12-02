<template>
  <div class="task-query-page page">
    <van-nav-bar title="咨询帮助" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        意见反馈
      </div>
      <div class="page-panel-content">
        <van-cell-group>

          <van-field
            v-model="marknote"
            label="问题描述"
            type="textarea"
            placeholder="请输入问题描述"
            rows="1"
            autosize
          />
        </van-cell-group>

        <van-cell-group>
          <!-- 上传图片 -->
          <van-uploader :before-read="beforeRead" class="upload-icon" />
        </van-cell-group>
      </div>
    </van-panel>

    <div class="page-wrapper">
      <van-button 
      type="info" 
      size="large"
      @click="onSubmit"
      >确定</van-button>
    </div>
  </div>  
</template>

<script>
import Vue from 'vue'
import { NavBar,
  Panel,
  Cell, 
  CellGroup,  
  Icon, 
  Field,
  DatetimePicker,
  Picker,
  Popup,
  Toast,
  Button,
  Uploader
} from 'vant'

Vue.use(NavBar)
.use(Panel)
.use(Cell)
.use(CellGroup)
.use(Icon)
.use(Field)
.use(DatetimePicker)
.use(Picker)
.use(Popup)
.use(Toast)
.use(Button)
.use(Uploader)


export default {
  name: 'TaskInspectionFeedbackPage',
  props: {
    zIndex: Number,
  },
  data() {
    return {
      marknote: ''
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
    
      return true;
    },

    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          reject();
        } else {
          resolve();
        }
      });
    },

    onSubmit() {
      Toast("提交成功");
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

  .upload-icon {
    margin: 16px;
  }

}

</style>

