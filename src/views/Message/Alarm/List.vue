<template>
  <div class="page-inner">
    <van-nav-bar title="报警消息" 
    fixed 
    :zIndex="100" 
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <section class="page-wrapper">
      <!-- list子组件调用 -->
      <message2-list v-bind:listdata="alarmlist"></message2-list>
    </section>

  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar,
 Panel,  
 Icon,
} from 'vant'
import Message2List from 'components/list/Message2List'

Vue.use(NavBar)
.use(Panel)
.use(Icon)


export default {
  name: 'MessageAlarmListPage',
  components: {
    'message2-list': Message2List
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      alarmlist: [
        {
          id: '1',
          title: '黑龙江路 04# 综合舱 温度报警',
          time: '2019-10-08 09：00：00',
          system: '监控与报警系统',
          url: '/message/messageAlarmDetail',
        },
        {
          id: '2',
          title: '黑龙江路 01# 综合舱 湿度报警',
          time: '2019-10-09 09：00：00',
          system: '监控与报警系统',
          url: '/message/messageAlarmDetail',
        },
        {
          id: '2',
          title: '黑龙江路 09#-10# 综合夹层 风机故障',
          time: '2019-10-11 09：00：00',
          system: '监控与报警系统',
          url: '/message/messageAlarmDetail',
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


