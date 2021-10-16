var studentInfoSpans = []
function queryStudentInfo(stuId) {
    if (studentInfoSpans.length != 0) {
        for (i = 0; i < studentInfoSpans.length; ++i) {
            studentInfoSpans[i].innerText = 'Loading...'
        }
    }
    getIntelliSchoolApiJson('/studentData/getStudentInfo', {
        studentId: stuId
    }, queryStudentInfo_callback)
}

function queryStudentInfo_callback(data) {
    $.each(data, function (key, value) {
        // console.log("key=" + key + ", value=" + value);
        var spanDom = $('span[data-title=' + key + ']')[0];
        if (spanDom != null) {
            if (key == 'stuBorndate') spanDom.innerHTML = changeTime(value)
            else spanDom.innerText = value;
            if (studentInfoSpans.length <= 8) {
                studentInfoSpans[studentInfoSpans.length] = spanDom;
            }
        }
    })
}

function getName() {
    return $('span[data-title=stuName]')[0].innerText;
}

function changeTime(time) {
    if (time) {
        var oDate = new Date(time * 1),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate(),
            oTime = oYear + '年' + oMonth + '月' + oDay + '日';//拼接时间
        return oTime;
    } else {
        return "";
    }
}