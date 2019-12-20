<?php

$type = $_REQUEST['type'];
$top = $_REQUEST['top'];
$src = $_REQUEST['src'];
$dis = $_REQUEST['dis'];
$price = $_REQUEST['price'];
$username = $_REQUEST['username'];
// $userid = $_REQUEST['userid'];
// echo $top, $username;
# 链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "yy");

$sql = "SELECT * FROM shoppingcart WHERE `id` = $top AND `username` = '$username'";
$result = mysqli_query($db, $sql);
if ($type == "push") {
    // echo ($sql);
    if (mysqli_num_rows($result) == 0) {
        $sql = "INSERT INTO `shoppingcart` (`id`,`username`,`src`, `dis`, `price`, `num`,`shopid`) VALUES ('$top','$username','$src', '$dis', '$price',1,null)";
        # 执行SQL语句
        $res = mysqli_query($db, $sql);

        $sql3 = "SELECT * FROM shoppingcart WHERE  `username` = '$username'";
        $result = mysqli_query($db, $sql3);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data, true);
    } else {
        // $res = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $sql2 = "UPDATE `shoppingcart` SET `num` = `num` + 1 WHERE `id` = $top AND `username` = '$username'";
        # 执行SQL语句
        $res = mysqli_query($db, $sql2);

        $sql3 = "SELECT * FROM shoppingcart WHERE  `username` = '$username'";
        $result = mysqli_query($db, $sql3);
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data, true);
    };
} else if ($type == "pop") {
    $sql2 = "UPDATE `shoppingcart` SET `num` = `num` - 1 WHERE `id` = $top AND `username` = '$username'";
    # 执行SQL语句
    $res = mysqli_query($db, $sql2);

    $sql3 = "SELECT * FROM shoppingcart WHERE  `username` = '$username'";
    $result = mysqli_query($db, $sql3);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($data, true);
} else if ($type == "del") {
    $sql9 = "DELETE FROM shoppingcart WHERE `id` = $top AND `username` = '$username'";
    $res = mysqli_query($db, $sql9);

    $sql3 = "SELECT * FROM shoppingcart WHERE  `username` = '$username'";
    $result = mysqli_query($db, $sql3);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($data, true);
};
