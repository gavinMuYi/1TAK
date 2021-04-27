<template>
    <div class="G_column">
        <div ref="columnChart" class="chart-box"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';

    export default {
        name: 'G_COLUMN',
        props: {},
        data () {
            return {
                option: {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        source: [
                            ['product', '2012', '2013', '2014', '2015'],
                            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
                            ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
                            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
                        ]
                    },
                    xAxis: [
                        {type: 'category', gridIndex: 0},
                        {type: 'category', gridIndex: 1}
                    ],
                    yAxis: [
                        {gridIndex: 0},
                        {gridIndex: 1}
                    ],
                    grid: [
                        {bottom: '55%'},
                        {top: '55%'}
                    ],
                    series: [
                        // These series are in the first grid.
                        {type: 'bar', seriesLayoutBy: 'row'},
                        {type: 'bar', seriesLayoutBy: 'row'},
                        {type: 'bar', seriesLayoutBy: 'row'},
                        // These series are in the second grid.
                        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
                    ]
                }
            };
        },
        mounted () {
            var myChart = echarts.init(this.$refs.columnChart);
            this.option && myChart.setOption(this.option);
        }
    }
</script>

<style lang="less">
    .G_column {
        .chart-box {
            width: 600px;
            height: 600px;
        }
    }
</style>
