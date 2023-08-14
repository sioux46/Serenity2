<?php

 $apiKey = $_SERVER['OPENAI_API_KEY'];

$url = 'https://api.openai.com/v1/chat/completions';
$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
);

$newChat = json_decode($_POST['model'], true);
$model = json_decode($_POST['model'], true);
$temperature = json_decode($_POST['temperature'], true);
$style = json_decode($_POST['style'], true);
$userContent = json_decode($_POST['userContent'], true);
$details = json_decode($_POST['details'], true);

if ( $style ) $style = " en vous exprimant dans le style de $style ";
if ( $details ) $details = " et $details ";

// echo ' ' . $details . ' ';

if ( $newChat ) {
  $data = array(
      'model' => $model,
      'messages' => array(

          array('role' =>'system', 'content' => "Vous: Au revoir, mettons fin à cette conversation."),
          array('role' => 'user', 'content' => "Bonjour, J'ai une nouvelle question"),

          array('role' => 'system', 'content' => "Vous êtes Norbert, mon chauffeur et mon secrétaire particulier et mon assistant. Je suis votre client et je m'appelle Seb. Vous devez répondre à mes questions $style $details"),

          array('role' => 'user', 'content' => $userContent),
      ),
      // 'max_tokens' => 100,
      'temperature' => $temperature
  );
}
else {
  $data = array(
      'model' => $model,
      'messages' => array(

          array('role' => 'system', 'content' => "Vous êtes Norbert, mon chauffeur et mon secrétaire particulier et mon assistant. Je suis votre client et je m'appelle Seb. Vous devez répondre à mes questions $style $details"),

          array('role' => 'user', 'content' => $userContent),
      ),
      // 'max_tokens' => 100,
      'temperature' => $temperature
  );
}

$options = array(
    'http' => array(
        'header' => implode("\r\n", $headers),
        'method' => 'POST',
        'content' => json_encode($data)
    )
);

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

// Process the response
if ($response === false) {
    echo 'Error reading response from API.';
} else {
    $responseData = json_decode($response, true);
    // Access the assistant's reply
    $assistantReply = end($responseData['choices'])['message']['content'];
    echo $assistantReply;
}
?>
