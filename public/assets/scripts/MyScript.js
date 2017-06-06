/**
 * Created by mac on 17/6/5.
 */

function approveBut(_id, name) {
    $("#"+_id).text("已审批")
    $("#appro").attr("disabled", false)
    $("#subAg").remove()

    var out_trade_no = $("#out_trade_no").text()

    var data = {"out_trade_no": name, "openid": _id}

    $.ajax({
        url: '/Pay',
        type: 'post',
        data: data,
        success: function() {

    }
    })

}