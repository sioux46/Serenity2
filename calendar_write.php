<?php
require_once("connectMySql.php");
$base=connect();
//
$username = $_POST["username"];
$evoCalEvents = $_POST["evoCalEvents"];
//
$query = "DELETE FROM evoCalEvents WHERE `username` = '$username'";
$result = $base->query($query);
//
$query = "INSERT INTO evoCalEvents (`username`, `calendar`) VALUES ('$username', '$evoCalEvents')";
$result = $base->query($query);
//
// $query = "UPDATE `evoCalEvents` SET `calendar` = '$evoCalEvents' WHERE `username` = '$username'";
// $result = $base->query($query);
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
