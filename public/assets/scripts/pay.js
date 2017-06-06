/**
 * Created by mac on 17/6/5.
 */

function pay(_id, name) {

    $("#"+_id ).text("已支付")

    var out_trade_no = $("#out_trade_no").text()



    var data = {"out_trade_no": name, "openid": _id}

    $.ajax({
        url: '/isPay',
        type: 'post',
        data: data,
        success: function() {

        }
    })
}