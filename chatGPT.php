<?php

 $apiKey = $_SERVER['OPENAI_API_KEY'];

$url = 'https://api.openai.com/v1/chat/completions';
$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
);

$messages = json_decode($_POST['chatBuffer'], true);

$newChat = json_decode($_POST['model'], true);
$model = json_decode($_POST['model'], true);
$temperature = json_decode($_POST['temperature'], true);
$style = json_decode($_POST['style'], true);
$details = json_decode($_POST['details'], true);

/*
$meteo3 = array('role' => "user", 'content' => "Est-ce qu'il va pleuvoir demain ?");
$meteo4 = array('role' => "assistant", 'content' =>  "Oui, il y a 40 % de chances de pluie demain.");
*/

/* echo "before";
print_r($chatBuffer);
exit; */

  $data = array(
      'model' => $model,
      'messages' => $messages,
      // 'max_tokens' => 100,
      'temperature' => $temperature
  );
// }

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
