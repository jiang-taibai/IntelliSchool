// 绘制总分趋势栏目的折线图，此处有两个，应当有四个函数

const subjectIdToName = {
	0: '总分',
	1: '语文',
	2: '数学',
	3: '英语',
	4: '物理',
	5: '化学',
	6: '生物',
	7: '政治',
	8: '历史',
	9: '地理',
}

// 更新总分趋势图
function updateTotalScoreTendency() {
	showLoading(document.getElementById('totalScoreTendencyChart'))
	getIntelliSchoolApiJson(
		'/studentData/getAllTestTotalScore_ClassAvgScoreAndPersonaScore',
		{
			studentId: $('select[name="studentIdSelect"]').val(),
		},
		updateTotalScoreTendency_callback
	)
}

function updateTotalScoreTendency_callback(data) {
	hiddenLoading(document.getElementById('totalScoreTendencyChart'))
	var chartDom = document.getElementById('totalScoreTendencyChart')
	var xAxisData = []
	var seriesData_classAvg = []
	var seriesData_personal = []

	$.each(data, function (key, value) {
		// console.log('key = ' + key)
		xAxisData[xAxisData.length] = key
		seriesData_classAvg[seriesData_classAvg.length] = value[
			'班级均分'
		].toFixed(2)
		seriesData_personal[seriesData_personal.length] = value['个人总分']
	})
	drawTotalScoreTendency(
		chartDom,
		xAxisData,
		seriesData_classAvg,
		seriesData_personal
	)
}

function drawTotalScoreTendency(
	chartDom,
	xAxisData,
	seriesData_classAvg,
	seriesData_personal
) {
	// var chartDom = document.getElementById('main');
	var myChart = echarts.init(chartDom)
	var option

	option = {
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			data: xAxisData,
			// data: ['第一次月考']
		},
		yAxis: {
			type: 'value',
			min: (value) => {
				return Math.floor(value.min - 10)
			},
			max: (value) => {
				return Math.ceil(value.max + 10)
			},
			axisLabel: {
				formatter: '{value} 分',
			},
		},
		legend: {
			data: ['班级均分', '个人总分'],
		},
		grid: {
			y: 20,
			y2: 20,
		},
		series: [
			{
				name: '班级均分',
				data: seriesData_classAvg,
				type: 'line',
				smooth: true,
			},
			{
				name: '个人总分',
				data: seriesData_personal,
				type: 'line',
				smooth: true,
			},
		],
	}

	option && myChart.setOption(option)
}

// 更新总分排名趋势图
function updateTotalRankTendency() {
	showLoading(document.getElementById('totalRankTendencyChart'))
	getIntelliSchoolApiJson(
		'/studentData/getAllTestRankInSchool',
		{
			studentId: $('select[name="studentIdSelect"]').val(),
		},
		updateTotalRankTendency_callback
	)
}

function updateTotalRankTendency_callback(data) {
	hiddenLoading(document.getElementById('totalRankTendencyChart'))
	var chartDom = document.getElementById('totalRankTendencyChart')
	var xAxisData = []
	var seriesData = []

	$.each(data, function (key, value) {
		// console.log('key = ' + key)
		// console.log('value = ' + value)
		xAxisData[xAxisData.length] = key
		seriesData[seriesData.length] = value
	})
	drawRankTendency(
		chartDom,
		xAxisData,
		seriesData,
		'总分',
		{
			y: 20,
			y2: 30,
		},
		true
	)
}

function drawRankTendency(
	chartDom,
	xAxisData,
	seriesData,
	chartsType,
	grid,
	showXAxis
) {
	var myChart = echarts.init(chartDom)
	var option

	option = {
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'category',
			data: xAxisData,
			show: showXAxis,
			// axisLabel: {
			// 	interval: 0, //横轴信息全部显示
			// 	rotate: -30, //-30度角倾斜显示
			// },
		},
		yAxis: {
			type: 'value',
			inverse: true,
			min: (value) => {
				return value.min
			},
			max: (value) => {
				return value.max
			},
			minInterval: 1,
			axisLabel: {
				formatter: '{value} 名',
			},
		},
		grid: grid,
		series: [
			{
				name: getName() + ' 的' + chartsType + '排名趋势',
				data: seriesData,
				type: 'line',
				smooth: true,
			},
		],
	}

	option && myChart.setOption(option)
}

var subjectIdInupdateAllSubjectRankTendency = 1
// 更新所有单科排名趋势
function updateAllSubjectRankTendency() {
	subjectIdInupdateAllSubjectRankTendency = 1
	for (i = 1; i <= 9; ++i) {
		showLoading(document.getElementById('rankTendencySubject_' + i))
		getIntelliSchoolApiJson(
			'/studentData/getAllTestSomeSubjectRankInSchool',
			{
				studentId: $('select[name="studentIdSelect"]').val(),
				subjectId: i,
			},
			updateAllSubjectRankTendency_callback
		)
	}
}

function updateAllSubjectRankTendency_callback(data) {
	var currSubjectId = subjectIdInupdateAllSubjectRankTendency
	var chartDom = document.getElementById(
		'rankTendencySubject_' + currSubjectId
	)
	$('.subjectTendencyBox')[currSubjectId - 1].classList.remove(
		'deactiveRankChart'
	)
	hiddenLoading(chartDom)
	var xAxisData = []
	var seriesData = []

	$.each(data, function (key, value) {
		// console.log('key = ' + key)
		if (value == -1) {
			$('.subjectTendencyBox')[currSubjectId - 1].classList.add(
				'deactiveRankChart'
			)
		} else {
			xAxisData[xAxisData.length] = key
			seriesData[seriesData.length] = value
		}
	})

	if (xAxisData.length + seriesData.length > 0) {
		drawRankTendency(
			chartDom,
			xAxisData,
			seriesData,
			subjectIdToName[currSubjectId],
			{
				y: 20,
				y2: 20,
				x2: 20,
				x: 60,
			},
			false
		)
	}
	subjectIdInupdateAllSubjectRankTendency++
}
