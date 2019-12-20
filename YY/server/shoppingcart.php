<?php
$type = $_REQUEST['type'];
$top = $_REQUEST['top'];
$src = $_REQUEST['src'];
$dis = $_REQUEST['dis'];
$price = $_REQUEST['price'];
$username = $_REQUEST['username'];

# 链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "yy");
# 查询获取数据库中的数据
// $sql = "SELECT * FROM shoppingcart WHERE id='$top'";
// $result = mysqli_query($db, $sql);
// if ($type == "get") {
$sql3 = "SELECT * FROM shoppingcart WHERE  `username` = '$username'";

// print_r($sql3);

$result = mysqli_query($db, $sql3);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);
// } else 

// echo json_encode($result, true);
// echo json_encode($obj, true);
// DELETE FROM shoppingcart WHERE id=6
