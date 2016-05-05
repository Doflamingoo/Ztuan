$(function () {
    $('.header').load('shoppingheader.html');
    $('.footer').load('footer.html');
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
    })
})