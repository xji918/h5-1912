<?php
# page = 2
$type = $_REQUEST["type"];

# 链接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "yy");

# 查询获取数据库中的数据
# page 1 = 0, 20
# page 2 = 20, 20
# page 3 = 40, 20
$start = ($_REQUEST["page"] - 1) * 20;
if ($type == "default") {
    $sql = "SELECT * FROM list LIMIT $start ,20";
} elseif ($type == "desc") {
    // SELECT * FROM `goods` ORDER BY `goods`.`price` DESC
    $sql = "SELECT * FROM list ORDER BY list.price  DESC LIMIT $start ,20";
} elseif ($type == "asc") {
    $sql = "SELECT * FROM list ORDER BY list.price  ASC LIMIT $start ,20";
}

$result = mysqli_query($db, $sql);

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
// print_r($data);

# 如果1 0~19
# 如果2 20~39

# 把数据转换为JSON返回
echo json_encode($data, true);
