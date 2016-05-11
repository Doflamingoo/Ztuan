$(function () {
    //获取随机数
    function random(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min;
    }
    var result = '';
    for (var i = 0; i < 4; i++) {
        result += random(0, 9);
    }
    $('.yzmimg').html(result);
    //点击改变验证码
    $('.yzmimg').click(function () {
        var result = '';
        for (var i = 0; i < 4; i++) {
            result += random(0, 9);
        }
        $('.yzmimg').html(result);
    })

    //获取焦点边框变红 
    $('#zc1,#zc2,#zc4,#zc5').focus(function () {
        $(this).css('border-color', 'red');
    })
    var t1=false;
    var t2=false;
    var t3=false;
    var t4=false;
    
    $('#zc1').blur(function () {

        $(this).css('border-color', '');
        var reg = /^(13[0-9]|15[0|3|6|7|8|9]|18[0,5-9])\d{8}$/;
        var zc1 = document.getElementById('zc1').value;
        console.log(zc1);
        if (!reg.test(zc1)) {
            $('#zcphone>.wrong-tips').css('display', 'block');
            $('#zcphone>.right-tips').css('display', 'none');
            t1=false;
        } else {
            $('#zcphone>.wrong-tips').css('display', 'none');
            $('#zcphone>.right-tips').css('display', 'block');
            t1=true;
        }
    })
    $('#zc2').blur(function () {
        $(this).css('border-color', '');
        var zc2 = document.getElementById('zc2').value;
        console.log(zc2);
        if (zc2 != result) {
            $('#zcma1>.wrong-tips').css('display', 'block');
            $('#zcma1>.right-tips').css('display', 'none');
            t2=false;
        } else {
            $('#zcma1>.wrong-tips').css('display', 'none');
            $('#zcma1>.right-tips').css('display', 'block');
            t2=true;
        }
    })
    $('#zc4').blur(function () {
        $(this).css('border-color', '');
        var reg = /[0-9 | A-Z | a-z]{6,16}/;//-----------------------------------------------问题
        var zc4 = document.getElementById('zc4').value;
        if (!reg.test(zc4)) {
            $('#zcpsw>.wrong-tips').css('display', 'block');
            $('#zcpsw>.right-tips').css('display', 'none');
            t3=false;
        } else {
            $('#zcpsw>.wrong-tips').css('display', 'none');
            $('#zcpsw>.right-tips').css('display', 'block');
            t3=true;
        }
    })
    $('#zc5').blur(function(){
        var zc4=document.getElementById('zc4').value;
        var zc5=document.getElementById('zc5').value;
        //console.log(zc4);
        //console.log(zc5);
        if(zc4==zc5&&zc5!=''){
            $('#zcapsw>.right-tips').css('display', 'block');
            $('#zcapsw>.wrong-tips').css('display', 'none');
            t4=true;
        }else{
            $('#zcapsw>.right-tips').css('display', 'none');
            $('#zcapsw>.wrong-tips').css('display', 'block');
            t4=false;
        }
    })
    $('#reginbtn').click(function(){
       if(t1&&t2&&t3&&t4){
           var name=$('#zc1').val();
           var password=$('#zc4').val();
           $.cookie('name',name);
           $.cookie('password',password);
           window.location.href="index.html";
       }
    })
    






})