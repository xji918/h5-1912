<?php
$type = $_REQUEST['type'];
$top = $_REQUEST['top'];
$src = $_REQUEST['src'];
$dis = $_REQUEST['dis'];
$price = $_REQUEST['price'];


# 链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "yy");

$sql = "SELECT * FROM shoppingcart WHERE id='$top'";
$result = mysqli_query($db, $sql);
if ($type == "push") {
    if (mysqli_num_rows($result) == 0) {
        $sql = "INSERT INTO `shoppingcart` (`id`,`src`, `dis`, `price`, `num`) VALUES ('$top','$src', '$dis', '$price',1)";
        # 执行SQL语句
        $res = mysqli_query($db, $sql);

        $sql3 = "SELECT * FROM shoppingcart";
        $result = mysqli_query($db, $sql3);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data, true);
    } else {
        // $res = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $sql2 = "UPDATE `shoppingcart` SET `num` = `num` + 1 WHERE `id` = $top";
        # 执行SQL语句
        $res = mysqli_query($db, $sql2);

        $sql3 = "SELECT * FROM shoppingcart";
        $result = mysqli_query($db, $sql3);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data, true);
    };
} else if ($type == "pop") {
    $sql2 = "UPDATE `shoppingcart` SET `num` = `num` - 1 WHERE `id` = $top";
    # 执行SQL语句
    $res = mysqli_query($db, $sql2);

    $sql3 = "SELECT * FROM shoppingcart";
    $result = mysqli_query($db, $sql3);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($data, true);
} else if ($type == "del") {
    $sql9 = "DELETE FROM shoppingcart WHERE id=$top";
    $res = mysqli_query($db, $sql9);

    $sql3 = "SELECT * FROM shoppingcart";
    $result = mysqli_query($db, $sql3);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($data, true);
};
