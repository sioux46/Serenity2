<?php
header('Content-Type: text/html; charset=utf-8');
require_once("connectMySql.php");
$base=connect();
//
$username = $_POST['username'];
$whichproto = $_POST['whichproto']; // all, my, last
//
if ( $whichproto == "all" ) { // all protos
  $query = "SELECT `condition`, tester, participant, date, time, devaVersion, prototext FROM proto";
}
else if ( $whichproto == "my" ) {  // username protos
  $query = "SELECT `condition`, tester, participant, date, time, devaVersion, prototext FROM proto WHERE username = '$username'";
}
else if ( $whichproto == "last" ) {
  $query = "SELECT `condition`, tester, participant, date, time, devaVersion, prototext FROM proto WHERE username = '$username' ORDER BY id DESC LIMIT 1";
}
else {
  echo 'Error ! Bad whichproto parameter';
  exit(1);
}
//
$result = $base->query($query);
//
if ( $base->errno == 0 ) {
  if ( !$result->num_rows ) {
    echo "empty";
    exit(0);
  }
  $array = arrayResult($result, 0);  // sans les noms de col.
  $json = json_encode($array);
  echo $json;
}
else {
  $reponse = $base->errno . ' '. $base->error . ' erreur!!! ' . $query;
  echo 'rep: ' . $reponse . ' query: ' . $query . ' IIIII ';
  exit(1);
}
// ****************************************************************
function arrayResult($result, $colTitles) {
	$nbRows = $result->num_rows;

	$nbCols=$result->field_count;
	if ($colTitles) {
		$titres = $result->fetch_fields();
		for($i = 0; $i < $nbCols; $i++) {
			$tab[0][$i] = $titres[$i]->name;
		}
		$nbRows++;
	}
	$i = ($colTitles)? 1: 0;
	for (; $i < $nbRows; $i++) {
		$row = $result->fetch_array(MYSQLI_NUM);

//echo $i, "  ", "***********************************  ";  // debug

		for ($j = 0; $j < $nbCols; $j++) {
			$donn = preg_replace('/<!--/','<--',$row[$j]);   // virer les comm. html
			$tab[$i][$j] = $donn;   // utf8_encode($donn);

//echo utf8_encode($donn), "  ";  // debug

		}
	}
	return($tab);
}

?>
