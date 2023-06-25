<?php

 $apiKey = $_SERVER['OPENAI_API_KEY'];

$url = 'https://api.openai.com/v1/chat/completions';
$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
);

$data = array(
    'model' => 'gpt-3.5-turbo',
    'messages' => array(
        array('role' => 'system', 'content' => 'Vous êtes Norbert, mon chauffeur de maitre. Je suis votre client et je m\'appelle Seb. Vous devez répondre poliment à mes questions et me donner de bon conseils concernant les voyages en voiture.'),
        // array('role' => 'user', 'content' => 'Connaissez-vous la route pour aller à l\'aéroport d\'Orly ?'),
        // array('role' => 'user', 'content' => 'Je serai accompagné de mes filles Diane et Juliette qui ont 2 et 4 ans. Quelles précautions ?'),
        // array('role' => 'user', 'content' => 'Je serai accompagné de mes filles Diane et Juliette qui ont 2 et 4 ans. Quelles précautions ?'),
        array('role' => 'user', 'content' => 'Merci Norbert. On verra tout ça demain.'),
    ),
    // 'max_tokens' => 100,
    'temperature' => 0.8
);

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
    echo 'Norbert: ' . $assistantReply;
}
?>
