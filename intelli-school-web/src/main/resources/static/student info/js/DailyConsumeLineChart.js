function updateDailyConsumeLineChart() {
	showLoading(document.getElementById('dailyConsumeLineChart'))
	getIntelliSchoolApiJson(
		'/studentData/getTotalConsumeEachDay',
		{
			studentId: $('select[name="studentIdSelect"]').val(),
		},
		updateDailyConsumeLineChart_callback
	)
}

function updateDailyConsumeLineChart_callback(data) {
	var chartDom = document.getElementById('dailyConsumeLineChart')
	var xAxisData = []
	var seriesData = []
	$.each(data, function (key, value) {
		// console.log(key)
		xAxisData[xAxisData.length] = key
		seriesData[seriesData.length] = value
	})

	$.getJSON(
		IntelliSchoolUrlPrefix +
			'/studentData/getClassTotalConsumeEachDay?studentId=' +
			$('select[name="studentIdSelect"]').val(),
		function (result) {
			hiddenLoading(chartDom)
			var maxVal = [] //班级最高消费
			var minVal = [] //班级最低消费
			var avgVal = [] //班级平均消费
			$.each(result, function (key, value) {
				maxVal[maxVal.length] = value['max']
				minVal[minVal.length] = value['min']
				avgVal[avgVal.length] = value['avg'].toFixed(2)
			})

			for (i = 0; i < xAxisData.length; ++i) {
				for (j = 0; j < xAxisData.length; ++j) {
					if (xAxisData[i] > xAxisData[j]) {
						var temp = xAxisData[i]
						xAxisData[i] = xAxisData[j]
						xAxisData[j] = temp
						temp = seriesData[i]
						seriesData[i] = seriesData[j]
						seriesData[j] = temp

						temp = maxVal[i]
						maxVal[i] = maxVal[j]
						maxVal[j] = temp

						temp = minVal[i]
						minVal[i] = minVal[j]
						minVal[j] = temp

						temp = avgVal[i]
						avgVal[i] = avgVal[j]
						avgVal[j] = temp
					}
				}
			}

			drawDailyConsumeLineChart(
				chartDom,
				xAxisData,
				seriesData,
				maxVal,
				minVal,
				avgVal
			)
		}
	)
}

function drawDailyConsumeLineChart(
	chartDom,
	xAxisData,
	seriesData_personal,
	seriesData_classMax,
	seriesData_classMin,
	seriesData_classAvg
) {
	var myChart = echarts.init(chartDom)
	var option

	option = {
		tooltip: {
			trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: xAxisData,
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
		yAxis: {
			type: 'value',
			min: (value) => {
				return value.min - 10
			},
			max: (value) => {
				return value.max + 5
			},
			axisLabel: {
				formatter: '{value} 元',
			},
		},
		legend: {
			data: [
				getName() + '的历史消费金额',
				'班级最高消费',
				'班级最低消费',
				'班级平均消费',
			],
		},
		series: [
			{
				name: getName() + '的历史消费金额',
				data: seriesData_personal,
				type: 'line',
				symbol: 'none',
			},
			{
				name: '班级最高消费',
				data: seriesData_classMax,
				type: 'line',
				symbol: 'none',
			},
			{
				name: '班级最低消费',
				data: seriesData_classMin,
				type: 'line',
				symbol: 'none',
			},
			{
				name: '班级平均消费',
				data: seriesData_classAvg,
				type: 'line',
				symbol: 'none',
				lineStyle: {
					width: 2,
					type: 'dotted', //'dotted'虚线 'solid'实线
				},
			},
		],
	}

	option && myChart.setOption(option)
}
