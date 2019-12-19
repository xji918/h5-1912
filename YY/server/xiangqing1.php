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


// // 创建连接
// $conn = new mysqli($servername, $username, $password, $dbname);


// // 使用 sql 创建数据表
// $sql = "CREATE TABLE MyGuests (
// id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
// firstname VARCHAR(30) NOT NULL,
// lastname VARCHAR(30) NOT NULL,
// email VARCHAR(50),
// reg_date TIMESTAMP
// )";

// if ($conn->query($sql) === TRUE) {
//     echo "Table MyGuests created successfully";
// } else {
//     echo "创建数据表错误: " . $conn->error;
// }

// $conn->close();
