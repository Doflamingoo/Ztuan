$(function () {
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