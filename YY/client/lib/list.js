$(() => {

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
            return `<li class="item">
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
});

