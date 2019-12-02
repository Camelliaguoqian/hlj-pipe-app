<template>
  <div class="statistic-page page">
    <van-nav-bar title="统计分析"  
    :zIndex="100" 
    left-arrow 
    fixed
    @click-left="goBack"></van-nav-bar>

    <!-- 设备统计 -->
    <van-panel class="page-panel page-icon-panel">
      <div class="panel-title van-hairline--bottom" slot="header">
        <van-icon class="panel-title-icon" name="diamond" />
        设备
      </div>
      <div class="page-panel-content page-icon-panel-content">
        <van-tag mark type="primary">设备厂商</van-tag>
        <div class="chart-wrap">
          <v-chart :options="vendorBar" />
        </div>
      
        <van-tag mark type="primary">设备状态</van-tag>
        <div class="chart-wrap">
          <v-chart :options="vendorStatusPie" />
        </div>

      </div>
    </van-panel>


  </div>
</template>

<script>
import { NavBar, Panel, Tag} from 'vant'
import ECharts from 'vue-echarts'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'

export default {
  name: 'StatisticIndexPage',
  components: {
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    [Tag.name]: Tag,
    'v-chart': ECharts
  },
  props: {
    zIndex: Number,
  },
  data () {
    return {
      vendorBar: {},
      vendorStatusPie: {},
    }
  },
  mounted: function() {
    this.initChart();
  },
  methods: {
    goBack: function() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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
