<?php
session_start();
$allowedOrigins = [
    "http://Serenity2.local:8888",
    "https://www.siouxlog.fr"
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

$apiKey = $_SERVER['OPENAI_API_KEY'];
$url = 'https://api.openai.com/v1/responses';

$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
];

// Données venant du frontend
$messages     = json_decode($_POST['chatBuffer'], true);
$model        = json_decode($_POST['model'], true);        // "gpt-4o" ou "gpt-5"
$temperature  = json_decode($_POST['temperature'], true);

// Conversion messages -> input texte
$inputText = '';
foreach ($messages as $msg) {
    $role = strtoupper($msg['role']);
    $inputText .= "$role: {$msg['content']}\n";
}

$data = [
    'model' => $model, // "gpt-5", //
    'input' => $inputText, // $inputText,
    'max_output_tokens' => 1000,
    'temperature' => $temperature
];

$options = [
    'http' => [
        'header'  => implode("\r\n", $headers),
        'method'  => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === false) {
    echo 'Erreur lors de l’appel à l’API OpenAI.';
    exit;
}

$responseData = json_decode($response, true);

// Récupération robuste de la sortie texte
$output = '';
foreach ($responseData['output'] as $item) {
    if ($item['type'] === 'message') {
        foreach ($item['content'] as $content) {
            if ($content['type'] === 'output_text') {
                $output .= $content['text'];
            }
        }
    }
}

echo $output;
