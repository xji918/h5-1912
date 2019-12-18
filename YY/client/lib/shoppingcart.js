$(() => {
    fn();
    function fn() {

        $.ajax({
            type: "get",
            url: "../../server/shoppingcart.php",
            data: "type=get",
            dataType: "json",
            success: function (response) {
                let shopping = new shoppingcart(response);
                shopping.init();
                //加减法
                $(".clicks").click(function () {
                    let type = $(this).data("type");
                    let top = $(this).data("num").slice(1);
                    if ($(this).next().val() == 0) {
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
                                        fn();
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
                                console.log(response);
                                $(".main .main_bottom").remove();
                                fn();
                            }
                        });
                    }

                })
            }
            //


        });
    }

    class shoppingcart {
        constructor(data) {
            this.data = data;
        }
        init() {

            $(this.createhtml()).appendTo(".main")
        }
        createhtml() {
            let html = this.data.map(function (ele, index) {
                return `<div class="main_bottom">
                <div class="check">
                    <input type="checkbox">
                </div>
                <div class="shangpin">
                    <img src="${ele.src}" alt="">
                    <a href="" class="dis">${ele.dis}<a>
                </div>
                <div class="price priceA">${ele.price}</div>
                <div class="youhui">0.00</div>
                <div class="number">
                    <button class="btnA clicks" data-type="pop" data-num="${"t" + ele.id}">-</button>
                    <input type="text" name="" id="" disabled="disabled" value="${ele.num}">
                    <button class="btnB clicks" data-type="push" data-num="${"t" + ele.id}">+</button>
                </div>
                <div class="numA">980.00</div>
                <div class="caozuo">
                    <a href="">移入收藏夹</a>
                    <a href="" class="del clicks" data-type="del">删除</a>
                </div>
            </div>`
            }).join("");
            return html
        }
    };
    //

})