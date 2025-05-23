<?php

// $apiKey = $_SERVER['OPENAI_API_KEY'];
// $url = 'https://api.openai.com/v1/chat/completions';
$apiKey = $_SERVER['DEEPSEEK_API_KEY'];
$url = 'https://api.deepseek.com/chat/completions';
// $url = 'https://api.deepseek.com';

$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
);

$messages = json_decode($_POST['chatBuffer'], true);

$model = json_decode($_POST['model'], true);
$temperature = json_decode($_POST['temperature'], true);
$style = json_decode($_POST['style'], true);
$details = json_decode($_POST['details'], true);

/*
echo "before";
print_r($apiKey);
print_r($messages);
exit;
*/

  $data = array(
      'model' => "deepseek-chat", // $model, "deepseek-chat", "deepseek-reasoner",
      'messages' => $messages,
      'max_tokens' => 1000, // 3000
      'temperature' => 1.3, // $temperature,
      // 'seed' => 12321 // any integer
      // 'top_p' => 0.5
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
    echo 'Error reading response from open a i   A P I.';
} else {
    $responseData = json_decode($response, true);
    // Access the assistant's reply
    $assistantReply = end($responseData['choices'])['message']['content'];
    echo $assistantReply;
}
?>
