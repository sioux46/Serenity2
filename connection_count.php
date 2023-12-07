<?php
require_once("connectMySQL.php");
$base=connect();
//
$date = date('Y-m-d');
$time = date('H:i:s');
$clientIP = $_SERVER["REMOTE_ADDR"];
$userAgent = $_POST["userAgent"];
$userName = $_POST["userName"];
//echo $version; exit;
$query = "INSERT INTO Connection (`userName`, `clientIP`, `date`, `time`, `userAgent`) VALUES ('$userName', '$clientIP', '$date', '$time', '$userAgent')";
$result = $base->query($query);
?>
