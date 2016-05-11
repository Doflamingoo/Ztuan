$(function () {
    $('.header').load('shoppingheader.html');
    $('.footer').load('footer.html');
    $(document).ajaxStop(function () {
        var name = $.cookie('name');
        //console.log(name);
        if (name == null) {
            $('.user-about').html('<span>您好，欢迎来Z团购物！请<a href="" id="login">登录</a></span><ul id="register"><li><a href="">注册</a></li><li><a href="">我的订单</a></li></ul>')
        } else {
            $('.user-about').html('<span>您好,<a href="">' + name + '</a></span>|<a href="" id="exit">退出</a>|<a href="">我的订单</a>')
        }
        $('#exit').click(function () {
            $.cookie('name', null);
            $.cookie('password', null);
        })
        $('#login').click(function () {
                //console.log(1)
                //window.location.href="login.html";
                window.open('login.html');
            })
            /*------订阅团购推荐------*/
        $('.site-aboutThird').mouseover(function () {
            $(this).addClass('Third-hover');
            $('.site-aboutHide').css('display', 'block');
        })
        $('.Third-hover').mouseout(function () {
            $('.site-aboutHide').css('display', 'none');
            $('.site-aboutThird').removeClass('Third-hover'); //error
        })
        $('.site-aboutHide').mouseover(function () {
            $('.site-aboutThird').unbind('mouseout');
            $(this).css('display', 'block');
        })
        $('.site-aboutHide').mouseout(function () {
            $(this).css('display', 'none');
            $('.Third-hover').mouseout(function () {
                $('.site-aboutHide').css('display', 'none');
            })
        })
    })
    $.ajax({
        url: 'data/index.json',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            //alert(1);
            for(var i=0;i<res.length;i++){
                if($.cookie(i+1)==res[i].id){
                    //alert(1);
                    var title=res[i].title;
                    $('#title').html('商品名称：'+title);
                }
            }
        }
    })
    
    $('#price').html($.cookie('price'));
    $('#allPrice').html($.cookie('price'));
    $('#dizhi').html('收货人信息：'+$.cookie('dizhi'));

    $('.pay-submit-btn').click(function(){
        alert('恭喜你！项目完成！！！！')
    })

})