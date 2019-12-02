<template>
  <div class="task-page page">
    <van-nav-bar title="任务中心" fixed :zIndex="100"></van-nav-bar>

    <div class="page-wrapper">
      <van-grid clickable :column-num="3">
        <van-grid-item icon="peer-pay" text="巡检任务" to="/taskSub/inspectionList" />
        <van-grid-item icon="debit-pay" text="维修任务" to="/taskSub/repairList" />
        <van-grid-item icon="other-pay" text="更多" @click="onClickNavLink" />
      </van-grid>
    </div>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        巡检任务
      </div>
      <div class="page-panel-content page-icon-panel-content">
        <van-tag mark type="primary">今日巡检</van-tag>

        <van-row class="infomation-list">
          <van-col class="infomation-list-item van-hairline--surround" span="6">
            <div class="item-label">已完成</div>
            <div class="item-value">3</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="6">
            <div class="item-label">执行中</div>
            <div class="item-value">7</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="6">
            <div class="item-label">未完成</div>
            <div class="item-value">2</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="6">
            <div class="item-label">完成度</div>
            <div class="item-value">
              <van-circle
                v-model="currentRate0"
                size="50px"
                :color="gradientColor"
                layer-color="#f8f8f8"
                :rate="25"
                :speed="100"         
                :text="text0"
              />
            </div>
          </van-col>
        </van-row>

        <van-row class="infomation-list">
          <van-col class="infomation-list-item van-hairline--surround" span="4">
            <div class="item-label">总数</div>
            <div class="item-value">12</div>
          </van-col>  
          <van-col class="infomation-list-item van-hairline--surround" span="4">
            <div class="item-label">日检</div>
            <div class="item-value">2</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="4">
            <div class="item-label">周检</div>
            <div class="item-value">4</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="4">
            <div class="item-label">月检</div>
            <div class="item-value">4</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="4">
            <div class="item-label">季检</div>
            <div class="item-value">2</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="4">
            <div class="item-label">年检</div>
            <div class="item-value">0</div>
          </van-col>  
        </van-row>

        <van-row class="infomation-list">
          <van-col class="infomation-list-item van-hairline--surround" span="8">
            <div class="item-label">正常</div>
            <div class="item-value">8</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="8">
            <div class="item-label">异常</div>
            <div class="item-value">4</div>
          </van-col>       
          <van-col class="infomation-list-item van-hairline--surround" span="8">
            <div class="item-label">异常占比</div>
            <div class="item-value">
              <van-circle
                v-model="currentRate1"
                size="50px"
                :color="gradientColor"
                layer-color="#f8f8f8"
                :rate="33.3"
                :speed="100"         
                :text="text1"
              />
            </div>
          </van-col>
        </van-row>

      </div>
    </van-panel>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        维修任务
      </div>
      <div class="page-panel-content page-icon-panel-content">
        <van-tag mark type="primary">今日维修</van-tag>

        <van-row class="infomation-list">
          <van-col class="infomation-list-item van-hairline--surround" span="4">
            <div class="item-label">总数</div>
            <div class="item-value">12</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="5">
            <div class="item-label">已完成</div>
            <div class="item-value">2</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="5">
            <div class="item-label">执行中</div>
            <div class="item-value">6</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="5">
            <div class="item-label">未完成</div>
            <div class="item-value">4</div>
          </van-col>       
          <van-col class="infomation-list-item van-hairline--surround" span="5">
            <div class="item-label">完成度</div>
            <div class="item-value">
              <van-circle
                v-model="currentRate2"
                size="50px"
                :color="gradientColor"
                layer-color="#f8f8f8"
                :rate="16.7"
                :speed="100"         
                :text="text2"
              />
            </div>
          </van-col>
        </van-row>

        <van-row class="infomation-list">
          <van-col class="infomation-list-item van-hairline--surround" span="8">
            <div class="item-label">正常</div>
            <div class="item-value">2</div>
          </van-col>
          <van-col class="infomation-list-item van-hairline--surround" span="8">
            <div class="item-label">异常</div>
            <div class="item-value">5</div>
          </van-col>       
          <van-col class="infomation-list-item van-hairline--surround" span="8">
            <div class="item-label">异常占比</div>
            <div class="item-value">
              <van-circle
                v-model="currentRate3"
                size="50px"
                :color="gradientColor"
                layer-color="#f8f8f8"
                :rate="41.7"
                :speed="100"         
                :text="text3"
              />
            </div>
          </van-col>
        </van-row>

      </div>
    </van-panel>

    <!-- 底部tab栏组件 -->
    <v-footer></v-footer>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar,
 Panel, 
 Grid, 
 GridItem, 
 Row, 
 Col, 
 Icon,
 Toast, 
 Cell, 
 CellGroup, 
 Image, 
 Tag, 
 Step, 
 Steps, 
 Circle,
 Divider } from 'vant'
 import TheFooter from 'components/common/TheFooter'

Vue.use(NavBar)
.use(Panel)
.use(Grid)
.use(GridItem)
.use(Row)
.use(Col)
.use(Icon)
.use(Toast)
.use(Cell)
.use(CellGroup)
.use(Image)
.use(Tag)
.use(Step)
.use(Steps)
.use(Circle)
.use(Divider)

export default {
  name: 'TaskIndexPage',
  components: {
    'v-footer': TheFooter
  },
  props: {
    zIndex: Number,
  },
  data () {
    return {
      currentRate0: 0,
      currentRate1: 0,
      currentRate2: 0,
      currentRate3: 0,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      },
      tasks: [{
        id: 1,
        title:  '电力舱巡检完成',
        time: '2019-07-12 12:40'
      },{
        id: 2,
        title:  '热力舱巡检完成',
        time: '2019-06-12 12:40'
      },{
        id: 3,
        title:  '对管廊内消防设施、防护设施进行巡检，对逃生通道进行保养',
        time: '2019-05-12 12:40'
      },{
        id: 4,
        title:  '本周起，对消防器材进行重点巡检，请相关人员做好准备',
        time: '2019-04-12 12:40'
      },{
        id: 5,
        title:  '燃气舱巡检完成',
        time: '2019-03-12 12:40'
      }],
    }
  },
  computed: {
    text0() {
      return this.currentRate0.toFixed(0) + '%';
    },
    text1() {
      return this.currentRate1.toFixed(0) + '%';
    },
    text2() {
      return this.currentRate2.toFixed(0) + '%';
    },
    text3() {
      return this.currentRate3.toFixed(0) + '%';
    }
    
  },
  methods: {
    onClickNavLink: function () {
      this.$toast("更多功能暂未开放，敬请期待");
    },
  }
};
</script>

<style lang="less" scoped>
.page {
  padding: 46px 0 50px 0;
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

  .infomation-list {
    margin: 10px auto;
    &-item {
      padding: 6px;
      text-align: center;
      .item-label {
        margin-bottom: 5px;
      }

      .item-value {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: bolder;
      }


    }
  }

}
</style>

