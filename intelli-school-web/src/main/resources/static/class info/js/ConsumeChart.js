function updateDailyConsume() {
	showLoading(document.getElementById('dailyConsumeChart'))
	getIntelliSchoolApiJson(
		'/classData/getConsumeTendency',
		{
			classId: $('#classIdSelect').val(),
		},
		updateDailyConsume_callback
	)
}

function updateDailyConsume_callback(data) {
	var maxData = []
	var minData = []
	var avgData = []
	var timeData = []
	$.each(data, function (key, value) {
		timeData.push(key)
		maxData.push(value.max)
		minData.push(value.min)
		avgData.push(value.avg.toFixed(2))
	})
	hiddenLoading(document.getElementById('dailyConsumeChart'))
	drawDailyConsume(timeData, maxData, minData, avgData)
}

function drawDailyConsume(timeData, maxData, minData, avgData) {
	var chartDom = document.getElementById('dailyConsumeChart')
	var myChart = echarts.init(chartDom)
	var option

	option = {
		tooltip: {
			trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
		},
		legend: {
			data: ['最高消费', '最低消费', '平均消费'],
		},
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
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: timeData,
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} 元',
			},
			min: (value) => {
				return value.min - 5
			},
			max: (value) => {
				return value.max + 5
			},
		},
		series: [
			{
				name: '最高消费',
				type: 'line',
				data: maxData,
				smooth: true,
				markPoint: {
					//data: [{ type: 'max', name: '最大值' }],
				},
				markLine: {
					data: [
						{
							type: 'average',
							name: '平均值',
						},
						[
							{
								symbol: 'none',
								x: '90%',
								yAxis: 'max',
							},
							{
								symbol: 'circle',
								label: {
									position: 'start',
									formatter: '最大值',
								},
								type: 'max',
								name: '最高点',
							},
						],
					],
				},
			},
			{
				name: '最低消费',
				type: 'line',
				data: minData,
				smooth: true,
				markPoint: {
					//data: [{ type: 'min', name: '最小值' }],
				},
				markLine: {
					data: [
						{ type: 'average', name: '平均值' },
						[
							{
								symbol: 'none',
								x: '90%',
								yAxis: 'min',
							},
							{
								symbol: 'circle',
								label: {
									position: 'start',
									formatter: '最小值',
								},
								type: 'min',
								name: '最低点',
							},
						],
					],
				},
			},
			{
				name: '平均消费',
				type: 'line',
				data: avgData,
				smooth: true,
			},
		],
	}

	option && myChart.setOption(option)
}

// 总消费
function updateDailyTotalConsume() {
	showLoading(document.getElementById('dailyTotalConsumeChart'))
	getIntelliSchoolApiJson(
		'/classData/getTotalConsume',
		{
			classId: $('#classIdSelect').val(),
		},
		updateDailyTotalConsume_callback
	)
}

function updateDailyTotalConsume_callback(data) {
	var totalData = []
    var timeData = []
	$.each(data, function (key, value) {
		timeData.push(key)
		totalData.push(value.toFixed(2))
	})
	hiddenLoading(document.getElementById('dailyTotalConsumeChart'))
	drawDailyTotalConsume(timeData, totalData)
}

function drawDailyTotalConsume(timeData, totalData) {
	var chartDom = document.getElementById('dailyTotalConsumeChart')
	var myChart = echarts.init(chartDom)
	var option

	option = {
		tooltip: {
			trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
		},
		legend: {
			data: ['总消费'],
		},
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
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: timeData,
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} 元',
			},
			min: (value) => {
				return value.min - 5
			},
			max: (value) => {
				return value.max + 5
			},
		},
		series: [
			{
				name: '总消费',
				type: 'line',
				data: totalData,
				smooth: true,
				markLine: {
					data: [
						{
							type: 'average',
							name: '平均值',
						},
						[
							{
								symbol: 'none',
								x: '90%',
								yAxis: 'max',
							},
							{
								symbol: 'circle',
								label: {
									position: 'start',
									formatter: '最大值',
								},
								type: 'max',
								name: '最高点',
							},
						],
						[
							{
								symbol: 'none',
								x: '90%',
								yAxis: 'min',
							},
							{
								symbol: 'circle',
								label: {
									position: 'start',
									formatter: '最小值',
								},
								type: 'min',
								name: '最低点',
							},
						],
					],
				},
			},
		],
	}

	option && myChart.setOption(option)
}
