<template>
  <div class="page">
    <van-nav-bar title="管廊查询"  
    :zIndex="100" 
    fixed
    left-arrow 
    @click-left="goBack"></van-nav-bar>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        管廊基本信息
      </div>
      <div class="page-panel-content">
        <!-- 简单信息列表组件 -->
        <simple-list :listdata="pipeinfolist"></simple-list>
      </div>
    </van-panel>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        设备信息统计
      </div>
      <div class="page-panel-content page-icon-panel-content">
        <div class="chart-wrap">
          <v-chart :options="vendorBar" />
        </div>
      </div>
    </van-panel>

    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        历史报警分析
      </div>
      <div class="page-panel-content page-icon-panel-content">
        <div class="chart-wrap">
          <v-chart :options="vendorStatusPie" />
        </div>
      </div>
    </van-panel>
    
  </div>
</template>

<script>
import { NavBar,
 Panel,
} from 'vant'
import SimpleList from 'components/list/SimpleList'
import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'

export default {
  name: 'PipeQueryListPage',
  components: {
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    "simple-list": SimpleList,
    'v-chart': ECharts
  },
  props: {
    zIndex: Number,
  },
  data() {
    return {
      pipeinfolist: [
        {
          label: "管廊编码",
          value: "GL-107901-1002",
        },
        {
          label: "管廊名称",
          value: "黑龙江路综合管廊",
        },
        // {
        //   label: "安全结构等级",
        //   value: "2级",
        // },
        {
          label: "断面形式",
          value: "单舱",
        },
        {
          label: "长度",
          value: "1.9公里",
        },
        // {
        //   label: "宽度",
        //   value: "10米",
        // },
        // {
        //   label: "高度",
        //   value: "5米",
        // },
        {
          label: "建设时间",
          value: "2019-04-28",
        },
        // {
        //   label: "竣工时间",
        //   value: "2018-10-14",
        // },
        // {
        //   label: "设计单位",
        //   value: "合肥市市政设计院",
        // },
        // {
        //   label: "建设单位",
        //   value: "合肥市滨湖新区开发区管委会",
        // },
        // {
        //   label: "监理单位",
        //   value: "上海新光工程咨询有限公司",
        // },
        // {
        //   label: "权属单位",
        //   value: "黑龙江路管廊投资建设有限公司",
        // },
        // {
        //   label: "施工单位",
        //   value: "中国能源建设集团安徽电力建设第一工程有限公司",
        // },
        // {
        //   label: "建设费用",
        //   value: "383.11万元",
        // },
      ],
      vendorBar: {},
      vendorStatusPie: {},

    }
  },
  mounted: function() {
    this.initData();
    this.initChart();
  },
  methods: {
    goBack: function() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    initData: function() {
      /**
       * 获取父组件路由传过来的参数值
       * 方法1：this.$router.currentRoute.query.pipeId
       * 方法2：this.$route.query.pipeId
       */
      let pipeId = this.$route.query.pipeId;

    },
    initChart: function() {
      // let data = []

      // for (let i = 0; i <= 360; i++) {
      //     let t = i / 180 * Math.PI
      //     let r = Math.sin(2 * t) * Math.cos(2 * t)
      //     data.push([r, i])
      // }

      const resultData = [{
        nodeNum: "13", vendor: "驰诚",
      },{
        nodeNum: "8", vendor: "宝临",
      },{
        nodeNum: "5", vendor: null,
      },{
        nodeNum: "9", vendor: null,
      },{
        nodeNum: "14", vendor: null,
      },{
        nodeNum: "22", vendor: "顺安居",
      },{
        nodeNum: "5", vendor: "大华",
      }];
      let arrNum = [];
      let obj = [];
      let objNum = [];
      for (var i = 0; i < resultData.length; i++) {
          if (resultData[i].vendor == "" || resultData[i].vendor == null){
            obj[i] = "未知厂商";
          }else {
            obj[i] = resultData[i].vendor;
          }
          objNum[i] = resultData[i].nodeNum;
      }

      

      //设备厂商-柱状图data
      this.vendorBar= {
        grid: {
          top: '5%',
        },
        xAxis: {
          type: 'category',
          data: obj,
          axisLabel: {
            show: true,
            interval:0,
            rotate:28,//倾斜度 -90 至 90 默认为0
            margin:1
            },
          offset: 9 //控制x轴下方文字与轴的距离
        },
         yAxis : [
            {
              type : 'value',
              minInterval: 1, //自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
            }
        ],
        series: [
          {
            type: 'bar',
            data: objNum
          }
        ]
      },


      //设备状态-饼状图data
      this.vendorStatusPie= {
        legend: {
          orient: 'vertical',
          itemWidth: 18,             // 图例图形宽度
          itemHeight: 12,            // 图例图形高度
          x: 'right',
          textStyle: {
            fontSize: 11
          },
          data: obj
        },
        grid: {
          
        },
        series: [
          {
            type:'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            label: {
                normal: {
                    formatter: '{b|{b}：}{c}',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 15,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 11,
                            lineHeight: 13
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 12
                        }
                    }
                }
            },
            data : (function(){
                for (var i = 0; i < obj.length; i++) {
                    arrNum.push({"value": objNum[i],"name":obj[i]});
                }
                return arrNum;
            })()
          }
        ],
      }
      
    },

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
      &-link {
        margin-left: 10px;
      }
    }
  }

  /**
  * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
  * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
  */
  .echarts {
    width: 100%;
    height: 100%;
  }

  .chart-wrap {
    margin: 10px auto;
    width: 100%;
    height: 300px;
  }

}
</style>

