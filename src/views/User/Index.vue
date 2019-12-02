<template>
  <div class="user-page page">
    <van-nav-bar title="个人中心" fixed :zIndex="100"></van-nav-bar>

    <div class="user-poster">
      <van-row>
        <van-col class="user-poster-image" span=6>
          <van-image class="user-avatar" round :src="userAvatarUrl" />
        </van-col>
        <van-col class="user-poster-info" span=16>
          <ul>
            <li class="account-item">
              <span class="account-item-name">{{ userName }}</span>
            </li>
            <li class="account-item">
              <van-icon class="account-item-icon" name="contact" />
              <span class="account-item-phone">{{ telCode }}</span>
              <van-tag class="account-item-status" type="warning">管理员</van-tag>
            </li>
          </ul>
        </van-col>
      </van-row>
    </div>

    <van-cell-group class="cell-group-list">
      <van-cell icon="manager-o" title="基本信息" is-link to="basicUser" />
      <van-cell icon="browsing-history-o" title="密码修改" is-link to="passwordModify" />
    </van-cell-group>

    <van-cell-group class="cell-group-list">
      <van-cell icon="service-o" title="咨询帮助" is-link to="help" />
      <!-- <van-cell icon="comment-o" title="问题反馈" is-link /> -->
      <van-cell icon="desktop-o" title="关于" is-link to="about" />
    </van-cell-group>

    <!-- 退出登录 -->
    <section class="btn-wrapper">
      <van-button plain hairline round type="info" size="large" @click="loginOut">退出登录</van-button>
    </section>

    <!-- 底部tab栏组件 -->
    <v-footer></v-footer>
  </div>
</template>

<script>
import { NavBar,
 Grid, 
 GridItem, 
 Row, 
 Col, 
 Cell, 
 CellGroup, 
 Image, 
 Tag, 
 Button } from 'vant'
import TheFooter from 'components/common/TheFooter'

export default {
  name: 'UserIndexPage',
  components: {
    'v-footer': TheFooter,
    [NavBar.name]: NavBar,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Button.name]: Button,
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      userAvatarUrl: require('assets/image/user/avatar.png'),
      userName: '系统管理员',
      telCode: '15223231111'
    }
  },
  mounted: function() {
    this.getUserName();
  },
  methods: {
    //用户信息
    getUserName: function() {
      this.request.httpPost(this.requestUrl.getUser).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          //this.userName = resultRetData.user_name;
          //this.telCode = resultRetData.user_code;
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });
    },

    //退出登录
    loginOut: function() {
      this.request.httpPost(this.requestUrl.userLoginOut).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; 
      
        if(resultRetCode === "SUCCESS"){
          this.$router.replace('/login');
        }
      });
      
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  padding: 46px 0 50px 0;
  .user {
    &-poster {
      padding: 10px 16px;
      display: block;
      height: 100px;
      background-color: rgba(91, 193, 211, 0.9);
      .user-avatar {
        margin: 10px auto;
        width: 80px;
        height: 80px;
      }

      &-info ul{
        margin: 25px 10px;
        .account-item {
          line-height: 24px;
          color: #fff;
          &-name {
            font-size: 14px;
          }
          &-icon {
            margin-right: 2px;
            vertical-align: middle;
            font-size: 12px;
          }
          &-phone {
            font-size: 12px;
          }
          &-status {
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }

      &-operate {
        text-align: right;
        line-height: 100px;
        color: #fff;
      }
    }

    &-group {
      margin-bottom: 15px;
    }

    &-links {
      padding: 15px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;

      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }

  .cell-group-list {
    margin-top: 10px;
  }

  .btn-wrapper {
    padding: 0 40px;
    margin: 20px auto;
  }
}
</style>
