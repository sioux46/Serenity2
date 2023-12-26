<?php
require_once("connectMySql.php");
$base=connect();
//
$username = $_POST["username"];
$setting = $_POST["setting"];
//
$query = "DELETE FROM setting WHERE `username` = '$username'";
$result = $base->query($query);
//
$query = "INSERT INTO setting (`username`, `settinglist`) VALUES ('$username', '$setting')";
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
