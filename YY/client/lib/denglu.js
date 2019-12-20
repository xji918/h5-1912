$(() => {
    $("#login_body > div.login_border > div:nth-child(1) > ul > li").click(function () {
        $(this).addClass("login-on").siblings().removeClass("login-on");
        $(".login-style").eq($(this).index()).show().siblings().hide()

    });
    $("#logbtn").click(function () {
        $.ajax({
            type: "post",
            url: "../../server/denglu.php",
            data: `username=${$("#TXTuser").val()}&password=${$("#PWD").val()}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    document.cookie = "username=" + response.username;
                    document.cookie = "userid=" + response.id;
                    window.location.href = "./shouye.html";
                } else {
                    alert(response.data.msg)
                }
            }
        });
    })
})
