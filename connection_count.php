<?php
require_once("connectMySql.php");
$base=connect();
//
//echo "post connect";
//
$date = date('Y-m-d');
$time = date('H:i:s');
$clientIP = $_SERVER["REMOTE_ADDR"];
$userAgent = $_POST["userAgent"];
$userName = $_POST["userName"];
$devaVersion = $_POST["devaVersion"];
//
// select count(*), userName from connection  where userName  <> 'seb' group by userName order by count(*) desc;
//
$query = "INSERT INTO connection (`userName`, `clientIP`, `date`, `time`, `devaVersion`, `userAgent`) VALUES ('$userName', '$clientIP', '$date', '$time', '$devaVersion', '$userAgent')";
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
