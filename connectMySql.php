<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);


function connect()
{

	define("MYHOST","localhost");
	define("MYUSER","root"); // sioux
	define("MYPASS","root");// sioux
	define("MYBASE","deva");

	// echo MYHOST,MYUSER,MYPASS,MYBASE;
	$idcomW = new mysqli(MYHOST,MYUSER,MYPASS,MYBASE);

	/* Vérification de la connexion */
if ($idcomW->connect_errno) {
    echo "Échec de la connexion:  $idcomW->connect_error";
    exit();
}
	if (!$idcomW)
	{
	    echo "<script type=text/javascript>";
		echo "alert('Connexion mode Write Impossible à la base')</script>";
		exit();
	}
	$idcomW->query("SET sql_mode = 'ONLY_FULL_GROUP_BY'");
	echo 'query ok';
//	$isa_base->query("SET NAMES 'utf8'");
	return $idcomW;
}

echo "Connection OK<hr>";
?>
