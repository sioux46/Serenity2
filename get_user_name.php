<?php
require_once("connectMySql.php");
$base=connect();
//
$userName = $_POST["baseUserName"];
$query = "SELECT `userName` FROM `user` WHERE `userName` = '$userName'";
$result = $base->query($query);
if ( $base->errno == 0 ) {
  $row = $result->fetch_assoc();
  if ( $row && $row['userName'] == $userName ) echo "OK";
  else echo "Nom d'utilisateur inconnu !";
  exit(0);
}
else {
  $reponse = $base->errno . ' '. $base->error . ' erreur!!! ' . $query;
  echo 'rep: ' . $reponse . ' query: ' . $query . ' IIIII ';
  exit(1);
}
?>
