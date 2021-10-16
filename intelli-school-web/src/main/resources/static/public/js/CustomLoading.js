function showLoading(chartDom) {
	var myChart = echarts.init(chartDom)
	myChart.showLoading({
		text: '数据正在努力加载...',
		textStyle: { fontSize: 30, color: '#444' },
		effectOption: { backgroundColor: 'rgba(0, 0, 0, 0)' },
	})
}

function hiddenLoading(chartDom) {
	var myChart = echarts.init(chartDom)
	myChart.hideLoading()
}