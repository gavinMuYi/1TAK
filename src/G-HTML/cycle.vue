<template>
    <div class="G_cycle">
        <div ref="cycleChart" class="chart-box"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';

    export default {
        name: 'G_CYCLE',
        props: {},
        data () {
            return {
                option: {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 1048, name: '搜索引擎'},
                                {value: 735, name: '直接访问'},
                                {value: 580, name: '邮件营销'},
                                {value: 484, name: '联盟广告'},
                                {value: 300, name: '视频广告'}
                            ]
                        }
                    ]
                }
            };
        },
        mounted () {
            var myChart = echarts.init(this.$refs.cycleChart);
            this.option && myChart.setOption(this.option);
        }
    }
</script>

<style lang="less">
    .G_cycle {
        .chart-box {
            width: 600px;
            height: 600px;
        }
    }
</style>
