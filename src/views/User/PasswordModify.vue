<template>
  <div class="page">
    <van-nav-bar title="修改密码" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

     <div class="page-wrapper">
        <van-cell-group>
          <van-field
            v-model="oldPassword"
            clearable
            type="password"
            label="原密码"
            placeholder="请输入原密码"
            class="login-input"
            right-icon="question-o"
            @click-right-icon="$toast('密码必须是数字、字母、下划线')"
          />

          <van-field
            v-model="newPassword"
            clearable
            type="password"
            label="新密码"
            placeholder="请输入新密码"
            class="login-input"
            right-icon="question-o"
            @click-right-icon="$toast('密码必须是数字、字母、下划线')"
          />

          <van-field
            v-model="confirmPassword"
            clearable
            type="password"
            label="确认密码"
            placeholder="请确认新密码"
            class="login-input"
            right-icon="question-o"
            @click-right-icon="$toast('密码必须是数字、字母、下划线')"
          />

        </van-cell-group>

        <section class="page-wrapper">
          <van-button type="info" size="large" @click="onClickButtonSubmit">确认</van-button>
        </section>

    </div>  

  </div>  
</template>

<script>
import Vue from 'vue'
import { NavBar,
 Cell, 
 CellGroup,  
 Icon, 
 Field,
 DatetimePicker,
 Picker,
 Popup,
 Toast,
 Button
} from 'vant'

Vue.use(NavBar)
.use(Cell)
.use(CellGroup)
.use(Icon)
.use(Field)
.use(DatetimePicker)
.use(Picker)
.use(Popup)
.use(Toast)
.use(Button)


export default {
  name: 'PasswordModifyPage',
  props: {
    zIndex: Number,
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  methods: {
    // 表单提交
    onClickButtonSubmit: function (e) {
      if(this.oldPassword == '' || this.newPassword == '' || this.confirmPassword == ''){
        this.$toast("密码不能为空");
        return false;
      }
      if(this.newPassword !== this.confirmPassword){
        this.$toast("2次输入密码不一致，请重输");
        return false;
      }
      else{
        this.$router.replace('/User');
        e.preventDefault();
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
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

  .btn-wrapper {
    padding: 0 40px;
    margin: 20px auto;
  }

}
</style>

