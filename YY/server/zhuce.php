<?php

# 插入一行数据到数据库中的SQL语句
# INSERT INTO `user` (`id`, `username`, `password`, `phone`) VALUES ('1', 'zs', '123456', '18681538888');
# 查询user表中的所有数据
# SELECT * FROM user
# 查询user表中的所有的username
# SELECT username FROM user
# 查询user表中username等于zs的这一条数据
# SELECT * FROM user WHERE username="zs";
# 注册
# (1) 检查数据库中指定的用户名是否存在，如果存在那么返回错误信息(注册失败，用户名已经被使用！)
# (2) 如果该用户名在数据库不存在，那么就往数据库中插入一条数据，并且返回注册成功！

# 获取客户端提交的参数
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$phone = $_REQUEST["phone"];
$email = $_REQUEST["email"];

//这里的user是数据库名称
$db = mysqli_connect("127.0.0.1", "root", "", "yy");
//这里的xm是数据表名称
$sql1 = "SELECT * FROM user WHERE username='$username'";
$result = mysqli_query($db, $sql1);

$obj = array("status" => "", "data" => array("msg" => ""));
// var_dump(mysqli_num_rows($result));
if (mysqli_num_rows($result) == 1) {
    $obj["status"] = "error";
    $obj["data"]["msg"] = "注册失败，该用户名已经被使用！！！";
} else {
    $sql = "INSERT INTO `user` (`id`, `username`, `password`, `phone`,`email`) VALUES (NULL, '$username', '$password', '$phone','$email')";
    # 执行SQL语句
    $res = mysqli_query($db, $sql);
    // echo ($sql);
    $obj["status"] = "success";
    $obj["data"]["msg"] = "恭喜您，注册成功！！！";
}

echo json_encode($obj, true);
