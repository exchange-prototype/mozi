$(document).ready(function() {
    var cur; //保存当前汇率的左边币种
    var des; //保存当前汇率的右边币种

    //当输入要兑换的持有币种的数量时，触发事件根据price计算要兑换币种的数量
    $("#QuantityEntered").on('input propertychange',function(){
        //获得price
        var price = $('#PriceEntered').val();
        //获得Currency
        var currency = $('#Currency').val();
        //获得PartyB
        var partyb = $('#PartyB').val();
        //判断与当前汇率的币种方向是否一致:比如当前汇率为trx/btc=0.0000608,
        //1、如果currency选择框的币种是trx,partyb选择框的币种是btc,则符合汇率币种方向
        //2、否则汇率等于1/0.0000608
        if((cur==currency) && (partyb==des)){
            var amount = Number($(this).val())*Number(price);
            $('#PartyBamount').val(amount);
        }

        if((cur==partyb) &&(currency==des)){
            var uu=Math.floor(Number(1/Number(price)));
            var amount = Number($(this).val())*Number(uu);
            $('#PartyBamount').val(amount);
        }
    });


    // 读取初始select两个coin type的汇率
    $.ajax({
        type: 'get',
        url: '/exchange',
        success: function(data) {
            // var ex = data[0]['Currency1'] + '/'+data[0]['Currency2'] + ' : ' + data[0]['exchange'];
            // document.getElementById('exchange').innerHTML =ex;
            cur = data[0]['Currency1'];
            des = data[0]['Currency2'];
            $('#PriceEntered').val(data[0]['exchange']);
        }
    });

    // 选择框改变coin type后触发从后台重新读取汇率，这是第一个select
    $('#Currency').bind("change",function(){
        var cdata = $(this).val();
        var pdata = $('#PartyB').val();
        if(cdata!=pdata){
            $.ajax({
                type: 'POST',
                url: '/tradepair',
                data:{currency:cdata,partyb:pdata},
                success: function(data) {
                    var ex = data[0]['Currency1'] + '/'+data[0]['Currency2'] + ' : ' + data[0]['exchange'];
                    document.getElementById('exchange').innerHTML =ex;
                }
            });
        }
    });

    // 选择框改变coin type后触发从后台重新读取汇率，这是第二个select
    $('#PartyB').bind("change",function(){
        var pdata = $(this).val();
        var cdata = $('#Currency').val();
        if(cdata!=pdata){
            $.ajax({
                type: 'POST',
                url: '/tradepair',
                data:{currency:cdata,partyb:pdata},
                success: function(data) {
                    var ex = data[0]['Currency1'] + '/'+data[0]['Currency2'] + ' : ' + data[0]['exchange'];
                    document.getElementById('exchange').innerHTML =ex;
                }
            });
        }
    });

    $('#sellbutton').on('click', function(event) {
        event.preventDefault();

        //方法一
        // var selldata = { item:'123'};
        // $.ajax({
        //     type: 'POST',
        //     url: '/sell',
        //     data: selldata,
        //     success: function(data) {
        //         //do something with the data via front-end framework
        //         location.reload();
        //     }
        // });
        //方法一

        // 方法二
        var d = {};
        var t = $('#sellform').serializeArray();
        $.each(t, function() {
          d[this.name] = this.value;
        });

        $.ajax({
            type: 'POST',
            url: '/sell',
            data: d,
            success: function(data) {
                if(data=="1")
                {
                    alert("下单成功");
                    location.reload();
                }
                else{
                    alert("下单失败");
                }
                
            }
        });
        return false;
    });



});