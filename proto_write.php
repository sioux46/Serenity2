<?php
header('Content-Type: text/html; charset=utf-8');
require_once("connectMySql.php");
$base=connect();
//
$date = date('Y-m-d');
$time = date('H:i:s');
$clientIP = $_SERVER["REMOTE_ADDR"];
$userAgent = $_POST["userAgent"];
$userName = $_POST["userName"];
$devaVersion = $_POST["devaVersion"];
$tester = $_POST["tester"];
$participant = $_POST["participant"];
$condition = $_POST["condition"];
$prototext = $_POST["prototext"];
// echo
$query = "INSERT INTO proto (`userName`, `clientIP`, `date`, `time`, `devaVersion`, `userAgent`, `tester`, `participant`, `condition`, `prototext`) VALUES ('$userName', '$clientIP', '$date', '$time', '$devaVersion', '$userAgent', '$tester', '$participant', '$condition', '$prototext')";
$result = $base->query($query);
//
if ( $base->errno == 0 ) $reponse = "ok";
else {
  $reponse = $base->errno . ' '. $base->error . ' erreur!!! ' . $query;
  echo 'rep: ' . $reponse . ' query: ' . $query . ' IIIII ';
  exit(1);
}
echo ' query: ' . $query;
echo '
';
?>
