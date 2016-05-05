$(function () {
    $('.header').load('header.html');
    $('.footer').load('productsfooter.html');
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



    /*------手机下单事件------*/
    $('#phone-order').hover(function () {
            $('.code').css('display', 'block');
        }, function () {
            $('.code').css('display', 'none');
        })
        /*------点击分享事件------*/
    $('.share-box').click(function () {
        if ($('.share-hide').is(':hidden')) {
            $('.share').css('background-position', '-87px -150px');
            $('.share-hide').css('display', 'block');
        } else {
            $('.share-hide').css('display', 'none');
            $('.share').css('background-position', '-87px -176px');
        }

    })


    /*------Z团优势------*/
    var timer;
    var n = 0;
    $('#tab>li').mouseover(function () {
        //console.log($(this).index());
        clearInterval(timer);
        for (var i = 0; i < $('#tab>li').length; i++) {
            $('#tab>li').eq(i).css({
                'background': '#f3f3f3',
                'color': '#333',
            })
            $('#tab>li').children('i').css('display', 'none');
        }
        var index = $(this).index();
        $(this).css({
            'background': '#8c0b0b',
            'color': '#fff',
        })
        $(this).children('i').css('display', 'block');
        $('#switch>img').eq(index).show().siblings().hide();
    })
    $('#tab>li').mouseout(function () {
        n = $(this).index();
        timer = setInterval(move, 3000);
    })

    $('#tab>li').eq(0).css({
        'background': '#8c0b0b',
        'color': '#fff',
    })
    $('#tab>li').eq(0).children('i').css('display', 'block');
    $('#switch>img').eq(0).fadeIn().siblings().fadeOut()
    timer = setInterval(move, 3000);

    function move() {
        n++;
        $('#tab>li').eq(n).css({
            'background': '#8c0b0b',
            'color': '#fff',
        }).siblings().css({
            'background': '#f3f3f3',
            'color': '#333',
        })
        $('#tab>li').siblings().children('i').css('display', 'none');
        $('#tab>li').eq(n).children('i').css('display', 'block');

        $('#switch>img').eq(n).fadeIn().siblings().fadeOut();

        if (n > 2) {
            n = -1;
        }
    }
    /*------产品介绍图片------*/
    $('#buybtn').click(function () {

    })
    $.ajax({
        url: 'data/products.json',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            //alert(res.chanpinjieshao[0].url);
            var html='';
            var html2='<ul class="hotsale-list">';
            var html3='<ul class="tuan-list clearfix">';
            /*------产品介绍------*/
            for(var i=0;i<res.chanpinjieshao.length;i++){
                if(i<res.chanpinjieshao.length-1){
                    html+='<p><img src='+res.chanpinjieshao[i].url+' alt=""></p>';
                }else{
                    html+='<p><br><p><p><img src='+res.chanpinjieshao[i].url+' alt=""></p>';
                }
                
            }
            $('#cpjs').append(html);
            /*------店铺热卖------*/
            for(var j=0;j<res.dianpuremai.length;j++){
                html2+='<li><a href="" class="pic"><img src='+res.dianpuremai[j].url+' alt=""></a><a href="" class="title">'+res.dianpuremai[j].title+'</a><div class="price">'+res.dianpuremai[j].price+'</div><p>已售出<b>'+res.dianpuremai[j].sale+'</b>笔</p></li>';
            }
            html2+='</ul>';
            $('.hotsale').append(html2);
            /*------相关产品推荐------*/
            for(var k=0;k<res.tuijian.length;k++){
                html3+='<li><a href="" class="pic"><img src='+res.tuijian[k].url+' alt=""><span class="title">'+res.tuijian[k].title+'</span></a><div class="clearfix"><span class="price"><em>'+res.tuijian[k].price+'</em><del>'+res.tuijian[k].del+'</del></span><span class="number">已售出<em>'+res.tuijian[k].sale+'</em></span></div></li>';
            }
            html3+='</ul>';
            $('#recommend').append(html3);
            /*------本页产品------*/
            var img='<img src='+res.products[0].url+' alt="">';
            $('.products-pic').append(img);
            var title='<h3>'+res.products[0].title+'</h3><p>'+res.products[0].introduce+'</p>';
            $('#products-title').append(title);
            
            $('#sellPrice').append(res.products[0].price);
            $('.original-price').append(res.products[0].originalPrice);
            $('.discount').append(res.products[0].discount);
            $('#productsSale').append(res.products[0].sale);
        }
    })






})