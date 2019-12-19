<?php
# 链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "yy");
# 查询获取数据库中的数据

$sql = "SELECT * FROM shoppingcart";
$result = mysqli_query($db, $sql);
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($data, true);
