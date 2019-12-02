<template>
  <div class="login-form">
    <div class="login-form-top">
      <van-image
        class="pipe-bg"
        width="200"
        height="200"
        round
        fit="cover"
        :src="imgUrl"
      />
      <p class="login-title">综合管廊运维助手</p>
    </div>
    
    <!-- 登录页 用户表单 -->
    <van-cell-group>
      <van-field
        v-model="userCode"
        clearable
        label="用户名"
        label-width	="60px"
        placeholder="请输入用户名"
        right-icon="question-o"
        @click-right-icon="$toast('用户名支持姓名、手机号')"
      >
        <van-icon
          slot="left-icon"
          class-prefix="iconfont"
          name="login-user" />
      </van-field>
      
      <van-field
        v-model="userPwd"
        clearable
        type="password"
        label="密码"
        label-width	="60px"
        placeholder="请输入密码"
        right-icon="question-o"
        @click-right-icon="$toast('密码必须是数字、字母、下划线')"
      >
        <van-icon
          slot="left-icon"
          class-prefix="iconfont"
          name="login-pwd" />
      </van-field>
      
    </van-cell-group>

    <!--登录按钮-->
    <div class="login-form-btn">
      <van-button 
      round 
      size="large" 
      color="linear-gradient(to right, #4bb0ff, #6149f6)" 
      @click="onSubmit">登录</van-button>
      <!-- 忘记密码 -->
      <router-link class="tips" to="passwordModify">忘记密码?</router-link>
    </div>
    
  </div>
</template>

<script>
import { Field, Cell, CellGroup, Button, Image} from 'vant'

export default {
  name: 'LoginPage',
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Image.name]: Image,
  },
  data () {
    return {
      imgUrl: require('assets/image/mainScreenBg.png'),
      errors: [],
      userCode: '',
      userPwd: ''
    }
  },
  methods: {
    // 表单提交
    onSubmit: function (e) {
      if(this.userCode == ''){
        this.$toast("用户名不能为空");
        return false;
      }else if(this.userPwd == ''){
        this.$toast("密码不能为空");
        return false;
      }else{
        let md5UserPwd = this.$md5(this.userPwd);

        this.request.httpPost(this.requestUrl.userLogin, {
          userCode: this.userCode,
          userPwd: md5UserPwd}
        ).then(data => {
          let result = data; 
          let resultRetCode = result.retCode; 
          let resultRetMsg = result.retMsg; 
          
          if(resultRetCode === "SUCCESS"){
            this.$toast(resultRetMsg);
            //登录成功到首页
            this.$router.replace('/home');
          }
          if(resultRetCode === "FAIL"){
            this.$toast(resultRetMsg);
          }  

        }).catch((error) => {
          this.$toast("请求失败"+error);
        });
        
        e.preventDefault();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 18px;
}

.error-msg {
  font-size: 12px;
  color: red;
}

.login-form {
  margin: 0 auto;
  padding: 16px;
  height: calc(100vh - 32px);
  background-color: #fff;
  &-top {
    display: block;
    margin: 0 auto;
    padding: 30px 0;
    text-align: center;
    font-weight: 100;
    color: #3d3d3d;
  }

  .login-title {
    margin: 20px 0 auto;
    font-size: 24px;
    font-weight: bolder;
    color: #000;
  }

  &-btn {
    margin-top: 40px;
    text-align: center;
    .tips {
      display: block;
      margin-top: 20px;
      font-size: 14px;
      color: #969799;
    }
  }


}
</style>