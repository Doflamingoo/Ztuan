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
    var price=$.cookie('price');
    var count=$.cookie('count');
    var p=$.cookie('p');
    $('#allPrice').html(price);
    $('#zongPrice').html(price);
    $('#count').html(count);
    $('#p').html(p);
    $.ajax({
        url:'data/index.json',
        type:'GET',
        dataType:'json',
        success:function(res){
            for(var i=0;i<res.length;i++){
                if($.cookie(i+1)==res[i].id){
                    var img=res[i].img;
                    $('#goodsImg').attr('src',img);
                    var title=res[i].title;
                    $('#titleA').html(title);
                }
            }
        }
    })
    
    $('#btn').click(function(){
        //alert(1);
        $('#info').html('收货人：'+$('#shr').val()+'&nbsp;&nbsp;&nbsp;&nbsp;地址：'+$('#xxdz').val()+'&nbsp;&nbsp;&nbsp;&nbsp;手机：'+$('#sjhm').val()+'&nbsp;&nbsp;&nbsp;&nbsp;邮箱：'+$('#yx').val());
        $.cookie('dizhi',$('#info').html());
    })
    
    
    $('#submit').click(function(){
        window.location.href="shopping3.html";
    })
    
    
})