function updateAnalysisOfConsumptionChart() {
    showLoading(document.getElementById('AnalysisOfConsumption3DChart'))
    showLoading(document.getElementById('AnalysisOfConsumption2DChart'))
    showLoading(document.getElementById('PoorIndexScatterChart'))
    getIntelliSchoolApiJson('/intelliConsume/getTotalMoneyAndTimes', null, updateAnalysisOfConsumptionChart_callback)
}

function updateAnalysisOfConsumptionChart_callback(data) {
    var seriesData = [['学号', '姓名', '消费总额', '消费次数', '平均消费']]
    var timesWithTotalConsume = []
    var timesWithAvgConsume = []
    var poorIndex = []
    var notPoorIndex = []
    $.each(data, function (index, object) {
        seriesData.push([
            object['学生ID'],
            object['学生姓名'],
            object['消费总额'],
            object['消费次数'],
            object['平均消费'],
        ])
        timesWithTotalConsume.push([
            object['消费次数'],
            object['消费总额'],
        ])
        timesWithAvgConsume.push([
            object['消费次数'],
            object['平均消费'],
        ])
        if (object['是否为贫困生'] == '非贫困生') {
            notPoorIndex.push([
                object['学生ID'],
                object['消费指数'],
                object['学生姓名'],
            ])
        } else {
            poorIndex.push([
                object['学生ID'],
                object['消费指数'],
                object['学生姓名'],
            ])
        }
    })
    console.log(data.length)

    hiddenLoading(document.getElementById('AnalysisOfConsumption3DChart'))
    hiddenLoading(document.getElementById('AnalysisOfConsumption2DChart'))
    hiddenLoading(document.getElementById('PoorIndexScatterChart'))
    drawAnalysisOfConsumption3DChart(seriesData)
    drawAnalysisOfConsumption2DChart(timesWithTotalConsume, timesWithAvgConsume)
    drawPoorIndexScatterChart(poorIndex, notPoorIndex)
}

function drawAnalysisOfConsumption3DChart(data) {
    var chartDom = document.getElementById('AnalysisOfConsumption3DChart');
    var myChart = echarts.init(chartDom);
    var option;
    var symbolSize = 2.5;
    option = {
        tooltip: {},
        grid3D: {
            top: 0,
            viewControl: {
                autoRotate: true,
                autoRotateDirection: 'cw',
                autoRotateSpeed: 10,
                autoRotateAfterStill: 3,
                distance: 220,
                rotateSensitivity: 3,
            },
        },
        xAxis3D: {
            type: 'value',
            name: '消费总额',
        },
        yAxis3D: {
            name: '平均总额',
        },
        zAxis3D: {
            name: '消费次数',
        },
        dataset: {
            dimensions: [
                '学号',
                '姓名',
                '消费总额',
                '消费次数',
                '平均消费',
                // { name: 'Year', type: 'ordinal' }
            ],
            source: data
        },
        series: [
            {
                name: '',
                type: 'scatter3D',
                symbolSize: symbolSize,
                encode: {
                    x: '消费总额',
                    y: '平均消费',
                    z: '消费次数',
                    tooltip: [0, 1, 2, 3, 4]
                }
            }
        ]
    };

    option && myChart.setOption(option);
}

function drawAnalysisOfConsumption2DChart(timesWithTotalConsume, timesWithAvgConsume) {
    var chartDom = document.getElementById('AnalysisOfConsumption2DChart');
    var myChart = echarts.init(chartDom);
    var option;
    var symbolSize = 2.5;

    option = {
        // title: {
        //     text: '',
        //     left: 'center',
        //     top: 0
        // },
        grid: [
            {left: '10%', top: '7%', width: '75%', height: '38%'},
            {left: '10%', bottom: '7%', width: '75%', height: '38%'},
        ],
        tooltip: {
            formatter: 'Group {a}: ({c})'
        },
        xAxis: [
            {
                gridIndex: 0,
                name: '消费次数',
                type: 'value',
            },
            {
                gridIndex: 1,
                name: '消费次数',
                type: 'value',
            },
        ],
        yAxis: [
            {
                gridIndex: 0,
                name: '消费总额',
                type: 'value',
            },
            {
                gridIndex: 1,
                name: '平均消费',
                type: 'value',
            },
        ],
        series: [
            {
                name: 'I',
                type: 'scatter',
                symbolSize: symbolSize,
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: timesWithTotalConsume,
            },
            {
                name: 'II',
                type: 'scatter',
                symbolSize: symbolSize,
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: timesWithAvgConsume,
            }
        ]
    };

    option && myChart.setOption(option);

}

function drawPoorIndexScatterChart(poorIndex, notPoorIndex) {
    var chartDom = document.getElementById('PoorIndexScatterChart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        legend: {
            right: '10%',
            top: '3%',
            data: ['贫困生', '非贫困生']
        },
        grid: {
            left: '8%',
            top: '10%'
        },
        tooltip: {
            formatter: ''
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            type: 'value',
            min: function (value) {
                return value.min - 20;
            },
            max: function (value) {
                return value.max + 20;
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        },
        visualMap: {
            min: 0,
            max: 36,
            dimension: 1,
            orient: 'vertical',
            // right: 10,
            left: 10,
            top: 'center',
            text: ['HIGH', 'LOW'],
            calculable: true,
            inRange: {
                color: ['#24b7f2', 'red']
            }
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 10,
                end: 90
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                left: '93%',
                start: 10,
                end: 90
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 10,
                end: 90
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 10,
                end: 90
            }
        ],
        series: [
            {
                name: '贫困生',
                data: poorIndex,
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[1]) * 3;
                },
                tooltip: {
                    formatter: function (param) {
                        return '学生姓名: ' + param.data[2] + '<br>' +
                            '学生ID: ' + param.data[0] + '<br>' +
                            '消费指数: ' + param.data[1].toFixed(2)
                    },
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            },
            {
                name: '非贫困生',
                data: notPoorIndex,
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[1]) * 2;
                },
                tooltip: {
                    formatter: function (param) {
                        return '学生姓名: ' + param.data[2] + '<br>' +
                            '学生ID: ' + param.data[0] + '<br>' +
                            '消费指数: ' + param.data[1].toFixed(2)
                    },
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[2];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            },
        ]
    };

    option && myChart.setOption(option);

}