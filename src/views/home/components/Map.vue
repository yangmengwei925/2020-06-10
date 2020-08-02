<template>
    <div>
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div  ref="chart2" style="width: 100%;height:400px;"></div>
    </div>
      
</template>

<script>
import echarts from 'echarts'
import axios from 'axios';
import 'echarts/map/js/china'

export default {
    data(){
        return {
            lists:[],
            myChart:''
        }
    },
    mounted(){
        this.init();
        //this.getList();
        //图表响应式
        var self = this;
        window.onresize = function(){
            self.myChart.resize();
        }
    },
    methods:{
        init(){
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(this.$refs.chart2);

            // 指定图表的配置项和数据
            var option = {
                title:{
                    text:'中国地图'
                },
                series: [{
                    type: 'map',
                    map:'china',
                    label: {
                        show: true
                    },
                    data:[
                         {name: '北京', value: 20057},
                         {name: '上海', value: 15477},
                         {name: '新疆', value: 34432},
                         {name: '西藏', value: 3245},
                         {name: '青海', value: 265},
                    ]
                }],
                tooltip: {
                    trigger: 'item',
                    //地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
                    formatter: '城市名：{b}<br/>数据：{c}人'
                },
                visualMap: {
                    min: 100,
                    max: 50000,
                    text: ['High', 'Low'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['lightskyblue', 'yellow', 'orangered']
                    }
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
            };
            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option);
        },
        // getList(){
        //     axios.get('http://127.0.0.1:3333/get_lists').then(res=>{
        //         this.lists = res.data;
        //         this.init();
        //     })
        // }
    }
 
}
</script>

<style>
  
</style>