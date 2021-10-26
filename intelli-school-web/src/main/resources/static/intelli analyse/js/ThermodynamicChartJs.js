function drawThermodynamicChart() {
	var chartDom = document.getElementById('subjectRelationThermodynamicChart')
	var myChart = echarts.init(chartDom)
	var option

	var subject = [
		'语文', // 0
		'数学',
		'英语', // 2
		'物理',
		'化学', // 4
		'生物',
		'政治', // 6
		'历史',
		'地理', // 8
	]

	var data = [
		[0, 2, 0.661],
		[0, 6, 0.262],
		[0, 7, 0.404],
		[0, 8, 0.215],
        [3, 1, 0.603],
        [4, 1, 0.318],
        [5, 4, 0.445],
        [3, 4, 0.388]
	]

	data = data.map(function (item) {
		return [item[1], item[0], item[2] || '-']
	})

	option = {
		tooltip: {
			position: 'top',
		},
		// grid: {
		// 	height: '50%',
		// 	top: '10%',
		// },
		xAxis: {
			type: 'category',
			data: subject,
			splitArea: {
				show: true,
			},
		},
		yAxis: {
			type: 'category',
			data: subject,
			splitArea: {
				show: true,
			},
		},
		visualMap: {
			min: 0.2,
			max: 0.7,
            show: false,
			calculable: true,
			orient: 'horizontal',
			left: 'center',
			bottom: '15%',
		},
		series: [
			{
				name: '学科间相关系数',
				type: 'heatmap',
				data: data,
				label: {
					show: true,
				},
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	}

	option && myChart.setOption(option)
}
