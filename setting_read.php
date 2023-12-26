<?php
require_once("connectMySql.php");
$base=connect();
//
$username = $_POST['username'];
$query = "SELECT `settinglist` FROM setting WHERE `username` = '$username'";
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
  //echo $array;
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
