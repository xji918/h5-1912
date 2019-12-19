$(() => {
    let a1 = decodeURI(window.location.search.slice(1));
    function queryString2Obj(queryString) {
        var o = {};
        var arr = queryString.split("&"); //["name=zs","age=10","className=H5"];
        arr.forEach(function (item) {
            var data = item.split("="); //["name","zs"];
            var key = data[0];
            var val = data[1];
            o[key] = val;
        })
        return o;
    };
    var arr = queryString2Obj(a1);
    console.log(a1);
    console.log(arr);
    fn();
    function fn() {
        $.ajax({
            type: "get",
            url: "../../server/shoppingcart.php",
            data: "type=get",
            dataType: "json",
            success: function (response) {

                shopping.init(response);
            }
        });
    }

    class shoppingcart {
        constructor() {

        }
        init(data) {
            $(this.createhtml(data)).appendTo(".main");
            this.css();
            this.click();
        }
        createhtml(data) {
            let html = data.map(function (ele, index) {
                return `<div class="main_bottom">
                <div class="check">
                    <input type="checkbox" name="checkbox">
                </div>
                <div class="shangpin">
                    <img src="${ele.src}" alt="">
                    <a href="" class="dis">${ele.dis}</a>
                </div>
                <div class="price priceA" style="color:#000;font-weight:600;">${ele.price}</div>
                <div class="youhui">0.00</div>
                <div class="number">
                    <button class="btnA clicks" data-type="pop" data-num="${ele.id}">-</button>
                    <input type="text" name="" id="" class="inputA" disabled="disabled" value="${ele.num}">
                    <button class="btnB clicks" data-type="push" data-num="${ele.id}">+</button>
                </div>
                <div class="numA" style="color:red;font-weight:600;font-size:14px"></div>
                <div class="caozuo">
                    <a>移入收藏夹</a>
                    <a class="del clicks" data-type="del" data-num="${ele.id}">删除</a>
                </div>
            </div>`
            }).join("");
            return html
        }
        click() {
            let seft = this;
            //加减法
            $(".clicks").click(function () {
                let type = $(this).data("type");
                let top = $(this).data("num");
                if ($(this).next().val() == 0 || type == "del") {
                    $(".tishi").addClass("tishi_block");
                    $(".tishi_A").on("click", "span", function () {
                        $(".tishi").removeClass("tishi_block");
                        if ($(this).text() == "确定") {
                            $.ajax({
                                type: "get",
                                url: "../../server/shoppingcart2.php",
                                data: "type=del" + "&top=" + top,
                                dataType: "json",
                                success: function (response) {
                                    $(".main .main_bottom").remove();
                                    seft.init(response);
                                }
                            });
                        }
                    });
                } else {
                    $.ajax({
                        type: "get",
                        url: "../../server/shoppingcart2.php",
                        data: "type=" + type + "&top=" + top,
                        dataType: "json",
                        success: function (response) {
                            $(".main .main_bottom").remove();
                            seft.init(response);
                        }
                    });
                }

            });

            //全选
            $(".bodyer").on("click", "#checkbocAll,#checkbocAll2", function () {
                let js = 0;
                let num3 = 0;
                let nums = 0;
                if (this.checked) {
                    $("input[name=checkbox]").prop("checked", true).parents(".main_bottom").addClass("checkedbg");

                    $("input[class=inputA]").each((index, ele) => {
                        js = ele.value * 1 + js;
                        $(".num2").text(js);
                    });

                    $(".checkedbg .price").each(function (index, ele) {
                        num3 = $(this).parent().find(".numA").text($(ele).text() * $(this).parent().find(".inputA").val());
                        nums = num3[0].innerText * 1 + nums;
                    })
                    $(".num3").text(nums);

                } else {
                    js = 0;
                    nums = 0;
                    $("input[name=checkbox]").prop("checked", false).parents(".main_bottom").removeClass("checkedbg");
                    $(".num2").text(js);
                    $(".num3").text(nums);
                }
            });

            //单选
            $("input[name=checkbox]").click(function () {
                let js = 0;
                let num3 = 0;
                let nums = 0;
                if (this.checked) {
                    $(this).parents(".main_bottom").addClass("checkedbg");
                    if ($(".checkedbg .inputA").length == 0) {
                        js = 0;
                        nums = 0;
                        $(".num2").text(js);
                        $(".num3").text(nums);
                    } else {
                        $(".checkedbg .inputA").each((index, ele) => {
                            js = ele.value * 1 + js;
                            $(".num2").text(js);
                        });

                        $(".checkedbg .price").each(function (index, ele) {
                            num3 = $(this).parent().find(".numA").text($(ele).text() * $(this).parent().find(".inputA").val());
                            nums = num3[0].innerText * 1 + nums;
                        })
                        $(".num3").text(nums)
                    }
                } else {
                    $(this).parents(".main_bottom").removeClass("checkedbg");
                    if ($(".checkedbg .inputA").length == 0) {
                        js = 0;
                        nums = 0;
                        $(".num2").text(js);
                        $(".num3").text(nums);
                    } else {
                        $(".checkedbg .inputA").each((index, ele) => {
                            js = ele.value * 1 + js;
                            $(".num2").text(js);
                        });

                        $(".checkedbg .price").each(function (index, ele) {
                            num3 = $(this).parent().find(".numA").text($(ele).text() * $(this).parent().find(".inputA").val());
                            nums = num3[0].innerText * 1 + nums;
                        })
                        $(".num3").text(nums)
                    }

                }

            })
        }
        css() {
            //价格件数之类的值
            $(".header").click(function () {
                window.location.href = "../html/shouye.html";
            })
            $(".btnA,.btnB").hover(function () {
                $(this).toggleClass("btn_color")
            })
            $(".num1").text($(".main_bottom").length);
        }
    };
    let shopping = new shoppingcart();
    //

})