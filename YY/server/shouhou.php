<?php
header("Content-Type: text/json; charset=UTF-8");

$json = file_get_contents("shouhou.json");

echo $json;
