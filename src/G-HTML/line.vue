<template>
    <div class="G_line">
        <div ref="lineChart" class="chart-box"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';

    export default {
        name: 'G_LINE',
        props: {},
        data () {
            return {
                option: {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }]
                }
            };
        },
        mounted () {
            var myChart = echarts.init(this.$refs.lineChart);
            this.option && myChart.setOption(this.option);
        }
    }
</script>

<style lang="less">
    .G_line {
        .chart-box {
            width: 600px;
            height: 600px;
        }
    }
</style>
