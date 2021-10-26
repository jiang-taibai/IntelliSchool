function updateScoreTendencyChart() {
	showLoading(document.getElementById('scoreTendencyChart'))
	getIntelliSchoolApiJson(
		'/classData/getExamAllSubjectTendency',
		{
			classId: $('#classIdSelect').val(),
		},
		updateScoreTendencyChart_callback
	)
}

function updateScoreTendencyChart_callback(data) {
	hiddenLoading(document.getElementById('scoreTendencyChart'))
	var MaxTendency_Chinese = []
	var MinTendency_Chinese = []
	var AvgTendency_Chinese = []

	var MaxTendency_Math = []
	var MinTendency_Math = []
	var AvgTendency_Math = []

	var MaxTendency_English = []
	var MinTendency_English = []
	var AvgTendency_English = []

	var MaxTendency_Physics = []
	var MinTendency_Physics = []
	var AvgTendency_Physics = []

	var MaxTendency_Chemistry = []
	var MinTendency_Chemistry = []
	var AvgTendency_Chemistry = []

	var MaxTendency_Biology = []
	var MinTendency_Biology = []
	var AvgTendency_Biology = []

	var MaxTendency_Politics = []
	var MinTendency_Politics = []
	var AvgTendency_Politics = []

	var MaxTendency_History = []
	var MinTendency_History = []
	var AvgTendency_History = []

	var MaxTendency_Geography = []
	var MinTendency_Geography = []
	var AvgTendency_Geography = []
	var branch = 'unknown'

	var tendencyVoArray = data['语文']
	$.each(tendencyVoArray, function (index, value) {
		MaxTendency_Chinese.push(value.max)
		MinTendency_Chinese.push(value.min)
		AvgTendency_Chinese.push(value.avg.toFixed(2))
	})

	var tendencyVoArray = data['数学']
	$.each(tendencyVoArray, function (index, value) {
		MaxTendency_Math.push(value.max)
		MinTendency_Math.push(value.min)
		AvgTendency_Math.push(value.avg.toFixed(2))
	})

	var tendencyVoArray = data['英语']
	$.each(tendencyVoArray, function (index, value) {
		MaxTendency_English.push(value.max)
		MinTendency_English.push(value.min)
		AvgTendency_English.push(value.avg.toFixed(2))
	})

	var tendencyVoArray = data['物理']
	$.each(tendencyVoArray, function (index, value) {
		if (value.avg == 'NaN') {
			branch = 'Wen'
		}
		if (branch != 'Wen') {
			MaxTendency_Physics.push(value.max)
			MinTendency_Physics.push(value.min)
			AvgTendency_Physics.push(value.avg.toFixed(2))
		}
	})

	var tendencyVoArray = data['化学']
	$.each(tendencyVoArray, function (index, value) {
		if (value.avg == 'NaN') {
			branch = 'Wen'
		}
		if (branch != 'Wen') {
			MaxTendency_Chemistry.push(value.max)
			MinTendency_Chemistry.push(value.min)
			AvgTendency_Chemistry.push(value.avg.toFixed(2))
		}
	})

	var tendencyVoArray = data['生物']
	$.each(tendencyVoArray, function (index, value) {
		if (value.avg == 'NaN') {
			branch = 'Wen'
		}
		if (branch != 'Wen') {
			MaxTendency_Biology.push(value.max)
			MinTendency_Biology.push(value.min)
			AvgTendency_Biology.push(value.avg.toFixed(2))
		}
	})

	var tendencyVoArray = data['政治']
	$.each(tendencyVoArray, function (index, value) {
		if (value.avg == 'NaN') {
			branch = 'Li'
		}
		if (branch != 'Li') {
			MaxTendency_Politics.push(value.max)
			MinTendency_Politics.push(value.min)
			AvgTendency_Politics.push(value.avg.toFixed(2))
		}
	})

	var tendencyVoArray = data['历史']
	$.each(tendencyVoArray, function (index, value) {
		if (value.avg == 'NaN') {
			branch = 'Li'
		}
		if (branch != 'Li') {
			MaxTendency_History.push(value.max)
			MinTendency_History.push(value.min)
			AvgTendency_History.push(value.avg.toFixed(2))
		}
	})

	var tendencyVoArray = data['地理']
	$.each(tendencyVoArray, function (index, value) {
		if (value.avg == 'NaN') {
			branch = 'Li'
		}
		if (branch != 'Li') {
			MaxTendency_Geography.push(value.max)
			MinTendency_Geography.push(value.min)
			AvgTendency_Geography.push(value.avg.toFixed(2))
		}
	})

	var legendData = ['语文', '数学', '英语']

	var series = [
		{
			name: '语文',
			type: 'line',
			smooth: true,
			data: MaxTendency_Chinese,
		},
		{
			name: '语文',
			type: 'line',
			smooth: true,
			data: MinTendency_Chinese,
		},
		{
			name: '语文',
			type: 'line',
			smooth: true,
			data: AvgTendency_Chinese,
		},

		{
			name: '数学',
			type: 'line',
			smooth: true,
			data: MaxTendency_Math,
		},
		{
			name: '数学',
			type: 'line',
			smooth: true,
			data: MinTendency_Math,
		},
		{
			name: '数学',
			title: '平均分',
			type: 'line',
			smooth: true,
			data: AvgTendency_Math,
		},

		{
			name: '英语',
			type: 'line',
			smooth: true,
			data: MaxTendency_English,
		},
		{
			name: '英语',
			type: 'line',
			smooth: true,
			data: MinTendency_English,
		},
		{
			name: '英语',
			title: '平均分',
			type: 'line',
			smooth: true,
			data: AvgTendency_English,
		},
	]
	if (branch != 'Wen') {
		legendData.push('物理')
		legendData.push('化学')
		legendData.push('生物')
		series.push({
			name: '物理',
			type: 'line',
			smooth: true,
			data: MaxTendency_Physics,
		})
		series.push({
			name: '物理',
			type: 'line',
			smooth: true,
			data: MinTendency_Physics,
		})
		series.push({
			name: '物理',
			type: 'line',
			smooth: true,
			data: AvgTendency_Physics,
		})

		series.push({
			name: '化学',
			type: 'line',
			smooth: true,
			data: MaxTendency_Chemistry,
		})
		series.push({
			name: '化学',
			type: 'line',
			smooth: true,
			data: MinTendency_Chemistry,
		})
		series.push({
			name: '化学',
			type: 'line',
			smooth: true,
			data: AvgTendency_Chemistry,
		})

		series.push({
			name: '生物',
			type: 'line',
			smooth: true,
			data: MaxTendency_Biology,
		})
		series.push({
			name: '生物',
			type: 'line',
			smooth: true,
			data: MinTendency_Biology,
		})
		series.push({
			name: '生物',
			type: 'line',
			smooth: true,
			data: AvgTendency_Biology,
		})
	}
	if (branch != 'Li') {
		legendData.push('政治')
		legendData.push('历史')
		legendData.push('地理')
		series.push({
			name: '政治',
			type: 'line',
			smooth: true,
			data: MaxTendency_Politics,
		})
		series.push({
			name: '政治',
			type: 'line',
			smooth: true,
			data: MinTendency_Politics,
		})
		series.push({
			name: '政治',
			title: '平均分',
			type: 'line',
			smooth: true,
			data: AvgTendency_Politics,
		})

		series.push({
			name: '历史',
			type: 'line',
			smooth: true,
			data: MaxTendency_History,
		})
		series.push({
			name: '历史',
			type: 'line',
			smooth: true,
			data: MinTendency_History,
		})
		series.push({
			name: '历史',
			title: '平均分',
			type: 'line',
			smooth: true,
			data: AvgTendency_History,
		})

		series.push({
			name: '地理',
			type: 'line',
			smooth: true,
			data: MaxTendency_Geography,
		})
		series.push({
			name: '地理',
			type: 'line',
			smooth: true,
			data: MinTendency_Geography,
		})
		series.push({
			name: '地理',
			title: '平均分',
			type: 'line',
			smooth: true,
			data: AvgTendency_Geography,
		})
	}

	drawScoreTendencyChart(legendData, series)
}

function drawScoreTendencyChart(legendData, series) {
	var chartDom = document.getElementById('scoreTendencyChart')
	var myChart = echarts.init(chartDom)
	var option

	option = {
		tooltip: {
			trigger: 'axis',
		},
		legend: {
			data: legendData,
			inactiveColor: '#999',
			selectedMode: 'single',
			selected: {
				语文: true,
			},
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			data: ['', '', '', ''],
			show: false,
		},
		yAxis: [
			{
				type: 'value',
				min: (value) => {
					return Math.max(value.min - 10, 0)
				},
				max: (value) => {
					return Math.min(value.max + 10, 150)
				},
			},
		],
		series: series,
	}

	option && myChart.setOption(option)
}
