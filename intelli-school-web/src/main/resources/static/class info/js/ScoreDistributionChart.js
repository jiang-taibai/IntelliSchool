function updateScoreDistributionChart() {
	getIntelliSchoolApiJson(
		'/classData/getExamSomeSubjectScoreDistribution',
		{
			examId: $('#examIdSelect').val(),
			classId: $('#classIdSelect').val(),
		},
		updateScoreDistributionChart_callback
	)
}

function updateScoreDistributionChart_callback(data) {
	var distributionArray_Chinese = []
	var distributionArray_Math = []
	var distributionArray_English = []
	var distributionArray_Physics = []
	var distributionArray_Chemistry = []
	var distributionArray_Biology = []
	var distributionArray_Politics = []
	var distributionArray_History = []
	var distributionArray_Geography = []
	var branch = 'unknown'

	var isStartInsert = false
	$.each(data['语文'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_Chinese.push([index / 2, value])
		}
	})

	isStartInsert = false
	$.each(data['数学'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_Math.push([index / 2, value])
		}
	})

	isStartInsert = false
	$.each(data['英语'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_English.push([index / 2, value])
		}
	})

	isStartInsert = false
	var countStudent = 0
	$.each(data['物理'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_Physics.push([index / 2, value])
			countStudent += value
		}
	})
	if (countStudent == 0) {
		branch = 'Wen'
	}

	isStartInsert = false
	countStudent = 0
	$.each(data['化学'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_Chemistry.push([index / 2, value])
			countStudent += value
		}
	})
	if (countStudent == 0) {
		branch = 'Wen'
	}

	isStartInsert = false
	countStudent = 0
	$.each(data['生物'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_Biology.push([index / 2, value])
			countStudent += value
		}
	})
	if (countStudent == 0) {
		branch = 'Wen'
	}

	isStartInsert = false
	countStudent = 0
	$.each(data['政治'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_Politics.push([index / 2, value])
			countStudent += value
		}
	})
	if (countStudent == 0) {
		branch = 'Li'
	}

	isStartInsert = false
	countStudent = 0
	$.each(data['历史'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_History.push([index / 2, value])
			countStudent += value
		}
	})
	if (countStudent == 0) {
		branch = 'Li'
	}

	isStartInsert = false
	countStudent = 0
	$.each(data['地理'], function (index, value) {
		if (value > 0) {
			isStartInsert = true
		}
		if (isStartInsert) {
			distributionArray_Geography.push([index / 2, value])
			countStudent += value
		}
	})
	if (countStudent == 0) {
		branch = 'Li'
	}

	var series = [
		{
			name: '语文',
			data: distributionArray_Chinese,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		},
		{
			name: '数学',
			data: distributionArray_Math,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		},
		{
			name: '英语',
			data: distributionArray_English,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		},
	]
	var legendData = ['语文', '数学', '英语']
	if (branch != 'Wen') {
		legendData = legendData.concat(['物理', '化学', '生物'])
		series.push({
			name: '物理',
			data: distributionArray_Physics,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		})
		series.push({
			name: '化学',
			data: distributionArray_Chemistry,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		})
		series.push({
			name: '生物',
			data: distributionArray_Biology,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		})
	}
	if (branch != 'Li') {
		legendData = legendData.concat(['政治', '历史', '地理'])
		series.push({
			name: '政治',
			data: distributionArray_Politics,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		})
		series.push({
			name: '历史',
			data: distributionArray_History,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		})
		series.push({
			name: '地理',
			data: distributionArray_Geography,
			type: 'bar',
			showBackground: true,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#83bff6' },
					{ offset: 0.5, color: '#188df0' },
					{ offset: 1, color: '#188df0' },
				]),
			},
			emphasis: {
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' },
					]),
				},
			},
		})
	}
	drawScoreDistributionChart(legendData, series)
}

function drawScoreDistributionChart(legendData, series) {
	var chartDom = document.getElementById('scoreDistributionChart')
	var myChart = echarts.init(chartDom)
	var option

	option = {
		xAxis: {
			type: 'value',
			min: (value) => {
				return Math.max(value.min, 0)
			},
			max: (value) => {
				return Math.min(value.max, 150)
			},
			axisLabel: {
				formatter: '{value} 分',
				inside: true,
				textStyle: {
					color: '#000000',
				},
				backgroundColor: 'rgba(255,255,255,0.8)',
				padding: 4,
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			z: 10,
		},
		yAxis: {
			type: 'value',
			interval: 1, // 步长
			axisLabel: {
				formatter: '{value} (人 )',
			},
		},
		grid: {
			y: 40,
			y2: 30,
		},
		tooltip: {
			trigger: 'axis',
		},
		dataZoom: [
			{
				type: 'inside',
			},
		],
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none',
				},
				dataView: { readOnly: false },
				magicType: { type: ['line', 'bar'] },
				restore: {},
				saveAsImage: {},
			},
		},
		legend: {
			data: legendData,
			inactiveColor: '#999',
			selectedMode: 'single',
			selected: {
				语文: true,
			},
		},
		series: series,
	}

	option && myChart.setOption(option)

	// Enable data zoom when user click bar.
	var zoomSize = 6
	myChart.on('click', function (params) {
		console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)])
		myChart.dispatchAction({
			type: 'dataZoom',
			startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
			endValue:
				dataAxis[
					Math.min(params.dataIndex + zoomSize / 2, data.length - 1)
				],
		})
	})
}

// 总分成绩分布
function updateTotalScoreDistributionChart() {
	showLoading(document.getElementById('totalScoreDistributionChart'))
	getIntelliSchoolApiJson(
		'/classData/getExamTotalScoreDistribution',
		{
			examId: $('#examIdSelect').val(),
			classId: $('#classIdSelect').val(),
		},
		updateTotalScoreDistributionChart_callback
	)
}

function updateTotalScoreDistributionChart_callback(data) {
	hiddenLoading(document.getElementById('totalScoreDistributionChart'))
	drawTotalScoreDistributionChart(data)
}

function drawTotalScoreDistributionChart(data) {
	var xAxisData = [
		'<100',
		'100~200',
		'200~300',
		'300~400',
		'400~500',
		'500~600',
		'600~700',
	]
	if (data[8] + data[9] + data[10] == 0) {
		xAxisData = xAxisData.concat(['≥700'])
	} else {
		xAxisData = xAxisData.concat([
			'700~800',
			'800~900',
			'900~1000',
			'≥1000',
		])
	}

	var chartDom = document.getElementById('totalScoreDistributionChart')
	var myChart = echarts.init(chartDom)
	var option

	option = {
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			data: xAxisData,
		},
		yAxis: {
			type: 'value',
		},
		grid: {
			y: 40,
		},
		series: [
			{
				data: data,
				type: 'bar',
			},
		],
	}

	option && myChart.setOption(option)
}
