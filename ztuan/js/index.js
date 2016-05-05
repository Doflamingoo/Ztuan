$(function () {
        $('.header').load('header.html');
        $(document).ajaxStop(function () {
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
                    var html='';
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
                            html += '<li><a href="" class="pic"><img src=' + img + ' alt=""><span class="title">' + title + '</span><span class="desc">' + desc + '</span></a><div class="price"><span class="real-price">¥<em>' + realprice + '</em></span><del>' + del + '</del><span class="discount">' + discount + '</span></div><div class="day"><span class="countdown">剩余：1天08时12分47秒</span><span class="attention">' + attention + '</span>'
                        }
                    }
                    //html += '</ul>';
                    $('.goods-list').html(html);
                    //$('.main-left').html(html);
                    //$('.main-left').append(fenye)
                    //$('.goods-list').insertBefore($('#Pagination'))
                }
            })
        }
    })

}