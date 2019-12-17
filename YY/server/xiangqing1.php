<?php

$top = $_REQUEST["id"];

# 链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "yy");

# 查询获取数据库中的数据
$sql = "SELECT * FROM xqy WHERE id='$top'";

$result = mysqli_query($db, $sql);

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
// print_r($data);

# 如果1 0~19
# 如果2 20~39

# 把数据转换为JSON返回
echo json_encode($data, true);
