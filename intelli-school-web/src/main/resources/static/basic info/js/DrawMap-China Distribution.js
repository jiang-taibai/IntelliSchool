var AllProvince = [
	{ name: '北京', value: 0 },
	{ name: '天津', value: 0 },
	{ name: '上海', value: 0 },
	{ name: '重庆', value: 0 },
	{ name: '河北', value: 0 },
	{ name: '河南', value: 0 },
	{ name: '云南', value: 0 },
	{ name: '辽宁', value: 0 },
	{ name: '黑龙江', value: 0 },
	{ name: '湖南', value: 0 },
	{ name: '安徽', value: 0 },
	{ name: '山东', value: 0 },
	{ name: '新疆', value: 0 },
	{ name: '江苏', value: 0 },
	{ name: '浙江', value: 0 },
	{ name: '江西', value: 0 },
	{ name: '湖北', value: 0 },
	{ name: '广西', value: 0 },
	{ name: '甘肃', value: 0 },
	{ name: '山西', value: 0 },
	{ name: '内蒙古', value: 0 },
	{ name: '陕西', value: 0 },
	{ name: '吉林', value: 0 },
	{ name: '福建', value: 0 },
	{ name: '贵州', value: 0 },
	{ name: '广东', value: 0 },
	{ name: '青海', value: 0 },
	{ name: '西藏', value: 0 },
	{ name: '四川', value: 0 },
	{ name: '宁夏', value: 0 },
	{ name: '海南', value: 0 },
	{ name: '台湾', value: 0 },
	{ name: '香港', value: 0 },
	{ name: '澳门', value: 0 },
	{ name: '南海诸岛', value: 0 },
]

function updateChinaMap() {
	showLoading(document.getElementById('ChinaMap'))
	getIntelliSchoolApiJson(
		'/basicInfo/getStuOriginInChina',
		{},
		updateChinaMap_callback
	)
}
function updateChinaMap_callback(data) {
	$.each(data, function (key, value) {
		for (i = 0; i < AllProvince.length; i++) {
			var object = AllProvince[i]
			if (object.name == key) {
				object.value = value
				break
			}
		}
	})
	hiddenLoading(document.getElementById('ChinaMap'))
	drawChinaMap(document.getElementById('ChinaMap'))
}
function drawChinaMap(chartDom) {
	var myChart = echarts.init(chartDom, 'china')

	var option = {
		title: {
			text: '',
		},
		tooltip: {
			show: true,
			trigger: 'item',
			formatter: '{b}<br/>{c} (人)',
		},
		toolbox: {
			show: false,
			orient: 'vertical',
			left: 'right',
			top: 'center',
			feature: {
				dataView: { readOnly: false },
				restore: {},
				saveAsImage: {},
			},
		},
		visualMap: {
			min: 0,
			max: 10,
            range: [0, 10],
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
				mapType: 'china', // 自定义扩展图表类型
				roam: false, // 一定要关闭拖拽
				zoom: 1.23,
				center: [105, 36], // 调整地图位置
				label: {
					normal: {
						show: true, //关闭省份名展示
						fontSize: '12',
					},
					emphasis: {
						show: true,
					},
				},
				label: {
					show: true,
				},
				data: AllProvince,
			},
		],
	}

	option && myChart.setOption(option)
}
