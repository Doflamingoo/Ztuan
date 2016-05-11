$(function () {
        $('.header').load('header.html');
        $(document).ajaxStop(function () {
            var name = $.cookie('name');
            console.log(name);
            if (name == null) {
                $('.user-about').html('<span>您好，欢迎来Z团购物！请<a id="login">登录</a></span><ul id="register"><li><a href="">注册</a></li><li><a href="">我的订单</a></li></ul>')
            } else {
                $('.user-about').html('<span>您好,<a href="">' + name + '</a></span>|<a href="" id="exit">退出</a>|<a href="">我的订单</a>')
            }
            $('#exit').click(function () {
                $.cookie('name', null);
                $.cookie('password', null);
            })
            $('#login').click(function () {
                    console.log(1)
                    window.location.href="login.html";
                    //window.open('login.html');
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


            $('#top-button').click(function () {
                if ($('#top-email').val(null)) {
                    $('#top-error').html('请输入email地址').css('color', 'red');
                }
            })
            $('#top-button').mouseout(function () {
                $('#top-error').html('推荐时间：每周二、四、六（节假日除外)').css('color', '#cccccc');
            })


            /*------搜索------*/
            $('#wrapper-input').focus(function () {
                $(this).val(null);
            })
            $('#wrapper-input').blur(function () {
                $(this).val('请输入商品名');
            })

            /*------最近浏览------*/
            $('.history').mouseover(function () {
                $('.history-hide').css('display', 'block');
            })
            $('.history').mouseout(function () {
                $('.history-hide').css('display', 'none');
            })
            $('.history-hide').mouseover(function () {
                $('.history').unbind('mouseout');
                $(this).css('display', 'block');
            })
            $('.history-hide').mouseout(function () {
                $(this).css('display', 'none');
                $('.history').mouseout(function () {
                    $('.history-hide').css('display', 'none');
                })
            })
        })
        $('.footer').load('footer.html');
        /*------大家在看什么滚动条吸附------*/
        window.onscroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //console.log(scrollTop);
            if (scrollTop >= 1200) {
                $('#djzk').css({
                    'position': 'fixed',
                    'top': 0,
                    'right': '211px',
                    'margin-top': 0,
                })
            } else {
                $('#djzk').css({
                    'position': 'static',
                    'margin-top': '10px',
                })
            }
            if (scrollTop > 3825) {
                $('#djzk').css({
                    'position': 'absolute',
                    'margin-top': '3823px',
                })
            }
        }


        /*------分页------*/
        var num = 20;
        loadMsg(num);



        /*------轮播------*/
        var timer;
        var index = 0;
        //$('.lbt>ul>li').eq(0).show().siblings().hide();
        function move() {
            index++;
            $('.lbt>ul>li').eq(index).fadeIn(1000).siblings().fadeOut(1000);
            $('.lbt>ol>li').eq(index).addClass('active').siblings().removeClass('active');
            if (index >= $('.lbt>ul>li').length - 1) {
                index = -1;
            }
        }
        timer = setInterval(move, 3000);
        $('.lbt>ol>li').mouseover(function () {
            //console.log($(this).index())
            clearInterval(timer);
            index = $(this).index() - 1;
            move();
        })
        $('.lbt>ol>li').mouseout(function () {
            timer = setInterval(move, 3000);
        })
        $('.lbt').mouseover(function () {
            clearInterval(timer);
        })
        $('.lbt').mouseout(function () {
            timer = setInterval(move, 3000);
        })


    })
    /*------分页------*/
function loadMsg(Num) {
    $.ajax({
        url: 'data/index.json',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var btnNum = Math.ceil(res.length / Num);
            $('#Pagination').pagination(btnNum, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                items_per_page: 1, //每页显示1项
                prev_text: "上一页",
                next_text: "下一页",
                callback: function (pageIndex) {
                    //var fenye='<div id="Pagination" class="pagination"></div>'
                    //var html = '<ul class="goods-list clearfix">';
                    var html = '';
                    for (var i = Num * pageIndex; i < Num * (pageIndex + 1); i++) {
                        if (i < res.length) {
                            var id = res[i].id;
                            var title = res[i].title;
                            var realprice = res[i].realprice;
                            var del = res[i].del;
                            var img = res[i].img;
                            var discount = res[i].discount;
                            var attention = res[i].attention;
                            var desc = res[i].desc;
                            html += '<li id=' + id + '><a href="" class="pic"><img src=' + img + ' alt=""><span class="title">' + title + '</span><span class="desc">' + desc + '</span></a><div class="price"><span class="real-price">¥<em>' + realprice + '</em></span><del>' + del + '</del><span class="discount">' + discount + '</span></div><div class="day"><span class="countdown" id="countdown">剩余：4天23时13分20秒</span><span class="attention">' + attention + '</span>';
                        }
                    }
                    //html += '</ul>';
                    $('.goods-list').html(html);
                    //$('.main-left').html(html);
                    //$('.main-left').append(fenye)
                    //$('.goods-list').insertBefore($('#Pagination'))
                }
            })
            $('.goods-list>li').click(function () {
                for (var i = 0; i < res.length; i++) {
                    if ($.cookie(i) != '') {
                        $.cookie(i, null);
                    }
                }
                console.log($(this).attr('id'));
                var id = $(this).attr('id');
                $.cookie(id, id);
                window.location.href = "products.html";
            })
        }
    })

}



/*------倒计时------*/
function left() {
    var end = '2016/05/14 14:16:00';
    var leftTimer = setInterval(function () {
        var now = new Date();
        var times = (Date.parse(end) - Date.parse(now)) / 1000; //获取总秒数
        if (times == 0) {
            clearInterval(times);
        }
        var mins = parseInt(times / 60); //获取总分钟
        var hours = parseInt(times / 60 / 60); //获取总小时
        var days = parseInt(times / 60 / 60 / 24) //获取总天数
        var secLeft = times % 60; //剩余多少秒
        var minLeft = mins % 60; //剩余多少分钟
        var hourLeft = hours % 24; //剩余多少小时
        $('#countdown').html('剩余：' + days + '天' + hourLeft + '时' + minLeft + '分' + secLeft + '秒');
    }, 1000);
}