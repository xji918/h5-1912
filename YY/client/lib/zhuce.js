$(() => {
    $(".zhuce-tab > ul > li").click(function () {
        $(".xxknr > .reg").eq($(this).index()).show().siblings().hide();
        $(this).css({
            "background": "#fff",
            "border-top": "solid 2px #4FB99F",
            "color": "#333"
        }).siblings().css({
            "background": "#f0f0f0",
            "border-top": "solid 2px #f0f0f0",
            "color": "#999"
        })
    });

    /* 表单验证：监听对应的输入框失去焦点事件，当失去焦点的时候检查是否满足规则，如果不满足规则那么就提示！！！ */
    $("#userUID").eq(0).blur(function () {
        let reg = /^[\u4E00-\u9FA5|a-z|A-Z|0-9]{4,16}$/;
        if (!reg.test($.trim($(this).val()))) {
            $(this).next().next().fadeIn();
            setTimeout(() => $(this).next().next().fadeOut(), 3000);
            $("#userUID").addClass("error")
        } else {
            $("#userUID").removeClass("error")
        }
    })
    $("#userpwd3").val(1234567);
    $("#userpwd3").blur(function () {
        let reg = /^[0-9a-zA-Z]{7,}$/;
        if (!reg.test($.trim($(this).val()))) {
            $(this).next().next().fadeIn();
            setTimeout(() => $(this).next().next().fadeOut(), 3000);
            $("#userpwd3").addClass("error")
        } else {
            $("#userpwd3").removeClass("error")
        }
    })
    $("#userpwd4").val(1234567);
    $("#userpwd4").blur(function () {
        if ($.trim($(this).val()) != $.trim($("#userpwd3").val())) {
            $(this).next().next().fadeIn();
            setTimeout(() => $(this).next().next().fadeOut(), 3000);
            $("#userpwd4").addClass("error")
        } else {
            $("#userpwd4").removeClass("error")
        }
    })
    $("#usermobile2").val(18688615858);
    $("#usermobile2").blur(function () {
        let reg = /^1[3-9]\d{9}$/;
        if (!reg.test($.trim($(this).val()))) {
            $(this).next().next().fadeIn();
            setTimeout(() => $(this).next().next().fadeOut(), 3000);
            $("#usermobile2").addClass("error")
        } else {
            $("#usermobile2").removeClass("error")
        }
    })
    $("#usermail").val("740122@qq.com");
    $("#usermail").blur(function () {
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!reg.test($.trim($(this).val()))) {
            $(this).next().next().fadeIn();
            setTimeout(() => $(this).next().next().fadeOut(), 3000);
            $("#usermail").addClass("error")
        } else {
            $("#usermail").removeClass("error")
        }
    })
    /* 实现图形验证码 */
    let captcha1 = new Captcha();
    let code;
    captcha1.draw(document.querySelector('#canvas2'), r => {
        console.log(r, '验证码1');
        code = r.toUpperCase();
    });

    $("#yzmcode2").blur(function () {
        if ($.trim($(this).val()).toUpperCase() != code) {
            $(this).next().next().fadeIn();
            setTimeout(() => $(this).next().next().fadeOut(), 3000);
            $("#yzmcode2").addClass("error")
        } else {
            $("#yzmcode2").removeClass("error")
        }
    })

    /* 注册的思路： */
    /* (1) 先获取按钮，添加点击事件 */
    /* (2) 检查用户名等所有信息是否都已经正确填写 */
    /* (3) 检查是否勾选同意用户协议 */
    /* (4) 如果2+3都满足，那么就应该把需要的数据作为参数提交给服务器。 */
    $("#regbut2").click(function () {
        $("#userUID,#userpwd3,#userpwd4,#usermobile2,#usermail,#yzmcode2").trigger("blur");
        console.log($(".error"));

        if ($(".error").length != 0) {
            alert("请输入正确的注册信息");
        } else if ($("#mmprovision2").is(":checked") == false) {
            alert("请阅读并同意用户协议！！！");
        } else {
            $.ajax({
                type: "post",
                url: "../../server/zhuce.php",
                data: `username=${$("#userUID").val()}&password=${$("#userpwd3").val()}&phone=${$("#usermobile2").val()}&email=${$("#usermail")}`,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    /* {status:"ok",data:{msg:"注册成功"}} */
                    if (data.status == "success") {
                        // window.location.href = "./shouye.html";
                    } else {
                        alert(data.data.msg)
                    }
                }
            });
        }
    })
})
