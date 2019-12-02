<template>
  <div class="page-inner">
    <van-nav-bar title="通知消息" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <section class="page-wrapper">
      <!-- list子组件调用 -->
      <message-list v-bind:listdata="noticelist"></message-list>
    </section>

  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar,
 Panel,  
 Icon,
} from 'vant'
import MessageList from 'components/list/MessageList'

Vue.use(NavBar)
.use(Panel)
.use(Icon)


export default {
  name: 'MessageNoticeListPage',
  components: {
    'message-list': MessageList
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      noticelist: [
        {
          id: '1',
          title: '应急通知',
          time: '2019-10-08 09：00：00',
          status: '已读',
          type: 'success',
          url: '/message/messageNoticeDetail',
        },
        {
          id: '2',
          title: '应急通知',
          time: '2019-10-09 09：00：00',
          status: '未读',
          type: 'danger',
          url: '/message/messageNoticeDetail',
        },
        {
          id: '2',
          title: '应急通知',
          time: '2019-10-11 09：00：00',
          status: '未读',
          type: 'danger',
          url: '/message/messageNoticeDetail',
        },
      ],
    };
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  }
}
</script>

<style lang="less" scoped>

</style>


