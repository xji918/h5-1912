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
    $.ajax({
        type: "get",
        url: "../../server/shoppingcart3.php",
        data: "userid=" + arr.userid + "&username=" + arr.username,
        dataType: "json",
        success: function (response) {
            $(".shoppingcartB span").text(cart(response))
        }
    });
    function cart(data) {
        let numbers = 0;
        $(data).each(function (index, ele) {
            numbers = ele.num * 1 + numbers
        });
        return numbers
    }

    class Fdj {
        constructor(data) {
            this.data = data;
        }
        init() {
            $(".big_box").html($(this.createHTML()));
            this.mouseenterimg();
            ; $(".xq").html(this.createHTMLtwo());
            this.css();
            //min_box img和max_box img第一张默认显示
            $(".min_box img").eq(0).css("display", "block");
            $(".max_box img").eq(0).css("display", "block");
            this.mouseenter();
            this.click();
        }
        createHTML() {
            let html1 = `<div class="min_box"><img src="" alt=""><div class="zzhao"></div></div>`;
            let html2 = `<div class="max_box"><img src="" alt=""></div>`;
            let html3 = `<div class="tab_img"><img id="${this.data[0].id}" src="${this.data[0].srca}" alt=""><img src="${this.data[0].srcb}" alt="">
            <img src="${this.data[0].srcc}" alt=""><img src="${this.data[0].srcd}" alt=""></div>`;
            let html4 = html1 + html2 + html3;
            return html4
        }
        mouseenterimg() {
            $(".min_box > img")[0].src = $(".tab_img > img")[0].src;
            $(".max_box > img")[0].src = $(".tab_img > img")[0].src;
            $(".tab_img > img").hover(function () {
                $(".min_box > img")[0].src = $(this)[0].src;
                $(".max_box > img")[0].src = $(this)[0].src;
            })
        }
        createHTMLtwo() {
            let html1 = `<div class=xq_top><h3 class="title">${this.data[0].title}</h3><div class="dis">${this.data[0].dis}</div></div>`;
            let html2 = `<div class="xq_mian">
            <div class="price">丫 丫 价:<span class="priceA">￥${this.data[0].price}</span><span class="k">[价格走势]</span><span class="k">[降价通知]</span></div>
            <ul><li><article>用户评价</article><article>9</article></li>
            <li><article>问大家</article><article>0</article></li>
            <li><article>好评率</article><article>100%</article></li></ul>
            <div>低价选择:<a href="" style="margin:0 25px 0 15px;color: blue;">一手优品：4299.00</a><a href="" style="color: blue;">二手良品：4199.00</a></div>
            <div>销量排行:<span style="margin:0 10px 0 15px;">手机单品当日销量第3名</span><a href="" style="color: blue;">详情点击</a></div>
            <div>促销信息:<i style="margin:0 10px 0 15px;font-style:normal;color:#f9b548;border:1px solid #f9b548;padding:2px 8px;">购机专享</i><a href="" style="margin: 0 10px 0 0;text-decoration:none">专享500元换新补贴，携带任意价值旧机均可参与，不与免息分期、赠品及其它优惠叠加</a><a href="" style="color: blue;">详情点击</a></div>
            </div>`;
            let html3 = `<div class="xq_bottom">
            <div >配置信息:<span style="margin:0 10px 0 15px;color:#f9b548;">充电器x1，数据线x1，保护壳x1，耳机x1（内置4200mAh电池）</span></div>
            <div class="phonecolor_box"><div style="width:50.86px;overflow:hidden;float:left;margin-right:15px"><span style="float:left">颜</span><span  style="float:right">色:</span></div>
            <div><div class="phonecolor" data-top="61" style="background:url(${this.data[0].srce}) no-repeat 7% center;background-size:30px 30px">亮黑色</div><div class="phonecolor" data-top="612" style="background:url(${this.data[0].srcf}) no-repeat 7% center;background-size:30px 30px">翡冷翠</div><div class="phonecolor" data-top="613" style="background:url(${this.data[0].srcg}) no-repeat 7% center;background-size:30px 30px">罗兰紫</div>
            <div class="phonecolor" data-top="614" style="background:url(${this.data[0].srch}) no-repeat 7% center;background-size:30px 30px">星河银</div><div class="phonecolor" data-top="615" style="background:url(${this.data[0].srci}) no-repeat 7% center;background-size:30px 30px">丹霞橙</div></div>
            </div>
            <div >
            <div style="width:50.86px;overflow:hidden;float:left;margin-right:15px"><span style="float:left">版</span><span  style="float:right">本:</span>
            </div>
            <div class="" style="float:left;border:1px solid #ccc;margin:0 10px 0 0;padding:0 10px">华为 Mate 30 5G版</div>
            <div class="" style="float:left;border:1px solid #ccc;padding:0 10px">华为 Mate 30 RS 保时捷版</div>
            </div>`;
            let html = html1 + html2 + html3;
            return html
        }
        css() {
            // if ($(".phonecolor").data("top") == this.data[0].id) {
            //     $(this).css({
            //         "border-color": "#4fbaa1",
            //         "color": "#4fbaa1"
            //     })
            //     console.log(this);

            // }
        }
        mouseenter() {
            //tab_img移入事件，min_box img和max_box img显示对应下标的img
            // $(".tab_img img").hover(function () {
            //     $(this).css("border", "1px solid red");
            //     $(".min_box img").eq($(this).index()).css("display", "block");
            //     $(".min_box img").eq($(this).index()).siblings().css("display", "none");
            //     $(".max_box img").eq($(this).index()).css("display", "block");
            //     $(".max_box img").eq($(this).index()).siblings().css("display", "none");
            // }, function () {
            //     $(this).css("border", "1px solid #eee");
            // });
            //min_box移入事件，显示遮罩
            $(".min_box").hover(function () {
                $(".zzhao").toggle();
            });
            $(".min_box").mouseenter(function () {
                $(".max_box").fadeIn();
            });
            $(".min_box").mouseleave(function () {
                $(".max_box").fadeOut();
            })
            //遮罩的移动事件
            $(".min_box").mousemove(function (ev) {
                //遮罩的坐标等于clientX减去遮罩宽度/高度的一半，这样鼠标就正好在正中间
                var x = ev.pageX - $(".big_box").offset().left - $(".zzhao").width() / 2;
                var y = ev.pageY - $(".big_box").offset().top - $(".zzhao").height() / 2;
                // console.log(x, y);
                // console.log($(".big_box").offset().left, "+++", $(".big_box").offset().top);

                //遮罩可移动的最大距离，盒子的宽度/高度-遮罩的宽度/高度
                var maxX = $(".min_box").width() - $(".zzhao").width();
                var maxY = $(".min_box").height() - $(".zzhao").height();
                //设置最小移动范围
                if (x < 0) {
                    x = 0
                }
                if (y < 0) {
                    y = 0
                }
                //设置最大移动范围
                if (x > maxX) {
                    x = maxX
                }
                if (y > maxY) {
                    y = maxY
                }
                //设置遮罩的位置
                $(".zzhao").css({
                    top: y,
                    left: x
                });
                //设置max_img的移动
                var bilix = ($(".max_box img").eq(0).width() - $(".max_box").width()) / maxX;
                var biliy = ($(".max_box img").eq(0).height() - $(".max_box").height()) / maxY;
                // console.log(bilix, biliy);
                $(".max_box img").css({
                    top: -y * biliy,
                    left: -x * bilix
                });
            });
            $(".xq > .xq_mian > .price > .k").hover(function () {
                $(this).css("color", "#f9b548")
            }, function () {
                $(this).css("color", "#666")
            });

            // $(".xq_bottom > .phonecolor_box > .phonecolor").mouseenter(function () {
            //     if ($(this).css("color") == "rgb(79, 186, 161)") {
            //         console.log(111);
            //         $(this).mouseleave(function () {
            //             $(this).css({
            //                 "border": "1px solid #4fbaa1",
            //                 color: "#4fbaa1"
            //             });
            //         })
            //     } else {
            //         $(this).css({
            //             "border": "1px solid #4fbaa1",
            //             color: "#4fbaa1"
            //         });
            //     }
            // })
            // $(".xq_bottom > .phonecolor_box > .phonecolor").mouseleave(function () {
            //     $(this).css({
            //         "border": "1px solid #ccc",
            //         color: "#666"
            //     });
            //     console.log(222);
            // });

        }
        click() {
            $(".xq_bottom > .phonecolor_box > div > .phonecolor").click(function () {
                $(this).css(
                    {
                        "border": "1px solid #4fbaa1",
                        "color": "#4fbaa1"
                    }
                ).siblings().css({
                    "border": "1px solid #ccc",
                    color: "#666"
                });
                let top = $(this).data("top");
                console.log(top);
                $.ajax({
                    type: "get",
                    url: "../../server/xiangqing1.php",
                    data: "id=" + top,
                    dataType: "json",
                    success: function (response) {
                        let fdjs2 = new Fdj(response);
                        fdjs2.init();


                    }
                });
            });
            $(".shoppingcartB").click(function () {
                window.location.href = "../html/shoppingcart.html?userid=" + arr.userid + "&username=" + arr.username;
            })
        }
    };
    // let o = window.location.search.slice(1).split("=");
    // let top;
    // for (var key in o) {
    //     top[key] = o[key]
    // }
    console.log(arr.top);
    $.ajax({
        type: "get",
        url: "../../server/xiangqing1.php",
        data: "id=" + arr.top,
        dataType: "json",
        success: function (response) {
            let fdjs = new Fdj(response);
            fdjs.init();

        }
    });

    //购物车
    $(".spcart").on("click", ".shoppingcart", function () {
        let type = $(this).data("type");
        let src = $(".tab_img > img")[0].src;
        let price = $(".priceA").eq(0).text().slice(1);
        let dis = $(".xq_top > .title").eq(0).text();
        let top = $(".tab_img > img").eq(0).attr("id");
        console.log(type);
        console.log(top);
        $.ajax({
            type: "get",
            url: "../../server/shoppingcart2.php",
            data: "type=" + type + "&top=" + top + "&src=" + src + "&price=" + price + "&dis=" + dis + "&userid=" + response.id + "&username=" + response.username + "userid=" + arr.userid + " &username=" + arr.username,
            dataType: "json",
            success: function (response) {
                console.log(response);
                $(".shoppingcartB span").text(cart(response))
            }
        });
    })


})