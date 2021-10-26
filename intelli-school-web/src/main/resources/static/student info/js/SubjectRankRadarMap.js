function updateSubjectRankRadarMap(studentId, examId) {
	showLoading(document.getElementById('radarMap'))

	var rankObject = getIntelliSchoolApiJson(
		'/studentData/getOneTestAllSubjectRankInSchool',
		{
			examId: examId,
			studentId: studentId,
		},
		updateSubjectRankRadarMapInfo_callback
	)
}

function updateSubjectRankRadarMapInfo_callback(rankObject) {
	$.getJSON(
		IntelliSchoolUrlPrefix +
			'/studentData/getNumberOfParticipants?examId=' +
			$('select[name="examIdSelect"]').val() +
			'&subjectId=1',
		function (maxValue) {
			var chartDom_here = document.getElementById('radarMap')
			hiddenLoading(chartDom_here)
			drawSubjectRankRadarMap(chartDom_here, maxValue, rankObject)
		}
	)
}

function drawSubjectRankRadarMap(chartDom, maxValue, rankObject) {
	var myChart = echarts.init(chartDom)
	var option
	var indicatorData = [
		{ name: '语文', max: 1 },
		{ name: '数学', max: 1 },
		{ name: '英语', max: 1 },
	]
	var seriesValueData = [
		getRadarValue(maxValue, rankObject['语文']),
		getRadarValue(maxValue, rankObject['数学']),
		getRadarValue(maxValue, rankObject['英语']),
	]

	if (
		rankObject['物理'] != -1 &&
		rankObject['化学'] != -1 &&
		rankObject['生物'] != -1
	) {
		indicatorData = indicatorData.concat([
			{ name: '物理', max: 1 },
			{ name: '化学', max: 1 },
			{ name: '生物', max: 1 },
		])
		seriesValueData = seriesValueData.concat([
			getRadarValue(maxValue, rankObject['物理']),
			getRadarValue(maxValue, rankObject['化学']),
			getRadarValue(maxValue, rankObject['生物']),
		])
	}

	if (
		rankObject['政治'] != -1 &&
		rankObject['历史'] != -1 &&
		rankObject['地理'] != -1
	) {
		indicatorData = indicatorData.concat([
			{ name: '政治', max: 1 },
			{ name: '历史', max: 1 },
			{ name: '地理', max: 1 },
		])
		seriesValueData = seriesValueData.concat([
			getRadarValue(maxValue, rankObject['政治']),
			getRadarValue(maxValue, rankObject['历史']),
			getRadarValue(maxValue, rankObject['地理']),
		])
	}
	option = {
		title: {
			text: '',
		},
		tooltip: {},
		radar: {
			name: {
				textStyle: {
					color: '#fff',
					backgroundColor: '#999',
					borderRadius: 3,
					padding: [3, 5],
				},
			},
			indicator: indicatorData,
		},
		series: [
			{
				name: '该学生本次考试的排名雷达',
				type: 'radar',
				areaStyle: { normal: {} },
				data: [
					{
						value: seriesValueData,
					},
				],
			},
		],
	}

	option && myChart.setOption(option)
}

function getRadarValue(maxValue, curValue) {
	return ((maxValue - curValue + 1) / maxValue).toFixed(4)
}
