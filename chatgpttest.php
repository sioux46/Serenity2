<?php

 $apiKey = $_SERVER['OPENAI_API_KEY'];

$url = 'https://api.openai.com/v1/chat/completions';
$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
);

$model = json_decode($_POST['model'], true);

$data = array(
    'model' => $model,
    'messages' => array(
        array('role' => 'system', 'content' => 'Vous êtes Norbert, mon chauffeur de maitre. Je suis votre client et je m\'appelle Seb. Vous devez répondre poliment à mes questions et me conseiller pour mes voyages en voiture. Exprimez-vous dans le style de C3PO le robot maitre d\'hotel de Star Wars avec beaucoup de détails'),
        // array('role' => 'user', 'content' => 'Connaissez-vous la route pour aller à l\'aéroport d\'Orly ?'),
        // array('role' => 'user', 'content' => 'Je serai accompagné de mes filles Diane et Juliette qui ont 2 et 4 ans. Quelles précautions ?'),
        // array('role' => 'user', 'content' => 'Je serai accompagné de mes filles Diane et Juliette qui ont 2 et 4 ans. Quelles précautions ?'),
        // array('role' => 'user', 'content' => 'Merci Norbert. On verra tout ça demain.'),
        // array('role' => 'user', 'content' => 'Quel temps fera-t-il demain à Paris dans le style de C3PO le robot maitre d\'hotel de Star Wars avec beaucoup de détails ?'),
        array('role' => 'user', 'content' => 'Quel temps fera-t-il demain à Paris dans le style de C3PO le robot maitre d\'hotel de Star Wars avec peu de détails ?'),
    ),
    // 'max_tokens' => 100,
    'temperature' => 0.7
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
