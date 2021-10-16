function updateScoreLineChart(stuId) {
    showLoading(document.getElementById('ScoreForecastLineChart'))
    getIntelliSchoolApiJson('/intelliScore/getAllGradeThreeScore', {
        stuId: stuId,
    }, updateScoreLineChart_callback)
}

function updateScoreLineChart_callback(data) {
    var xAxisData = []
    var seriesData_real = []
    var seriesData_forecast = []
    $.each(data, function (index, object) {
        xAxisData.push(object['examName'])
        seriesData_real.push(object['examScore'])
        seriesData_forecast.push("-")
    })
    var size = seriesData_real.length
    seriesData_forecast[size - 2] = seriesData_real[size - 2]
    seriesData_forecast[size - 1] = seriesData_real[size - 1]
    seriesData_real[size - 1] = "-";
    hiddenLoading(document.getElementById('ScoreForecastLineChart'))
    drawScoreLineChart(xAxisData, seriesData_real, seriesData_forecast)
}


function drawScoreLineChart(xAxisData, seriesData_real, seriesData_forecast) {
    var chartDom = document.getElementById('ScoreForecastLineChart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            formatter: function (params) {
                // console.log(params)  //这里是两个数组，
                if (params[0].data != '-') {
                    var val = params[0]
                } else {
                    var val = params[1]
                }
                if (val.data !== null) {
                    return (
                        val.name +
                        '成绩 : ' +
                        val.data +
                        '分'
                    )
                }
            },
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            name: '考试名称',
        },
        yAxis: {
            type: 'value',
            name: '分数',
        },
        series: [{
            name: "成绩趋势与预测",
            data: seriesData_real,
            type: 'line',
            smooth: false,
        }, {
            name: "成绩趋势与预测",
            data: seriesData_forecast,
            type: 'line',
            smooth: false,
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 2,
                        type: 'dotted' //'dotted'虚线 'solid'实线
                    }
                }
            },
        }]
    };

    option && myChart.setOption(option);
}