<?php
header('Content-Type: text/html; charset=utf-8');
require_once("connectMySql.php");
$base=connect();
//
$userName = $_POST['userName'];
$whichproto = $_POST['whichproto'];

if ( $whichproto == 'my') { // all userName protocoles
  $query = "DELETE FROM proto WHERE `userName` = '$userName'";
}
else if ( $whichproto == 'last') { // all userName protocoles
  $query = "DELETE FROM proto WHERE `userName` = '$userName' ORDER BY id DESC LIMIT 1";
}
else {
  echo 'Error ! Bad whichproto parameter';
  exit(1);
}
//
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
