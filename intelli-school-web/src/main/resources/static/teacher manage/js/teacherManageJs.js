//第一个图		
//初始化
var myChart = echarts.init(document.getElementById("main-dot"));
//图配置
var option1 = {
    color: ['#7189aa', '#df6b66', '#e79d88', '#8cc1aa', '#749aa0', '#72a375', '#efdd7d', '#71B9BC', '#7189aa', '#90CA8F', '#F59F48'],
    //标题
    title: {},
    //提示框
    tooltip: {
        show: true,
        // trigger: 'item'

        //全部显示并且带指示器
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            //type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    grid: {
        left: "5%",
        bottom: '10%',
        top: "10%",
        right: "5%",
        containLabel: true
    },
    legend: { //图例
        data: ['高一', '高二', '高三']
    },
    //小设置
    toolbox: {
        feature: {
            //还原
            restore: {
                show: true
            },
            //折柱切换
            //magicType: {show: true, type: ['line', 'bar']},
            //平铺和堆叠
            magicType: {
                type: ['stack', 'tiled']
            },
            //数据视图
            dataView: {},
            
        }
    },

    xAxis: {
        data: ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理', '技术', '美术', '体育', '音乐']
    },
    yAxis: {
        //坐标轴单位
        axisLabel: {
            //单位
            formatter: '{value} 人',
        }
    },
    series: [

        {
            name: '高一',
            type: 'bar',
            data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3]
        },
        {
            name: '高二',
            type: 'bar',
            data: [5, 5, 5, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2]
        }, {
            name: '高三',
            type: 'bar',
            data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 3, 3, 3]

        },
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option1);

//图函数
function insertK(divId, dt, lk) {
    var myChart = echarts.init(document.getElementById(divId));
    var option;
    option = {

        //提示框
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        animation: true,
        series: [{
            type: 'sankey',
            bottom: '10%',
            emphasis: {
                focus: 'adjacency'
            },
            data: dt,
            links: lk,
            orient: 'vertical',
            label: {
                position: 'top'
            },
            lineStyle: {
                color: 'source',
                curveness: 0.5
            },
        }]
    }
    myChart.setOption(option);
}

//放入
var id, data, lk;

