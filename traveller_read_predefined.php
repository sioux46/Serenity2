<?php
// traveller_read_predefined.php
require_once("connectMySql.php");
$base=connect();
//
error_reporting(E_ALL);
ini_set("display_errors", 1);
//
$username = $_POST['username'];
$clear = $_POST['clear'];

if ( $username == 'demo0 ') exit(0);
//
if ( $clear == "yes" ) {
  $query = "DELETE FROM traveller WHERE `username` = '$username'";
  $result = $base->query($query);
}

$query = "INSERT INTO traveller (`clientid`, `username`, `lastname`, `firstname`, `nickname`, `travellertype`, `phone`, `address`, `equipment`, `imgsrc`, `notes`) SELECT RAND(), '$username', `lastname`, `firstname`, `nickname`, `travellertype`, `phone`, `address`, `equipment`, `imgsrc`, `notes` FROM traveller WHERE `username` = 'demo0'";
$result = $base->query($query);

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
