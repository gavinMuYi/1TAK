<template>
    <div class="G_pie">
        <div ref="pieChart" class="chart-box"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';

    export default {
        name: 'G_PIE',
        props: {},
        data () {
            return {
                option: {
                    title: {
                        text: '某站点用户访问来源',
                        subtext: '纯属虚构',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                {value: 1048, name: '搜索引擎'},
                                {value: 735, name: '直接访问'},
                                {value: 580, name: '邮件营销'},
                                {value: 484, name: '联盟广告'},
                                {value: 300, name: '视频广告'}
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            };
        },
        mounted () {
            var myChart = echarts.init(this.$refs.pieChart);
            this.option && myChart.setOption(this.option);
        }
    }
</script>

<style lang="less">
    .G_pie {
        .chart-box {
            width: 600px;
            height: 600px;
        }
    }
</style>
