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
        /*------本页产品------*/
    $.ajax({
        url: 'data/index.json',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var n;
            //console.log(res.length);
            //console.log($.cookie(10));
            //console.log($.cookie(10)!='') 
            for (var i = 0; i < res.length; i++) {
                if ($.cookie(i) != null) {
                    //console.log($.cookie(i));
                    //alert($.cookie(i));
                    n = $.cookie(i) - 1;
                }
            }
            //console.log(n);
            var img = res[n].img;
            var title = res[n].title;
            var price = res[n].realprice;





            $('#shoppingImg').attr('src', img);
            $('#shoppingTitle').html(title);
            $('#shoppingPrice').children('span').html(price);
        }
    })

    $(document).ajaxStop(function () {
        console.log($('#shoppingPrice').children('span').html());
        //初始总价格为单价
        $('.total-price').children('span').html($('#shoppingPrice').children('span').html());
        
        
        $('.total-items>.price').children('span').html($('#shoppingPrice').children('span').html());
        
        $('#zongPrice').children('span').html($('#shoppingPrice').children('span').html());
            /*------点击+号事件------*/
        $('#plus').click(function () {
            var n = $(this).prev('span').html();
            var price = $(this).parent().parent().parent().prev('td').children('span').html();
            console.log(price);
            n++;
            $(this).prev('span').html(n);
            
            $('.total-price').children('span').html(n*price);
            $('.total-items>.price').children('span').html(n*price);
            $('#zongPrice').children('span').html(n*price);
        })

        /*------点击-号事件------*/
        $('#minus').click(function () {
            var n = $(this).next('span').html();
            var price=$(this).parent().parent().parent().prev('td').children('span').html();
            if (n > 1) {
                n--;
            }
            $(this).next('span').html(n);
            $('.total-price').children('span').html(n*price);
            $('.total-items>.price').children('span').html(n*price);
            $('#zongPrice').children('span').html(n*price);
        })
    })

    $('.submit').click(function(){
        var allprice=$('#zongPrice>span').html();
        var count=$('#count').html();
        var p=$('#shoppingPrice>span').html();
        $.cookie('price',allprice);
        $.cookie('count',count);
        $.cookie('p',p);
        window.location.href="shopping2.html";
    })







})