//技术
id = 'k1';
data = [{
        name: '吴德敏'
    },
    {
        name: '吴伟朋'
    },
    {
        name: '席兰英'
    },
    {
        name: '赵兴花'
    },
    {
        name: '郑秋雁'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
]
lk = [{
        source: '吴德敏',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '吴德敏',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '吴德敏',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '吴德敏',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '吴德敏',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '吴伟朋',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '吴伟朋',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '吴伟朋',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '吴伟朋',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '吴伟朋',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '席兰英',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '席兰英',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '席兰英',
        target: '高一\n13\n班',
        value: 1
    },
    {
        source: '赵兴花',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '赵兴花',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '赵兴花',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '赵兴花',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '赵兴花',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '郑秋雁',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '郑秋雁',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '郑秋雁',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '郑秋雁',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '郑秋雁',
        target: '高二\n10\n班',
        value: 1
    }
];

insertK(id, data, lk);
$('#k1').hide();

//生物
id = 'k2';
data = [{
        name: '卞晓玲'
    },
    {
        name: '曹婧'
    },
    {
        name: '曾招金'
    },
    {
        name: '杜德智'
    },
    {
        name: '范德财'
    },
    {
        name: '封新城'
    },
    {
        name: '黄亚弟'
    },
    {
        name: '江春凤'
    },
    {
        name: '焦珍珍'
    },
    {
        name: '孔祥'
    },
    {
        name: '李承章'
    },
    {
        name: '李路葵'
    },
    {
        name: '李学梅'
    },
    {
        name: '高三\n01\n班'
    },
    {
        name: '高三\n02\n班'
    },
    {
        name: '高三\n03\n班'
    },
    {
        name: '高三\n04\n班'
    },
    {
        name: '高三\n05\n班'
    },
    {
        name: '高三\n06\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
]

lk = [{
        source: '卞晓玲',
        target: '高三\n01\n班',
        value: 1
    },
    {
        source: '卞晓玲',
        target: '高三\n02\n班',
        value: 1
    },
    {
        source: '曹婧',
        target: '高三\n03\n班',
        value: 1
    },
    {
        source: '曹婧',
        target: '高三\n04\n班',
        value: 1
    },
    {
        source: '曾招金',
        target: '高三\n05\n班',
        value: 1
    },
    {
        source: '曾招金',
        target: '高三\n06\n班',
        value: 1
    },
    {
        source: '杜德智',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '杜德智',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '范德财',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '范德财',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '封新城',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '黄亚弟',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '黄亚弟',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '江春凤',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '江春凤',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '焦珍珍',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '焦珍珍',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '孔祥',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '孔祥',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '李承章',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '李承章',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李路葵',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李路葵',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李学梅',
        target: '高一\n13\n班',
        value: 1
    },
];
insertK(id, data, lk);
$('#k2').hide();

//历史
id = 'k3';
data = [{
        name: '陈东霖'
    },
    {
        name: '陈莉媛'
    },
    {
        name: '陈慰峰'
    },
    {
        name: '房兰兰'
    },
    {
        name: '付俊艳'
    },
    {
        name: '高清扬'
    },
    {
        name: '黄哲军'
    },
    {
        name: '江忠义'
    },
    {
        name: '金潞'
    },
    {
        name: '赖学军'
    },
    {
        name: '李逢祥'
    },
    {
        name: '李清景'
    },
    {
        name: '李映杏'
    },
    {
        name: '高三\n07\n班'
    },
    {
        name: '高三\n08\n班'
    },
    {
        name: '高三\n09\n班'
    },
    {
        name: '高三\n10\n班'
    },
    {
        name: '高三\n11\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
];

var lk = [{
        source: '陈东霖',
        target: '高三\n07\n班',
        value: 1
    },
    {
        source: '陈东霖',
        target: '高三\n08\n班',
        value: 1
    },
    {
        source: '陈莉媛',
        target: '高三\n09\n班',
        value: 1
    },
    {
        source: '陈莉媛',
        target: '高三\n10\n班',
        value: 1
    },
    {
        source: '陈慰峰',
        target: '高三\n11\n班',
        value: 1
    },
    {
        source: '房兰兰',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '付俊艳',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '付俊艳',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '高清扬',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '高清扬',
        target: '高二\n10\n班',
        value: 1
    },
    {
        source: '黄哲军',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '黄哲军',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '江忠义',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '江忠义',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '金潞',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '金潞',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '赖学军',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '赖学军',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '李逢祥',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '李逢祥',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李清景',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李清景',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李映杏',
        target: '高一\n13\n班',
        value: 1
    },
]
insertK(id, data, lk);

//语文
id = 'k4';
data = [{
        name: '白沉'
    },
    {
        name: '蔡东儒'
    },
    {
        name: '曹树彬'
    },
    {
        name: '柴子文'
    },
    {
        name: '陈红嘉'
    },
    {
        name: '陈起凤'
    },
    {
        name: '丁艳锋'
    },
    {
        name: '杜灵欣'
    },
    {
        name: '范平'
    },
    {
        name: '冯嘉华'
    },
    {
        name: '傅亚芳'
    },
    {
        name: '黄丽燕'
    },
    {
        name: '姬龙'
    },
    {
        name: '姜学军'
    },
    {
        name: '金志雄'
    },
    {
        name: '乐亮'
    },
    {
        name: '李宏佳'
    },
    {
        name: '李士群'
    },
    {
        name: '高三\n01\n班'
    },
    {
        name: '高三\n02\n班'
    },
    {
        name: '高三\n03\n班'
    },
    {
        name: '高三\n04\n班'
    },
    {
        name: '高三\n05\n班'
    },
    {
        name: '高三\n06\n班'
    },
    {
        name: '高三\n07\n班'
    },
    {
        name: '高三\n08\n班'
    },
    {
        name: '高三\n09\n班'
    },
    {
        name: '高三\n10\n班'
    },
    {
        name: '高三\n11\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
];
lk = [{
        source: '白沉',
        target: '高三\n01\n班',
        value: 1
    },
    {
        source: '白沉',
        target: '高三\n02\n班',
        value: 1
    },
    {
        source: '蔡东儒',
        target: '高三\n03\n班',
        value: 1
    },
    {
        source: '蔡东儒',
        target: '高三\n04\n班',
        value: 1
    },
    {
        source: '曹树彬',
        target: '高三\n05\n班',
        value: 1
    },
    {
        source: '曹树彬',
        target: '高三\n06\n班',
        value: 1
    },
    {
        source: '柴子文',
        target: '高三\n07\n班',
        value: 1
    },
    {
        source: '柴子文',
        target: '高三\n08\n班',
        value: 1
    },
    {
        source: '陈红嘉',
        target: '高三\n09\n班',
        value: 1
    },
    {
        source: '陈红嘉',
        target: '高三\n10\n班',
        value: 1
    },
    {
        source: '陈起凤',
        target: '高三\n11\n班',
        value: 1
    },
    {
        source: '丁艳锋',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '丁艳锋',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '杜灵欣',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '杜灵欣',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '范平',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '范平',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '冯嘉华',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '冯嘉华',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '傅亚芳',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '傅亚芳',
        target: '高二\n10\n班',
        value: 1
    },
    {
        source: '黄丽燕',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '黄丽燕',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '姬龙',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '姬龙',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '姜学军',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '姜学军',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '金志雄',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '金志雄',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '乐亮',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '乐亮',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李宏佳',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李宏佳',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李士群',
        target: '高一\n13\n班',
        value: 1
    },
];
insertK(id, data, lk);

//英语
id = 'k5';
data = [{
        name: '柏洪'
    },
    {
        name: '蔡水芳'
    },
    {
        name: '曾诚诚'
    },
    {
        name: '陈宝青'
    },
    {
        name: '陈今言'
    },
    {
        name: '陈世传'
    },
    {
        name: '董兰芝'
    },
    {
        name: '段德志'
    },
    {
        name: '方家伟'
    },
    {
        name: '冯燕青'
    },
    {
        name: '高福英'
    },
    {
        name: '黄善杰'
    },
    {
        name: '季熠婷'
    },
    {
        name: '蒋立梅'
    },
    {
        name: '阚春燕'
    },
    {
        name: '冷雪莲'
    },
    {
        name: '李健如'
    },
    {
        name: '李旺喜'
    }, {
        name: '高三\n01\n班'
    },
    {
        name: '高三\n02\n班'
    },
    {
        name: '高三\n03\n班'
    },
    {
        name: '高三\n04\n班'
    },
    {
        name: '高三\n05\n班'
    },
    {
        name: '高三\n06\n班'
    },
    {
        name: '高三\n07\n班'
    },
    {
        name: '高三\n08\n班'
    },
    {
        name: '高三\n09\n班'
    },
    {
        name: '高三\n10\n班'
    },
    {
        name: '高三\n11\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
];
lk = [{
        source: '柏洪',
        target: '高三\n01\n班',
        value: 1
    },
    {
        source: '柏洪',
        target: '高三\n02\n班',
        value: 1
    },
    {
        source: '蔡水芳',
        target: '高三\n03\n班',
        value: 1
    },
    {
        source: '蔡水芳',
        target: '高三\n04\n班',
        value: 1
    },
    {
        source: '曾诚诚',
        target: '高三\n05\n班',
        value: 1
    },
    {
        source: '曾诚诚',
        target: '高三\n06\n班',
        value: 1
    },
    {
        source: '陈宝青',
        target: '高三\n07\n班',
        value: 1
    },
    {
        source: '陈宝青',
        target: '高三\n08\n班',
        value: 1
    },
    {
        source: '陈今言',
        target: '高三\n09\n班',
        value: 1
    },
    {
        source: '陈今言',
        target: '高三\n10\n班',
        value: 1
    },
    {
        source: '陈世传',
        target: '高三\n11\n班',
        value: 1
    },
    {
        source: '董兰芝',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '董兰芝',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '段德志',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '段德志',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '方家伟',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '方家伟',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '冯燕青',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '冯燕青',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '高福英',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '高福英',
        target: '高二\n10\n班',
        value: 1
    },
    {
        source: '黄善杰',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '黄善杰',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '季熠婷',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '季熠婷',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '蒋立梅',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '蒋立梅',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '阚春燕',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '阚春燕',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '冷雪莲',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '冷雪莲',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李健如',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李健如',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李旺喜',
        target: '高一\n13\n班',
        value: 1
    },
];
insertK(id, data, lk);

//美术
id = 'k6';
data = [{
        name: '吴会珍'
    },
    {
        name: '吴燕丽'
    },
    {
        name: '夏为民'
    },
    {
        name: '赵远强'
    },
    {
        name: '郑兴利'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
];
lk = [{
        source: '吴会珍',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '吴会珍',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '吴会珍',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '吴会珍',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '吴会珍',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '吴燕丽',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '吴燕丽',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '吴燕丽',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '吴燕丽',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '吴燕丽',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '夏为民',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '夏为民',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '夏为民',
        target: '高一\n13\n班',
        value: 1
    },
    {
        source: '赵远强',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '赵远强',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '赵远强',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '赵远强',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '赵远强',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '郑兴利',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '郑兴利',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '郑兴利',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '郑兴利',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '郑兴利',
        target: '高二\n10\n班',
        value: 1
    },
];
insertK(id, data, lk);

//音乐
id = 'k7';
data = [{
        name: '吴仁华'
    },
    {
        name: '伍震'
    },
    {
        name: '肖进方'
    },
    {
        name: '郑家棋'
    },
    {
        name: '钟鹏宇'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
];
lk = [{
        source: '吴仁华',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '吴仁华',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '吴仁华',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '吴仁华',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '吴仁华',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '伍震',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '伍震',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '伍震',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '伍震',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '伍震',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '肖进方',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '肖进方',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '肖进方',
        target: '高一\n13\n班',
        value: 1
    },
    {
        source: '郑家棋',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '郑家棋',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '郑家棋',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '郑家棋',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '郑家棋',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '钟鹏宇',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '钟鹏宇',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '钟鹏宇',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '钟鹏宇',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '钟鹏宇',
        target: '高二\n10\n班',
        value: 1
    },
];
insertK(id, data, lk);

//政治
id = 'k8';
data = [{
        name: '陈川东'
    },
    {
        name: '陈俊云'
    },
    {
        name: '陈苏文'
    },
    {
        name: '方温'
    },
    {
        name: '符春明'
    },
    {
        name: '高锦芬'
    },
    {
        name: '黄友锋'
    },
    {
        name: '江容容'
    },
    {
        name: '金凤梅'
    },
    {
        name: '来明'
    },
    {
        name: '李德吉'
    },
    {
        name: '李娜成'
    },
    {
        name: '李耀富'
    },
    {
        name: '高三\n07\n班'
    },
    {
        name: '高三\n08\n班'
    },
    {
        name: '高三\n09\n班'
    },
    {
        name: '高三\n10\n班'
    },
    {
        name: '高三\n11\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
];
lk = [{
        source: '陈川东',
        target: '高三\n07\n班',
        value: 1
    },
    {
        source: '陈川东',
        target: '高三\n08\n班',
        value: 1
    },
    {
        source: '陈俊云',
        target: '高三\n09\n班',
        value: 1
    },
    {
        source: '陈俊云',
        target: '高三\n10\n班',
        value: 1
    },
    {
        source: '陈苏文',
        target: '高三\n11\n班',
        value: 1
    },
    {
        source: '方温',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '符春明',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '符春明',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '高锦芬',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '高锦芬',
        target: '高二\n10\n班',
        value: 1
    },
    {
        source: '黄友锋',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '黄友锋',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '江容容',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '江容容',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '金凤梅',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '金凤梅',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '来明',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '来明',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '李德吉',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '李德吉',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李娜成',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李娜成',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李耀富',
        target: '高一\n13\n班',
        value: 1
    },
];

insertK(id, data, lk);

//物理
id = 'k9';
data = [{
        name: '薄国斌'
    },
    {
        name: '蔡永君'
    },
    {
        name: '曾坤泉'
    },
    {
        name: '董文鹏'
    },
    {
        name: '段秀群'
    },
    {
        name: '方温'
    },
    {
        name: '黄素慧'
    },
    {
        name: '贾建建'
    },
    {
        name: '蒋蔚蔚'
    },
    {
        name: '康阳阳'
    },
    {
        name: '黎新春'
    },
    {
        name: '李静海'
    },
    {
        name: '李喜文'
    },
    {
        name: '高三\n01\n班'
    },
    {
        name: '高三\n02\n班'
    },
    {
        name: '高三\n03\n班'
    },
    {
        name: '高三\n04\n班'
    },
    {
        name: '高三\n05\n班'
    },
    {
        name: '高三\n06\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
];
lk = [{
        source: '薄国斌',
        target: '高三\n01\n班',
        value: 1
    },
    {
        source: '薄国斌',
        target: '高三\n02\n班',
        value: 1
    },
    {
        source: '蔡永君',
        target: '高三\n03\n班',
        value: 1
    },
    {
        source: '蔡永君',
        target: '高三\n04\n班',
        value: 1
    },
    {
        source: '曾坤泉',
        target: '高三\n05\n班',
        value: 1
    },
    {
        source: '曾坤泉',
        target: '高三\n06\n班',
        value: 1
    },
    {
        source: '董文鹏',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '董文鹏',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '段秀群',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '段秀群',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '方温',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '黄素慧',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '黄素慧',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '贾建建',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '贾建建',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '蒋蔚蔚',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '蒋蔚蔚',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '康阳阳',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '康阳阳',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '黎新春',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '黎新春',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李静海',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李静海',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李喜文',
        target: '高一\n13\n班',
        value: 1
    },
];

insertK(id, data, lk);

//体育
id = 'k10';
data = [{
        name: '吴立川'
    },
    {
        name: '吴兆雄'
    },
    {
        name: '向世雄'
    },
    {
        name: '郑博慧'
    },
    {
        name: '郑子坤'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
];
lk = [{
        source: '吴立川',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '吴立川',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '吴立川',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '吴立川',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '吴立川',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '吴兆雄',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '吴兆雄',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '吴兆雄',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '吴兆雄',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '吴兆雄',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '向世雄',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '向世雄',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '向世雄',
        target: '高一\n13\n班',
        value: 1
    },
    {
        source: '郑博慧',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '郑博慧',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '郑博慧',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '郑博慧',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '郑博慧',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '郑子坤',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '郑子坤',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '郑子坤',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '郑子坤',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '郑子坤',
        target: '高二\n10\n班',
        value: 1
    },
];

insertK(id, data, lk);

//数学
id = 'k11';
data = [{
        name: '白世文'
    },
    {
        name: '蔡坤'
    },
    {
        name: '曹英群'
    },
    {
        name: '常永江'
    },
    {
        name: '陈济芬'
    },
    {
        name: '陈汝森'
    },
    {
        name: '董春香'
    },
    {
        name: '杜兴隆'
    },
    {
        name: '范永瑞'
    },
    {
        name: '冯尚连'
    },
    {
        name: '甘艳梅'
    },
    {
        name: '黄朋辉'
    },
    {
        name: '纪梦'
    },
    {
        name: '蒋道明'
    },
    {
        name: '井悦'
    },
    {
        name: '雷闪'
    },
    {
        name: '李吉莉'
    },
    {
        name: '李思廉'
    },
    {
        name: '高三\n01\n班'
    },
    {
        name: '高三\n02\n班'
    },
    {
        name: '高三\n03\n班'
    },
    {
        name: '高三\n04\n班'
    },
    {
        name: '高三\n05\n班'
    },
    {
        name: '高三\n06\n班'
    },
    {
        name: '高三\n07\n班'
    },
    {
        name: '高三\n08\n班'
    },
    {
        name: '高三\n09\n班'
    },
    {
        name: '高三\n10\n班'
    },
    {
        name: '高三\n11\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
];
lk = [{
        source: '白世文',
        target: '高三\n01\n班',
        value: 1
    },
    {
        source: '白世文',
        target: '高三\n02\n班',
        value: 1
    },
    {
        source: '蔡坤',
        target: '高三\n03\n班',
        value: 1
    },
    {
        source: '蔡坤',
        target: '高三\n04\n班',
        value: 1
    },
    {
        source: '曹英群',
        target: '高三\n05\n班',
        value: 1
    },
    {
        source: '曹英群',
        target: '高三\n06\n班',
        value: 1
    },
    {
        source: '常永江',
        target: '高三\n07\n班',
        value: 1
    },
    {
        source: '常永江',
        target: '高三\n08\n班',
        value: 1
    },
    {
        source: '陈济芬',
        target: '高三\n09\n班',
        value: 1
    },
    {
        source: '陈济芬',
        target: '高三\n10\n班',
        value: 1
    },
    {
        source: '陈汝森',
        target: '高三\n11\n班',
        value: 1
    },
    {
        source: '董春香',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '董春香',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '杜兴隆',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '杜兴隆',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '范永瑞',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '范永瑞',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '冯尚连',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '冯尚连',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '甘艳梅',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '甘艳梅',
        target: '高二\n10\n班',
        value: 1
    },
    {
        source: '黄朋辉',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '黄朋辉',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '纪梦',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '纪梦',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '蒋道明',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '蒋道明',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '井悦',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '井悦',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '雷闪',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '雷闪',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李吉莉',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李吉莉',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李思廉',
        target: '高一\n13\n班',
        value: 1
    },
];

insertK(id, data, lk);

//化学
id = 'k12';
data = [{
        name: '毕家林'
    },
    {
        name: '曹大勇'
    },
    {
        name: '曾维群'
    },
    {
        name: '董正春'
    },
    {
        name: '樊乐'
    },
    {
        name: '房兰兰'
    },
    {
        name: '黄贤平'
    },
    {
        name: '贾秀杰'
    },
    {
        name: '蒋泽先'
    },
    {
        name: '可秀'
    },
    {
        name: '李彬涛'
    },
    {
        name: '李兰云'
    },
    {
        name: '李笑芬'
    },
    {
        name: '高三\n01\n班'
    },
    {
        name: '高三\n02\n班'
    },
    {
        name: '高三\n03\n班'
    },
    {
        name: '高三\n04\n班'
    },
    {
        name: '高三\n05\n班'
    },
    {
        name: '高三\n06\n班'
    },
    {
        name: '高二\n01\n班'
    },
    {
        name: '高二\n02\n班'
    },
    {
        name: '高二\n03\n班'
    },
    {
        name: '高二\n04\n班'
    },
    {
        name: '高二\n05\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
];
lk = [{
        source: '毕家林',
        target: '高三\n01\n班',
        value: 1
    },
    {
        source: '毕家林',
        target: '高三\n02\n班',
        value: 1
    },
    {
        source: '曹大勇',
        target: '高三\n03\n班',
        value: 1
    },
    {
        source: '曹大勇',
        target: '高三\n04\n班',
        value: 1
    },
    {
        source: '曾维群',
        target: '高三\n05\n班',
        value: 1
    },
    {
        source: '曾维群',
        target: '高三\n06\n班',
        value: 1
    },
    {
        source: '董正春',
        target: '高二\n01\n班',
        value: 1
    },
    {
        source: '董正春',
        target: '高二\n02\n班',
        value: 1
    },
    {
        source: '樊乐',
        target: '高二\n03\n班',
        value: 1
    },
    {
        source: '樊乐',
        target: '高二\n04\n班',
        value: 1
    },
    {
        source: '房兰兰',
        target: '高二\n05\n班',
        value: 1
    },
    {
        source: '黄贤平',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '黄贤平',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '贾秀杰',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '贾秀杰',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '蒋泽先',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '蒋泽先',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '可秀',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '可秀',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '李彬涛',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '李彬涛',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李兰云',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李兰云',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李笑芬',
        target: '高一\n13\n班',
        value: 1
    },
];

insertK(id, data, lk);

//地理
id = 'k13';
data = [{
        name: '陈光芳'
    },
    {
        name: '陈妙仪'
    },
    {
        name: '陈向晖'
    },
    {
        name: '封新城'
    },
    {
        name: '付长海'
    },
    {
        name: '高稳稳'
    },
    {
        name: '惠才'
    },
    {
        name: '姜立强'
    },
    {
        name: '金香香'
    },
    {
        name: '蓝虹'
    },
    {
        name: '李桂钧'
    },
    {
        name: '李睿婷'
    },
    {
        name: '李元宾'
    }, {
        name: '高三\n07\n班'
    },
    {
        name: '高三\n08\n班'
    },
    {
        name: '高三\n09\n班'
    },
    {
        name: '高三\n10\n班'
    },
    {
        name: '高三\n11\n班'
    },
    {
        name: '高二\n06\n班'
    },
    {
        name: '高二\n07\n班'
    },
    {
        name: '高二\n08\n班'
    },
    {
        name: '高二\n09\n班'
    },
    {
        name: '高二\n10\n班'
    },
    {
        name: '高一\n01\n班'
    },
    {
        name: '高一\n02\n班'
    },
    {
        name: '高一\n03\n班'
    },
    {
        name: '高一\n04\n班'
    },
    {
        name: '高一\n05\n班'
    },
    {
        name: '高一\n06\n班'
    },
    {
        name: '高一\n07\n班'
    },
    {
        name: '高一\n08\n班'
    },
    {
        name: '高一\n09\n班'
    },
    {
        name: '高一\n10\n班'
    },
    {
        name: '高一\n11\n班'
    },
    {
        name: '高一\n12\n班'
    },
    {
        name: '高一\n13\n班'
    },
];
lk = [{
        source: '陈光芳',
        target: '高三\n07\n班',
        value: 1
    },
    {
        source: '陈光芳',
        target: '高三\n08\n班',
        value: 1
    },
    {
        source: '陈妙仪',
        target: '高三\n09\n班',
        value: 1
    },
    {
        source: '陈妙仪',
        target: '高三\n10\n班',
        value: 1
    },
    {
        source: '陈向晖',
        target: '高三\n11\n班',
        value: 1
    },
    {
        source: '封新城',
        target: '高二\n06\n班',
        value: 1
    },
    {
        source: '付长海',
        target: '高二\n07\n班',
        value: 1
    },
    {
        source: '付长海',
        target: '高二\n08\n班',
        value: 1
    },
    {
        source: '高稳稳',
        target: '高二\n09\n班',
        value: 1
    },
    {
        source: '高稳稳',
        target: '高二\n10\n班',
        value: 1
    },
    {
        source: '惠才',
        target: '高一\n01\n班',
        value: 1
    },
    {
        source: '惠才',
        target: '高一\n02\n班',
        value: 1
    },
    {
        source: '姜立强',
        target: '高一\n03\n班',
        value: 1
    },
    {
        source: '姜立强',
        target: '高一\n04\n班',
        value: 1
    },
    {
        source: '金香香',
        target: '高一\n05\n班',
        value: 1
    },
    {
        source: '金香香',
        target: '高一\n06\n班',
        value: 1
    },
    {
        source: '蓝虹',
        target: '高一\n07\n班',
        value: 1
    },
    {
        source: '蓝虹',
        target: '高一\n08\n班',
        value: 1
    },
    {
        source: '李桂钧',
        target: '高一\n09\n班',
        value: 1
    },
    {
        source: '李桂钧',
        target: '高一\n10\n班',
        value: 1
    },
    {
        source: '李睿婷',
        target: '高一\n11\n班',
        value: 1
    },
    {
        source: '李睿婷',
        target: '高一\n12\n班',
        value: 1
    },
    {
        source: '李元宾',
        target: '高一\n13\n班',
        value: 1
    },
];

insertK(id, data, lk);

//选择展示
var off1 = ["k1", "k2", "k3", "k4", "k5", "k6", "k7", "k8", "k9", "k10", "k11", "k12", "k13"];
var off2 = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13"];
//console.log(off1[1]);
$(document).ready(function() {
    for(var j = 0; j < 13; j++) {
        $("#" + off1[j] + "").hide();
        $("#" + off2[j] + "").css({
            "background-color": "rgb(224,224,224)",
            "color": "#ccc"
        })
    }

    $("#k1").show();
    $("#c1").css({
        "background-color": "rgb(114,163,117)",
        "color": "#000"
    })
    $("#c1").click(function() { //被点击
        var x = 'k1';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c1").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c2").click(function() { //被点击
        var x = 'k2';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c2").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c3").click(function() { //被点击
        var x = 'k3';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c3").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c4").click(function() { //被点击
        var x = 'k4';
        for(var j = 0; j < 13; j++) {
            $("#c4").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            $("#" + x + "").show(); //相应内容展示
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c5").click(function() { //被点击
        var x = 'k5';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c5").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c6").click(function() { //被点击
        var x = 'k6';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c6").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c7").click(function() { //被点击
        var x = 'k7';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c7").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c8").click(function() { //被点击
        var x = 'k8';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c8").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c9").click(function() { //被点击
        var x = 'k9';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c9").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c10").click(function() { //被点击
        var x = 'k10';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c10").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c11").click(function() { //被点击
        var x = 'k11';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c11").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c12").click(function() { //被点击
        var x = 'k12';
        for(var j = 0; j < 13; j++) {
            console.log(x)
            $("#" + x + "").show(); //相应内容展示
            $("#c12").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });
    $("#c13").click(function() { //被点击
        var x = 'k13';
        for(var j = 0; j < 13; j++) {
            $("#" + x + "").show(); //相应内容展示
            $("#c13").css({
                "background-color": "rgb(114,163,117)",
                "color": "#000"
            })
            if(off1[j] != x) {
                //console.log(off1[j])224,224,224
                $("#" + off1[j] + "").hide(); //其他内容隐藏
                $("#" + off2[j] + "").css({
                    "background-color": "rgb(224,224,224)",
                    "color": "#ccc"
                })
            }
        };
    });

});