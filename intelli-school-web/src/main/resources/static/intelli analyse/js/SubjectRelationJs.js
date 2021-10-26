const allJsonFileName = [
    'Biology-Chemistry',
    'Chemistry-Math',
    'Chinese-English',
    'Chinese-History',
    'Chinese-Politics',
    'Chinese-Geography',
    'Physics-Chemistry',
    'Physics-Math',
]

function initScatterChart() {
    $.each(allJsonFileName, function (i, jsonFileName) {
        showLoading(document.getElementById(jsonFileName))
        getSubjectRelationJsonAndHandleData(jsonFileName)
    })
}

//
// function getRelativePath(jsonFileName) {
// 	return 'static/intelli analyse/json/' + jsonFileName + '.txt'
// }

function getSubjectRelationJsonAndHandleData(jsonFileName) {
    $.getJSON(
        IntelliSchoolUrlPrefix +
        '/intelliAnalyse/getJsonFile?fileName=' +
        jsonFileName,
        function (data) {
            var k, b
            var xAxisTitle, yAxisTitle
            var points = []
            $.each(data, function (i, item) {
                if (i == 0) {
                    k = item['k']
                    b = item['b']
                    xAxisTitle = item['横坐标']
                    yAxisTitle = item['纵坐标']
                } else {
                    if (item['x'] <= 100 && item['y'] <= 100) {
                        points.push([item['x'], item['y']])
                    }
                }
            })
            hiddenLoading(document.getElementById(jsonFileName))
            drawScatterChart(jsonFileName, xAxisTitle, yAxisTitle, points, k, b)
        }
    )
}

function drawScatterChart(chartDomName, xAxisTitle, yAxisTitle, points, k, b) {
    var chartDom = document.getElementById(chartDomName)
    var myChart = echarts.init(chartDom)
    var option

    option = {
        xAxis: {
            name: xAxisTitle,
        },
        yAxis: {
            name: yAxisTitle,
        },
        tooltip: {
            formatter: xAxisTitle + '与' + yAxisTitle + '对应关系: ({c})'
        },
        grid: {
            y2: 20,
            x2: 40,
            x: 40,
        },
        series: [
            {
                symbolSize: 1,
                type: 'scatter',
                animation: false,
                data: points,
                markLine: {
                    animation: false,
                    // label: {
                    //     formatter: 'y = ' + k + ' x + ' + b,
                    //     align: 'right',
                    //     position: 'end',
                    // },
                    lineStyle: {
                        type: 'solid',
                    },
                    // label: {
                    //     formatter: 'y = ' + k + ' x + ' + b,
                    //     align: 'right'
                    // },
                    tooltip: {
                        formatter: 'y = ' + k + ' x + ' + b,
                    },
                    data: [
                        [
                            {
                                coord: [0, b],
                                symbol: 'none',
                            },
                            {
                                coord: [100, 100 * k + b],
                                symbol: 'none',
                            },
                        ],
                    ],
                },
            }
        ],
    }

    option && myChart.setOption(option)
}

// function getLineData(k, b) {
//     var lineData = []
//     for (var i = 0; i <= 100; i++) {
//         lineData.push([i, getY(i, k, b)])
//     }
//     return lineData;
// }
//
// function getY(x, k, b) {
//     return k * x + b;
// }
