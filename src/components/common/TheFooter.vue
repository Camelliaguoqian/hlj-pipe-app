<template>
  <!-- 开启 safe-area-inset-bottom 属性 -->
  <van-tabbar v-model="active" :zIndex="100" route safe-area-inset-bottom>
    <van-tabbar-item name="home" replace to="/home">
      <van-icon
        slot="icon"
        class-prefix="iconfont"
        name="bar-home" />首页
    </van-tabbar-item>
    <van-tabbar-item name="task" replace to="/task" dot>
      <van-icon
        slot="icon"
        class-prefix="iconfont"
        name="bar-task" />任务
    </van-tabbar-item>
    <van-tabbar-item name="message" replace to="/message" :info="NoticeNum">
      <van-icon
        slot="icon"
        class-prefix="iconfont"
        name="bar-msg" />消息
    </van-tabbar-item>
    <van-tabbar-item name="user" replace to="/user" dot>
      <van-icon
        slot="icon"
        class-prefix="iconfont"
        name="bar-user" />我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'TheFooter',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      active: 'home',
      NoticeNum: ''
    }
  },
  mounted: function() {
    this.getNoticeNum();
  },
  methods: {
    //通知消息- 查询所有消息时，isRead='';查询未读消息时，isRead='0'
    getNoticeNum: function() {
      this.request.httpPost(this.requestUrl.noticeSearch,{isRead:'0'}).then(data => {
        let result = data; 
        let resultRetCode = result.retCode; console.log(data);
        let resultRetMsg = result.retMsg; 
        let resultRetData = result.retData; 
        
        if(resultRetCode === "SUCCESS"){
          //this.$toast(resultRetMsg);
          this.NoticeNum = '8';
        }
        if(resultRetCode === "FAIL"){
          this.$toast(resultRetMsg);
        } 
      }).catch((error) => {
        this.$toast("请求失败"+error);
      });
    },

  }
}
</script>
