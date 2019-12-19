<?php
//这里的user是数据库名称
$db = mysqli_connect("127.0.0.1", "root", "", "yy");
# 获取客户端提交的参数
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

//这里的xm是数据表名称
$sql1 = "SELECT * FROM user WHERE username='$username'";
$result1 = mysqli_query($db, $sql1);

$data = array("status" => "", "username" => "", "id" => "", "data" => array("msg" => ""));

if (mysqli_num_rows($result1) == 0) {
    # (2-1) 如果不存在，那么就返回数据(登录失败，用户名不存在)
    // $data["status"] = "error";
    // $data["data"]["msg"] = "登录失败，用户名不存在";
    $aa = "SELECT * FROM user WHERE phone='$username'";
    $result2 = mysqli_query($db, $aa);
    if (mysqli_num_rows($result2) == 0) {

        $bb = "SELECT * FROM user WHERE email='$username'";
        $result3 = mysqli_query($db, $bb);
        if (mysqli_num_rows($result3) == 0) {
            $data["status"] = "error";
            $data["data"]["msg"] = "登录失败，用户名不存在";
        } else {
            # (2-2) 如果用户名存在，接着检查密码
            $sql2 = "SELECT * FROM user WHERE email='$username'";
            $res = mysqli_query($db, $sql2);
            $res = mysqli_fetch_all($res, MYSQLI_ASSOC);
            $res = $res[0]["password"];
            if ($password !=  $res) {
                # (2-2-1) 密码不正确，那么就返回数据(登录失败，密码错误)
                $data["status"] = "error";
                $data["data"]["msg"] = "登录失败，密码不正确！！！";
            } else {
                # (2-2-2) 密码正确，那么就返回数据(登录成功)
                $data["status"] = "success";
                $data["data"]["msg"] = "恭喜你，登录成功";
            }
        }
    } else {
        # (2-2) 如果用户名存在，接着检查密码
        $sql2 = "SELECT * FROM user WHERE phone='$username'";
        $res = mysqli_query($db, $sql2);
        $res = mysqli_fetch_all($res, MYSQLI_ASSOC);
        $res = $res[0]["password"];
        if ($password !=  $res) {
            # (2-2-1) 密码不正确，那么就返回数据(登录失败，密码错误)
            $data["status"] = "error";
            $data["data"]["msg"] = "登录失败，密码不正确！！！";
        } else {
            # (2-2-2) 密码正确，那么就返回数据(登录成功)
            $data["status"] = "success";
            $data["data"]["msg"] = "恭喜你，登录成功";
        }
    }
} else {
    # (2-2) 如果用户名存在，接着检查密码
    $sql2 = "SELECT * FROM user WHERE username='$username'";
    $res = mysqli_query($db, $sql2);
    $res = mysqli_fetch_all($res, MYSQLI_ASSOC);
    $username = $res[0]["username"];
    $id = $res[0]["id"];
    $res = $res[0]["password"];
    if ($password !=  $res) {
        # (2-2-1) 密码不正确，那么就返回数据(登录失败，密码错误)
        $data["status"] = "error";
        $data["data"]["msg"] = "登录失败，密码不正确！！！";
    } else {
        # (2-2-2) 密码正确，那么就返回数据(登录成功)
        $data["status"] = "success";
        $data["username"] =  $username;
        $data["id"] =  $id;
        $data["data"]["msg"] = "恭喜你，登录成功";
    }
}
echo json_encode($data, true);
