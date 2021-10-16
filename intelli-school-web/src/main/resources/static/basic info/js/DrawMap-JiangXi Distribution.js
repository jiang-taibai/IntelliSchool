var AllCity = [
    {
        name: '南昌市',
        value: 0,
    },
    {
        name: '景德镇市',
        value: 0,
    },
    {
        name: '萍乡市',
        value: 0,
    },
    {
        name: '九江市',
        value: 0,
    },
    {
        name: '新余市',
        value: 0,
    },
    {
        name: '鹰潭市',
        value: 0,
    },
    {
        name: '赣州市',
        value: 0,
    },
    {
        name: '吉安市',
        value: 0,
    },
    {
        name: '宜春市',
        value: 0,
    },
    {
        name: '抚州市',
        value: 0,
    },
    {
        name: '上饶市',
        value: 0,
    },
]

function updateJiangXiMap() {
    showLoading(document.getElementById('JiangXiMap'))
    getIntelliSchoolApiJson(
        '/basicInfo/getStuOriginInJiangXiProvince',
        {},
        updateJiangXiMap_callback
    )
}

function updateJiangXiMap_callback(data) {
    $.each(data, function (key, value) {
        for (i = 0; i < AllCity.length; i++) {
            var object = AllCity[i]
            if (object.name == key + '市') {
                object.value = value
                break
            }
        }
    })
    hiddenLoading(document.getElementById('JiangXiMap'))
    drawJiangXiMap(document.getElementById('JiangXiMap'))
}

function drawJiangXiMap(chartDom) {
    var myChart = echarts.init(chartDom)
    var option
    myChart.showLoading()

    $.get(
        IntelliSchoolUrlPrefix + '/basicInfo/getMapJson?fileName=360000_full',
        function (geoJson) {
            myChart.hideLoading()

            echarts.registerMap('JiangXi', geoJson)

            myChart.setOption(
                (option = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c} (人)',
                    },
                    toolbox: {
                        show: false,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {},
                        },
                    },
                    visualMap: {
                        min: 100,
                        max: 500,
                        right: 20,
                        text: ['High', 'Low'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['#EEEEEE', 'yellow', 'orangered'],
                        },
                    },
                    series: [
                        {
                            name: '各省生源分布',
                            type: 'map',
                            mapType: 'JiangXi', // 自定义扩展图表类型
                            label: {
                                show: true,
                            },
                            data: AllCity,
                        },
                    ],
                })
            )
        }
    )

    option && myChart.setOption(option)
}
