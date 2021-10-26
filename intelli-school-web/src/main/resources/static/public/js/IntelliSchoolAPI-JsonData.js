// 云端调试环境
const IntelliSchoolUrlPrefix = 'http://www.intellischool.top:8088'
// 本地调试环境
// const IntelliSchoolUrlPrefix = 'http://localhost:8088/'
function getIntelliSchoolApiJson(urlPostfix, argObject, callback) {
	if (urlPostfix.substr(0, 1) != '/') urlPostfix = '/' + urlPostfix
	if (argObject != null) {
		urlPostfix += '?'
		$.each(argObject, function (key, value) {
			urlPostfix += key + '=' + value + '&'
		})
	}
	console.log('访问ApiUrl: ' + IntelliSchoolUrlPrefix + urlPostfix)
	// $.ajaxSetup({ async: false })
	$.getJSON(IntelliSchoolUrlPrefix + urlPostfix, function (result) {
		callback(result)
	})
}
