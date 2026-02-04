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

// 1. Clé API (ne jamais exposer)
$apiKey = $_SERVER['MISTRAL_API_KEY'] ?? null;
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(["error" => "Server misconfigured"]);
    exit;
}

// 3. Rate limit (simple par IP)
$ip = $_SERVER['REMOTE_ADDR'];
$rateFile = sys_get_temp_dir() . "/rate_" . md5($ip);

$rate = @json_decode(@file_get_contents($rateFile), true) ?? ["t" => time(), "c" => 0];

if (time() - $rate["t"] > 60) {
    $rate = ["t" => time(), "c" => 0];
}
$rate["c"]++;
file_put_contents($rateFile, json_encode($rate));

if ($rate["c"] > 30) { // 30 requêtes / minute / IP
    http_response_code(429);
    echo json_encode(["error" => "Rate limit exceeded"]);
    exit;
}

// 4. Taille max POST (64 KB)
if (strlen($_POST['chatBuffer'] ?? "") > 65536) {
    http_response_code(413);
    echo json_encode(["error" => "Payload too large"]);
    exit;
}

//////////////////////////////////////////////////////////
/*$url = 'https://api.mistral.ai/v1/chat/completions';
$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
);*/

// 5. Décodage JSON sécurisé
$raw = $_POST['chatBuffer'] ?? '';
$messages = json_decode($raw, true);

if (!is_array($messages)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit;
}

// $model = json_decode($_POST['model'], true);
$temperature = json_decode($_POST['temperature'], true);

/* echo "before";
print_r($chatBuffer);
exit; */

// 8. Payload API
  $data = array(
      'model' =>  "mistral-large-latest", // $model,
      'messages' => $messages,
      'max_tokens' => 1000, // 3000
      'temperature' => $temperature,
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
    if (isset($responseData['choices'][0]['message']['content'])) {
      $assistantReply = $responseData['choices'][0]['message']['content'];
    }
    echo $assistantReply;
}
?>
