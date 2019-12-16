$(() => {
    //top
    $(".top-user").hover(function () {
        $(".top-user-show").slideDown();
    }, function () {
        $(".top-user-show").slideUp();
    });
    $(".top-sitemap").hover(function () {
        $(".top-sitemap-show").slideDown();
    }, function () {
        $(".top-sitemap-show").slideUp();
    })
    $(".top-user").mouseenter(() => $(".top-user-show").css("left", $(".top-user")[0].offsetLeft))
    $(".erji").hover(function () {
        $(this).next().css({
            "left": this.offsetLeft
        })
        $(this).next().toggle();
    });
    //特色服务
    $(".service-menu > a > span").hover(function () {
        $(this).css("color", "#4FB99F")
    }, function () {
        $(this).css("color", "#333")
    });

    //轮播图

    class lbt {
        constructor(bannar) {
            this.bannar = bannar;
            this.timerout = null;
        }
        init() {
            $(".banner_bg_box").append(this.renderui());
            $(".banner_bg").append(this.createbannarxl());
            $(`<div class="banner_jtleft">&lt;</div><div class="banner_jtright">&gt;</div>`).appendTo(".banner_bg");
            $.index = 0;
            // this.imgcss();
            this.next();
            this.settimer();
            this.mouseenter();
            this.clixkxl();
            this.clicktb();
        }
        renderui() {
            let html = this.bannar.map((ele, index) => `<img src="${ele}" alt="" class="banner_img ${index ? "" : "img_block"}">`);
            return html
        }
        createbannarxl() {
            let html = this.bannar.map((ele, index) => `<span class="img_xl ${index ? "" : "img_xlcss"}"></span>`).join("");
            return `<div class="img_xlbox">${html}</div>`;
        }
        //img的样式切换
        imgcss() {
            $(".banner_img").eq($.index).show();
            $(".img_xl").eq($.index).css({
                "background": "#fff",
            });
            //切换/
            $(".banner_img").eq($.index).siblings().hide();
            $(".img_xl").eq($.index).siblings().css({
                "background": "#555",
            });
            let bgcolors = $(bannerbgcolor).eq($.index);
            $(".homebox").css("background-color", bgcolors[0]);
        }
        //定时器的方法
        next() {
            $.index++;
            if ($.index == $(".banner_img").length) {
                $.index = 0
            }
            //切换
            this.imgcss();
        }
        //设置定时器
        settimer() {
            this.timerout = setInterval(() => this.next(), 3000);
        }
        //移入事件开关定时器
        mouseenter() {
            // $(".banner_bg_box").hover(function () {
            //     $(".banner_jtleft,.banner_jtright").toggle();
            // })
            $(".banner_bg_box,.img_xl,.banner_jtleft,.banner_jtright").hover(() => {
                clearInterval(this.timerout);
            }, () => {
                this.settimer();
            });

        }
        //点击序列切换bannar
        clixkxl() {
            $(".img_xl").mouseenter(function () {
                $(".banner_img").eq($(this).index()).show().siblings().hide();
                $(this).css({
                    "background": "#fff",
                    "border-color": "#666"
                });
                $(this).siblings().css({
                    "background": "#555",
                    "border-color": "#ccc"
                });
                $(".homebox").css("background-color", $(bannerbgcolor).get($(this).index()));
            });
        }
        //点击切换上下图
        clicktb() {
            $(".banner_jtleft").click(() => {
                $.index--;
                if ($.index < 0) {
                    $.index = $(".banner_img").length - 1
                }
                this.imgcss();
            });

            $(".banner_jtright").click(() => {
                $.index++;
                if ($.index == $(".banner_img").length) {
                    $.index = 0
                }
                this.imgcss();
            });
        }
    };
    //选项卡
    class xxk {
        constructor(data) {
            this.data = data;
        }
        init() {
            $(`<div class="nav-menu">${this.createhtml()}</div>`).appendTo(".homebox");
            this.mouseenter();
        }
        createhtml() {
            let html = this.data.map((ele, index) => {
                var res = ele
                let html5 = ele.right.map((ie) => `<a href=""><img src="${ie}"></a>`).join("");
                let html4 = ele.left.map((item) => {
                    let html4_1 = item.des.map((ev) => `<a href="">${ev}</a>`).join("");
                    return `<div class="nav-menu-item"><h4 class="orange">${item.title}</h4><p>${html4_1}</p></div>`;
                }).join("");
                let html3 = ele.leftbottom.map((eles) => `<a href="">${eles}</a>`).join("");
                let html2 = `<dt class="odt"><b><i></i><a href="">${ele.lefttop}</a></b><span>${html3}</span></dt><dd class="odd"><div class="left">${html4}</div><div class="right"><div class="menu_ad">${html5}</div></div></dd>`;
                return `<dl class="odl">${html2}</dl>`;
            }).join("");
            return html
        }
        mouseenter() {
            let left = $(".banner_bg_box")[0].offsetLeft - $(".nav-menu").width();
            $(".nav-menu").css("left", left);

            $(".odl").hover(function () {
                $(".odd").eq($(this).index()).toggle();
            });
            $(".odl").hover(function () {
                $(this).css("background-color", "#666")
            }, function () {
                $(this).css("background-color", "")
            });
            $(".nav-menu-item > p > a ").hover(function () {
                $(this).css("color", "#4fb99f")
            }, function () {
                $(this).css("color", "#cfcfcf")
            })
        }
    };
    //登录注册
    class dlzc {
        constructor() {

        }
        init() {
            this.css();

        }
        css() {
            let dlright = $(".banner_bg_box")[0].offsetLeft - $(".side_box").width();
            $(".side_box").css("right", dlright);
        }
        click() {

        }
    };
    let dl = new dlzc();
    dl.init();
    //右侧头条咨询
    class ttzx {
        constructor(data) {
            this.data = data;
        }
        init() {
            $(this.createhtml()).appendTo(".side_box >ul");
            this.mouseenter();
        }
        createhtml() {
            let html = this.data.map((ele) => `<li><a href="">${ele}</a></li>`).join("");
            return html
        }
        mouseenter() {
            $(".toutiao a").hover(function () {
                $(this).css("color", "#4FB99F")
            }, function () {
                $(this).css("color", "#333")
            })
        }
    };
    //马车
    class Mc {
        constructor(data) {
            this.data = data;
        }
        init() {
            $(this.createhtml()).appendTo("#go_troika");
            this.mouseenter();
        }
        createhtml() {
            return this.data.map((ele, index) => {
                let html4 = ele.bottom.right.map((ev, index) => `<a href="" class="${index == 2 ? "border_none" : ""}"><img src="${ev.src}"><div><h3>${ev.title}</h3><p>${ev.des}</p></div></a>`).join("");
                let html3 = ele.bottom.left.map((ie, index) => `<a href="" class="${index ? "bottom-img" : "big-img"}"><img src="${ie.src}"><div><h3>${ie.title}</h3><p>${ie.des}</p></div></a>`).join("");
                return `<div class="troika-list ${index == 2 ? "marginright_none" : ""}"><div class="troika-title"><a href=""><img src="${ele.top}"></a></div><div class="troika-body"><div class="left">${html3}</div><div class="right">${html4}</div></div></div>`;
            }).join("");
        }
        mouseenter() {
            $(".troika-body img").hover(function () {
                $(this).css("transform", "translateX(-10px)")
            }, function () {
                $(this).css("transform", "translateX(0)")
            })
        }
    };
    //售后板块
    class Sh {
        constructor(data) {
            this.data = data;
        }
        init() {
            let html = this.data.map((ele, index) => `<div class="left ${index ? "" : "margin-right"}"><a href=""><img src="${ele.top}" class="get-src"></a><div><img src="${ele.bottom}"></div></div>`).join("");
            $(html).appendTo("#go_shouhou");
            $("#go_shouhou > .left > div > img").hover(function () {
                $(this).css({
                    "transform": "translateX(-20px)",
                    "transition": "0.3s"
                })
            }, function () {
                $(this).css("transform", "translateX(0)")
            })
        }
    };
    //楼层
    class Lc {
        constructor(data) {
            this.data = data;
        }
        init() {
            $(this.createhtml()).appendTo("#wrapperB");
            this.mouseenter();
        }
        createhtml() {
            let html = this.data.map((ele, index) => {
                //中间
                let html3C_2_1 = ele.mian.leftAD.leftADbottom.white.map((eles) => `<span><a href="" class="white">${eles}</a></span>`).join("");
                let html3C_2 = `<div class="bottomAD"><a href="" class="textAD ellipsis">${ele.mian.leftAD.leftADbottom.textad}</a><dl><dt>${ele.mian.leftAD.leftADbottom.rexiao}</dt><dd>${html3C_2_1}</dd></dl></div>`;
                let html3C_1 = `<a href="" class="topAD"><img src="${ele.mian.leftAD.leftADtop.src}" class="get-src"><div class="diy-tip"><h3>${ele.mian.leftAD.leftADtop.h3}</h3><p class="grey-6">${ele.mian.leftAD.leftADtop.p}</p></div></a>`;
                let html3C = `<div class="leftAD">${html3C_1}${html3C_2}</div>`;
                let html3B_1 = ele.mian.shop_list.map((ie) => `<li><a href="" class="anim-left"><img src="${ie.src22}" class="get-src"><div class="diy-tip"><h3>${ie.h3b}</h3><p>${ie.pb}</p><div class="get-price">${ie.price}</div></div></a></li>`).join("");
                let html3B = `<div class="shop-list"><ul class="overflow-hide">${html3B_1}</ul></div>`;
                let html3A_1 = ele.mian.rightAD.map((eve) => `<a href=""><img src="${eve.src333}"><div class="diy-tip"><h3>${eve.h3cc}</h3><p>${eve.pcc}</p></div></a>`).join("");
                let html3A = `<div class="rightAD">${html3A_1}</div>`;
                //底部
                let html2_1 = ele.link.bottomx.map((ev) => `<a href="">${ev}</a>`).join("");
                let html2 = `<div class="link-list"><span class="left">${ele.link.topx}</span>${html2_1}</div>`;
                return `<div class="diy-floor" id="${"go_floor" + (index + 1)}">
                <div class="floor-title"><img src="${ele.title}"></div>
                <div class="floor-main">${html3C}${html3B}${html3A}</div>
                <div class="brand-link">${html2}</div>
                </div>`
            }).join("");
            return html
        }
        mouseenter() {
            $(".topAD").hover(function () {
                $(this).find("img").css("transform", "scale(1.1)")
            }, function () {
                $(this).find("img").css("transform", "scale(1)")
            });
            $(".overflow-hide img,.rightAD img").hover(function () {
                $(this).css({
                    "transform": "translateX(-10px)",
                    transition: "0.3s"
                })
            }, function () {
                $(this).css("transform", "translateX(0)")
            });
        }
    };
    //好货
    class Hh {
        constructor(data) {
            this.data = data;
        }
        init() {
            $(this.createhtml()).appendTo(".goodCommodity");
            $(`<div class="loadmore"><a href="" class="button getmore">加载更多好货</a></div>`).appendTo(".goodCommodity");
            this.mouseenter();
        }
        createhtml() {
            let html = this.data.map((ele, index) => `<li class="anim-top"><a href=""><span class="goodimg"><img src="${ele.src}"></span><div class="row2">${ele.title}</div><p class="red">${ele.price}</p></a></li>`).join("");
            return `<ul>${html}</ul>`
        }
        mouseenter() {
            $(".goodCommodity > ul > .anim-top").hover(function () {
                $(this).css({
                    "box-shadow": " 0 0 20px #ccc",
                    top: -10
                })
            }, function () {
                $(this).css({
                    "box-shadow": " 0 0 0 ",
                    top: 0
                })
            });
            $(".button").hover(function () {
                $(this).css({
                    background: "#e73828",
                    color: " #fff",
                    border: "1px solid #e73828"
                })
            }, function () {
                $(this).css({
                    background: "#fff",
                    color: " #999",
                    border: "1px solid #dfdfdf"
                })
            });
        }
    };

    new Promise(function (resolve, reject) {
        //轮播图
        $.ajax({
            type: "get",
            url: "../../server/bannerdata.php",
            dataType: "json",
            success: function (response) {
                let Banner = new lbt(response);
                Banner.init();
                resolve()
            }
        });
    })
        .then(function () {
            //选项卡
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "../../server/xxkdata.php",
                    dataType: "json",
                    success: function (response) {
                        let xxks = new xxk(response);
                        xxks.init();
                        resolve();
                    }
                });
            })
        })
        .then(function () {
            //头条资讯
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "../../server/ttzx.php",
                    dataType: "json",
                    success: function (response) {
                        let ttzxs = new ttzx(response);
                        ttzxs.init();
                        resolve();
                    }
                });
            })
        })
        .then(function () {
            //马车
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "../../server/mcdata.php",
                    dataType: "json",
                    success: function (response) {
                        let mcs = new Mc(response);
                        mcs.init();
                        resolve();
                    }
                });
            })
        })
        .then(function () {
            //售后
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "../../server/shouhou.php",
                    dataType: "json",
                    success: function (response) {
                        let shou = new Sh(response);
                        shou.init();
                        resolve();
                    }
                });
            })
        })
        .then(function () {
            //楼层
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "../../server/loucengdata.php",
                    dataType: "json",
                    success: function (response) {
                        let lcs = new Lc(response);
                        lcs.init();
                        resolve();
                    }
                });
            })
        })
        .then(function () {
            //好货
            $.ajax({
                type: "get",
                url: "../../server/haohuodata.php",
                dataType: "json",
                success: function (response) {
                    let haoh = new Hh(response);
                    haoh.init();
                }
            });
        });

    //电梯
    class DT {
        constructor() {

        }
        init() {
            this.mouseenter();
            this.mouseenter2();
            this.click();
        }
        mouseenter2() {
            $(".diy-elevator a").mouseenter(function () {
                if ($(this).css("background-color") == "rgb(65, 156, 134)") {
                    $(this).css("background-color", "#333");
                    $(this).mouseleave(function () {
                        $(this).css("background-color", "rgb(65, 156, 134)")
                    });
                } else if ($(this).css("background-color") != "rgb(51, 51, 51)") {
                    $(this).css("background", "#333")
                    $(this).mouseleave(function () {
                        $(this).css("background", "#bbb")
                    });
                } else {
                    $(this).css("background", "#333");
                    $(this).mouseleave(function () {
                        $(this).css("background", "#333")
                    });
                }
            });
        }
        mouseenter() {
            window.onscroll = function () {
                if (window.scrollY > $("#go_troika")[0].offsetTop) {
                    $(".diy-elevator").fadeIn();
                    $(".diy-elevator .active").css("background", "#333");
                    $(".Totop2").css("background", "#419c86")
                } else {
                    $(".diy-elevator").fadeOut()
                    $(".Totop2").css("background", "#419c86")
                };
                if (window.scrollY >= $(".overflow-hide")[0].offsetTop - 300) {
                    $(".diy-elevator .f1").css("background", "#333").siblings().css("background", "#bbb");
                    $(".Totop2").css("background", "#419c86")
                } else if (window.scrollY < $(".overflow-hide")[0].offsetTop - 300) {
                    $(".diy-elevator .f1").css("background", "#bbb")
                    $(".Totop2").css("background", "#419c86")
                };
                if (window.scrollY >= $("#go_floor1")[0].offsetTop) {
                    $(".diy-elevator .f2").css("background", "#333").siblings().css("background", "#bbb");
                    $(".Totop2").css("background", "#419c86")
                };
                if (window.scrollY >= $("#go_floor2")[0].offsetTop) {
                    $(".diy-elevator .f3").css("background", "#333").siblings().css("background", "#bbb")
                    $(".Totop2").css("background", "#419c86")
                };
                if (window.scrollY >= $("#go_floor3")[0].offsetTop) {
                    $(".diy-elevator .f4").css("background", "#333").siblings().css("background", "#bbb")
                    $(".Totop2").css("background", "#419c86")
                };
                if (window.scrollY >= $("#go_floor4")[0].offsetTop) {
                    $(".diy-elevator .f5").css("background", "#333").siblings().css("background", "#bbb")
                    $(".Totop2").css("background", "#419c86")
                };
                if (window.scrollY >= $("#go_floor5")[0].offsetTop) {
                    $(".diy-elevator .f6").css("background", "#333").siblings().css("background", "#bbb")
                    $(".Totop2").css("background", "#419c86")
                };
                if (window.scrollY >= $("#go_floor6")[0].offsetTop) {
                    $(".diy-elevator .f7").css("background", "#333").siblings().css("background", "#bbb")
                    $(".Totop2").css("background", "#419c86")
                };
                // if (window.scrollY >= $("#go_more")[0].offsetTop) {
                //     $(".diy-elevator .f8").css("background", "#333").siblings().css("background", "#bbb")
                //     $(".Totop2").css("background", "#419c86")
                // };
            }
        }
        click() {
            $(".diy-elevator a").click(function () {
                if ($(this).index() == 0) {
                    window.scrollTo({ top: $("#go_troika")[0].offsetTop, behavior: "smooth" })
                } else if ($(this).index() == 1) {
                    window.scrollTo({ top: $(".overflow-hide")[0].offsetTop - 300, behavior: "smooth" })
                } else if ($(this).index() == 2) {
                    window.scrollTo({ top: $("#go_floor1")[0].offsetTop, behavior: "smooth" })
                } else if ($(this).index() == 3) {
                    window.scrollTo({ top: $("#go_floor2")[0].offsetTop, behavior: "smooth" })
                } else if ($(this).index() == 4) {
                    window.scrollTo({ top: $("#go_floor3")[0].offsetTop, behavior: "smooth" })
                } else if ($(this).index() == 5) {
                    window.scrollTo({ top: $("#go_floor4")[0].offsetTop, behavior: "smooth" })
                } else if ($(this).index() == 6) {
                    window.scrollTo({ top: $("#go_floor5")[0].offsetTop, behavior: "smooth" })
                } else if ($(this).index() == 7) {
                    window.scrollTo({ top: $("#go_floor6")[0].offsetTop, behavior: "smooth" })
                } else if ($(this).index() == 8) {
                    window.scrollTo({ top: $("#go_more")[0].offsetTop, behavior: "smooth" })
                } else if ($(this).index() == 9) {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                }
            })
        }
    };
    let dttz = new DT();
    dttz.init();
    //footer
    $(".promise h4").hover(function () {
        $(this).css("color", "#4FB99F")
    }, function () {
        $(this).css("color", "#333")
    });
    //bottom
    class yq {
        constructor() {
            this.index = null;
            this.top = null;
            this.timer = null;
        }
        init() {
            this.settimer();
            this.mouseenter();
        }
        next() {
            this.index++;
            if (this.index * $(".flink_box > .tempWrap > ul > li").height() == $(".flink_box > .tempWrap > ul").height()) {
                this.index = 0;
            }
            this.top = -(this.index * $(".flink_box > .tempWrap > ul > li").height());
            $(".flink_box > .tempWrap > ul").css("top", this.top)
        }
        settimer() {
            this.timer = setInterval(() => this.next(), 2000)
        }
        mouseenter() {
            $(".flink_box > .tempWrap > ul > li").hover(() => {
                clearInterval(this.timer)
            }, () => {
                this.settimer();
            });
            $(".flink_box > .tempWrap > ul > li > a").hover(function () {
                $(this).css("color", "#4FB99F")
            }, function () {
                $(this).css("color", "#333")
            });
        }
    };
    let yqlj = new yq();
    yqlj.init();
    //右侧条
    function YC() {
        $(".tool-bar-menu > a").hover(function () {
            $(".tool-bar-menu > a > span").eq($(this).index()).toggle();
        });
        $(".scroll-to-top").click(function () {
            window.scrollTo(0, 0)
        });
        $(".scroll-to-top").hover(function () {
            $(this).find("span").toggle()
        })
    }
    YC();
})
