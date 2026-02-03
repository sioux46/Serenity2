<?php
session_start();
$allowedOrigins = [
    "http://Serenity2.local:8888/index.php",
    "https://www.siouxlog.fr/deva2mtl/index.php"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, X-CSRF-Token");

// Préflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
/////////////////////////////////////////////////////////

$apiKey = $_SERVER['MISTRAL_API_KEY'];
$url = 'https://api.mistral.ai/v1/chat/completions';

$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
);

$messages = json_decode($_POST['chatBuffer'], true);

$model = json_decode($_POST['model'], true);
$temperature = json_decode($_POST['temperature'], true);
$style = json_decode($_POST['style'], true);
$details = json_decode($_POST['details'], true);

/* echo "before";
print_r($chatBuffer);
exit; */

  $data = array(
      'model' =>  "mistral-large-latest", // $model,
      'messages' => $messages,
      'max_tokens' => 1000, // 3000
      'temperature' => $temperature,
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
    echo 'Error reading response from Mistral API.';
} else {
    $responseData = json_decode($response, true);
    // Access the assistant's reply
    // $assistantReply = end($responseData['choices'])['message']['content'];
    if (isset($responseData['choices'][0]['message']['content'])) {
      $assistantReply = $responseData['choices'][0]['message']['content'];
    }
    echo $assistantReply;
}
?>
