<?php
require_once("connectMySql.php");
$base=connect();
//
$clientid = $_POST['clientid'];
$query = "DELETE FROM traveller WHERE `clientid` = '$clientid'";
$result = $base->query($query);
//
if ( $base->errno == 0 ) {
  echo $query;
  exit(0);
}
else {
  $reponse = $base->errno . ' '. $base->error . ' erreur!!! ' . $query;
  echo 'rep: ' . $reponse . ' query: ' . $query . ' IIIII ';
  exit(1);
}
?>
