<?php
// traveller_write.php
require_once("connectMySql.php");
$base=connect();
//
$clientid = $_POST["clientid"];
$username = $_POST["username"];
$lastname = $_POST["lastname"];
$firstname = $_POST["firstname"];
$nickname = $_POST["nickname"];
$phone = $_POST["phone"];
$address = $_POST["address"];
$travellertype = $_POST["travellertype"];
$equipment = $_POST["equipment"];
$imgsrc = $_POST["imgsrc"];
$notes = $_POST["notes"];
//
$query = "DELETE FROM traveller WHERE `clientid` = '$clientid'";
$result = $base->query($query);
//
$query = "INSERT INTO traveller (`clientid`, `username`, `lastname`, `firstname`, `nickname`, `travellertype`, `phone`, `address`, `equipment`, `imgsrc`, `notes`) VALUES ( '$clientid', '$username', '$lastname', '$firstname', '$nickname', '$travellertype', '$phone', '$address', '$equipment', '$imgsrc', '$notes')";
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
