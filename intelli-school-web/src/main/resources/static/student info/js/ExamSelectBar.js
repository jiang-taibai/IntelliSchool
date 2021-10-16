function updateExamSelectBar() {
    getIntelliSchoolApiJson('/studentData/getAllExamByStudentId', {
        studentId: $('select[name="studentIdSelect"]').val(),
    }, updateExamSelectBar_callback)
}

function updateExamSelectBar_callback(data) {
    $('#examIdSelect').selectpicker('val', ['noneSelectedText'])    //回到初始状态
    $('#examIdSelect').selectpicker('refresh')
    $("#examIdSelect").find("option").remove();
    var selectrateid = 0
    $.each(data, function (index, value) {
        $("#examIdSelect")
            .append($("<option value='" + value['examId'] + "'>[" +
                value['examId'] + "] " + value['examName'] + "</option>"))
        if(index == 0) {
            selectrateid = value['examId']
            $("#examIdSelect").selectpicker('val',selectrateid);
            updateChart($('select[name="studentIdSelect"]').val(), selectrateid)
        }
        $("#examIdSelect").selectpicker("refresh");
    })
}