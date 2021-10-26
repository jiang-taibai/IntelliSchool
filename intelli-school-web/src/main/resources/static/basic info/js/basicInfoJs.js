function initBasicInfo_Szx() {
	//初始化
	var myChart = echarts.init(document.getElementById('main-age'))
	//图配置
	var option1 = {
		color: [
			'#7189aa',
			'#df6b66',
			'#e79d88',
			'#8cc1aa',
			'#749aa0',
			'#72a375',
			'#efdd7d',
			'#71B9BC',
			'#7189aa',
			'#90CA8F',
			'#F59F48',
		],
		//标题
		title: {},
		//提示框
		tooltip: {
			show: true,
			// trigger: 'item'

			//全部显示并且带指示器
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985',
				},
			},
		},
		grid: {
			left: '5%',
			bottom: '5%',
			top: '10%',
			right: '5%',
			containLabel: true,
		},

		legend: {
			//图例
			data: ['总人数', '女', '男'],
		},
		xAxis: {
			data: ['≤15岁', '16岁', '17岁', '18岁', '19岁', '≥20岁'],
		},
		yAxis: {},

		series: [
			{
				name: '总人数',
				type: 'line',
				data: [96, 360, 441, 362, 133, 16],
			},
			{
				name: '女',
				type: 'bar',
				data: [36, 127, 150, 118, 60, 5],
			},
			{
				name: '男',
				type: 'bar',
				data: [60, 233, 291, 244, 73, 11],
			},
		],
	}
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option1)

	var dt = {
		高一01班: 41,
		高一02班: 36,
		高一03班: 37,
		高一04班: 35,
		高一05班: 38,
		高一06班: 36,

		高一07班: 45,
		高一08班: 37,
		高一09班: 41,
		高一10班: 35,
		高一11班: 44,
		高一12班: 47,
		高一13班: 42,
		高二01班: 48,
		高二02班: 47,
		高二03班: 42,
		高二04班: 36,
		高二05班: 42,
		高二06班: 45,
		高二07班: 37,
		高二08班: 35,
		高二09班: 48,
		高二10班: 39,
		高三01班: 35,
		高三02班: 44,
		高三03班: 49,
		高三04班: 41,
		高三05班: 41,
		高三06班: 46,
		高三07班: 47,
		高三08班: 42,
		高三09班: 42,
		高三10班: 44,
		高三11班: 44,
	}
	//<div class='peop'><p>"+dt[i]+"人</p></div>
	for (i in dt) {
		var t =
			"<div class='m3-box'><div class='m3-box1'><div class='m3-text'>" +
			i +
			"</div></div><div class='m3-box2'><div id=" +
			i +
			" class='thett'></div></div></div>"
		var width = 190 * (dt[i] / 50)
		$('#m3').append(t)
		var x = "<div class='peop'><p>" + dt[i] + '人</p></div>'

		var color = 'rgb(139,192,170)'
		if (dt[i] < 30) {
			color = 'rgb(139,192,170)'
		} else if (dt[i] < 40) {
			color = 'rgb(229,219,134)'
		} else {
			color = 'rgb(225,108,103)'
		}
		$('#' + i + '').css({
			width: width,
			'background-color': color,
			height: '100%',
		})
		$('#' + i + '').append(x)
	}

	var myBing = echarts.init(document.getElementById('m2-2-2'))
	var option2 = {
		color: ['#efdd7d', '#71B9BC', '#7189aa', '#90CA8F', '#F59F48'],
		title: {
			//padding:[40,20,20,200],
			top: 0,
			right: 110,
			text: '民族',
			subtext: '汉族1320人',
			textStyle: {
				fontSize: 14,
				fontWeight: 'bolder',
				color: '#333', // 主标题文字颜色
			},

			subtextStyle: {
				//副标题文本样式{"color": "#aaa"}
				color: '#000',
				fontSize: 12,
				fontStyle: 'normal',
				fontWeight: 'normal',
			},
		},
		legend: {
			data: [
				'藏族5人',
				'满族7人',
				'维吾尔族9人',
				'苗族9人',
				'蒙古族12人',
				'彝族11人',
				'土家族13人',
				'壮族12人',
				'回族10人',
			],
			//翻页
			type: 'scroll',
			//竖着放
			//orient: 'vertical',
			right: 0,
			//top: 30,
			bottom: 20,
		},
		series: [
			{
				name: '民族信息',
				type: 'pie',
				radius: '55%',
				itemStyle: {
					normal: {
						label: {
							show: false,
						}, //文本标签
						labelLine: {
							show: false,
						}, //不需要设置引导线
					},
				},
				data: [
					{
						value: 5,
						name: '藏族5人',
					},
					{
						value: 7,
						name: '满族7人',
					},
					{
						value: 9,
						name: '维吾尔族9人',
					},
					{
						value: 9,
						name: '苗族9人',
					},
					{
						value: 12,
						name: '蒙古族12人',
					},
					{
						value: 11,
						name: '彝族11人',
					},
					{
						value: 13,
						name: '土家族13人',
					},
					{
						value: 12,
						name: '壮族12人',
					},
					{
						value: 10,
						name: '回族10人',
					},
				],
			},
		],
	}
	myBing.setOption(option2)

	var myBing = echarts.init(document.getElementById('m2-2-1'))
	var option3 = {
		color: [
			'#749aa0',
			'#72a375',
			'#efdd7d',
			'#71B9BC',
			'#7189aa',
			'#90CA8F',
			'#F59F48',
		],
		title: {
			//padding:[40,20,20,200],
			top: 0,
			right: 110,
			textStyle: {
				fontSize: 14,
				fontWeight: 'bolder',
				color: '#333', // 主标题文字颜色
			},
			text: '政治面貌',
		},

		legend: {
			data: ['群众271人', '共青团员1137人'],
			right: 30,
			bottom: 10,
		},
		series: [
			{
				name: '政治面貌',
				type: 'pie',
				radius: '55%',
				itemStyle: {
					normal: {
						label: {
							show: false,
						}, //文本标签
						labelLine: {
							show: false,
						}, //不需要设置引导线
					},
				},
				data: [
					{
						value: 271,
						name: '群众271人',
					},
					{
						value: 1137,
						name: '共青团员1137人',
					},
				],
			},
		],
	}
	myBing.setOption(option3)

	//初始化
	var myChart1 = echarts.init(document.getElementById('m2-1-1'))
	//图配置
	var option4 = {
		color: [
			'#e79d88',
			'#8cc1aa',
			'#749aa0',
			'#72a375',
			'#efdd7d',
			'#71B9BC',
			'#7189aa',
			'#90CA8F',
			'#F59F48',
		],
		//标题
		title: {},
		//提示框
		tooltip: {
			show: true,

			//显示当前
			// trigger: 'item'

			//全部显示
			trigger: 'axis',
			axisPointer: {
				//十字准星
				//type: 'cross',
				//单个竖线
				//type:'line',
				type: 'none',
				label: {
					backgroundColor: '#6a7985',
				},
			},
		},

		legend: {
			show: false,
		},
		grid: {
			bottom: '10%',
			top: '0%',
			containLabel: true,
		},
		xAxis: {
			data: ['性别'],
			//去掉整个坐标轴
			//show:false
			//去掉刻度
			axisTick: {
				show: false,
			},
			//去掉轴线
			axisLine: {
				show: false,
			},
		},
		yAxis: {
			show: false,
		},

		series: [
			{
				barWidth: 50,
				name: '女',
				stack: '总量',
				type: 'bar',
				data: [496],
				itemStyle: {
					normal: {
						barBorderRadius: [0, 0, 10, 10],
					},
				},
			},
			{
				barWidth: 50,
				name: '男',
				stack: '总量',
				type: 'bar',
				data: [912],
				itemStyle: {
					normal: {
						barBorderRadius: [10, 10, 0, 0],
					},
				},
			},
		],
	}
	myChart1.setOption(option4)

	var myChart2 = echarts.init(document.getElementById('m2-1-2'))
	//图配置
	var option5 = {
		color: [
			'#7189aa',
			'#df6b66',
			'#e79d88',
			'#8cc1aa',
			'#749aa0',
			'#72a375',
			'#efdd7d',
			'#71B9BC',
			'#7189aa',
			'#90CA8F',
			'#F59F48',
		],
		//标题
		title: {},
		//提示框
		tooltip: {
			show: true,
			trigger: 'axis',
			axisPointer: {
				type: 'none',
				label: {
					backgroundColor: '#6a7985',
				},
			},
		},
		grid: {
			bottom: '10%',
			top: '0%',
			containLabel: true,
		},
		legend: {
			show: false,
		},
		xAxis: {
			data: ['年级'],
			axisTick: {
				show: false,
			},
			//去掉轴线
			axisLine: {
				show: false,
			},
		},
		yAxis: {
			show: false,
		},

		series: [
			{
				barWidth: 50,
				name: '高一',
				stack: '总量',
				type: 'bar',
				data: [514],
				itemStyle: {
					normal: {
						barBorderRadius: [0, 0, 10, 10],
					},
				},
			},
			{
				barWidth: 50,
				name: '高二',
				stack: '总量',
				type: 'bar',
				data: [933],
			},
			{
				barWidth: 50,
				name: '高三',
				stack: '总量',
				type: 'bar',
				data: [1408],
				itemStyle: {
					normal: {
						barBorderRadius: [10, 10, 0, 0],
					},
				},
			},
		],
	}
	myChart2.setOption(option5)
}
