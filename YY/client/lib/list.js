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
    $(".header img").click(function () {
        window.location.href = "./shouye.html?userid=" + arr.id + "&username=" + arr.username;
    })


    let typeVal = "default";
    /* 先获取第一页数据，成功之后再获取页码 */
    new Promise(function (resolve, reject) {
        getDataWithPageCount(1, typeVal, resolve);
    }).then(function () {
        getPageCount();
    })

    /* 发送网络请求获取服务器商品数据 */
    function getDataWithPageCount(index, type, callBack) {
        $.ajax({
            type: "get",
            url: "../../server/listdata2.php",
            data: "page=" + index + "&type=" + type,
            dataType: "json",
            success: function (data) {
                // console.log(data);
                renderUI(data);

                if (callBack) callBack();
            }
        });
    }

    function getPageCount() {
        $.ajax({
            type: "get",
            url: "../../server/listdata.php",
            dataType: "json",
            success: function (response) {
                // console.log(response);
                let count = response.count;
                let html = "";
                for (let i = 0; i < count; i++) {
                    html += `<a href="javascript:;" class=${i == 0 ? "active" : ""}>${i + 1}</a>`;
                }
                $("#page").html(html);

                $("#page a").click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    getDataWithPageCount($(this).index() + 1, typeVal);
                })
            }
        });
    }

    /* 渲染页面 */
    function renderUI(_data) {
        let html = _data.map((ele, index) => {
            return `<li class="item " data-top="${ele.id}">
                    <div class="item-box">
                        <img src=${ele.src}>
                        <div class="title ">${ele.title}</div>
                        <div class="price ">￥${ele.price}</div>
                        <div class="dis ">${ele.dis}</div>
                        <div class="storeName ">${ele.Top}</div>
                    </div>
                </li>
            `
        }).join("");

        $(".box-list").html(html);
    }

    $(".btn-class").on("click", "span", function () {
        // console.log(this);
        // console.log(this.getAttribute("data-type"));
        // console.log(this.dataset.type);
        // console.log($(this).data("type"));
        typeVal = $(this).data("type");
        getDataWithPageCount(1, typeVal);
        $("#page a").eq(0).addClass("active").siblings().removeClass("active");
    })
    $(".box-list").on("click", ".item", function () {
        let top = $(this).data("top");
        top = "top=" + top;
        console.log("./xiangqing.html?" + top);
        window.location.href = "./xiangqing.html?" + top + "&userid=" + arr.userid + " & username=" + arr.username;
    })
    //cart
    $(".shoppingcartB ").click(function () {
        window.location.href = "../html/shoppingcart.html?userid=" + arr.userid + "&username=" + arr.username;
    })
    $.ajax({
        type: "get",
        url: "../../server/shoppingcart3.php",
        data: "userid=" + arr.userid + "&username=" + arr.username,
        dataType: "json",
        success: function (response) {
            let numbers = 0;
            $(response).each(function (index, ele) {
                numbers = ele.num * 1 + numbers
            });
            $(".shoppingcartB > span").text(numbers);
        }
    });
});

