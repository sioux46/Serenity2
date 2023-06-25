<?php

$apiKey = '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';

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


/*
// Set your OpenAI API key
$apiKey = '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';

// Set the endpoint URL
// $endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
$endpoint = 'https://api.openai.com/v1/text-davinci-003/completions';
// Set the request data
$data = [
  "messages" => [
      ["role" => "system", "content" => "You are a helpful assistant."],
      ["role" => "user", "content" => "Who won the world series in 2020?"]
  ]
];

// Set the request headers
$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey,
];

// Initialize cURL
$ch = curl_init();

// Set the cURL options
curl_setopt($ch, CURLOPT_URL, $endpoint);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the request
$response = curl_exec($ch);

// Check for cURL error
if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
} else {
    // Decode the JSON response
    $responseData = json_decode($response, true);

    // Access the generated text
    $generatedText = $responseData['choices'][0]['text'];
    // Output the generated text
    echo $generatedText;
}

// Close cURL
curl_close($ch);
*/




/*
// Set your OpenAI API key
$apiKey = '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';

// Set the endpoint URL
$endpoint = 'https://api.openai.com/v1/engines/davinci/completions';

// Set the request data
$data = [
    'prompt' => 'Je prends des vacances',
    'max_tokens' => 100
];

// Set the request headers
$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey,
];

// Create the stream context with headers
$context = stream_context_create([
    'http' => [
        'header' => $headers,
        'method' => 'POST',
        'content' => json_encode($data),
    ],
]);

// Make the API request
$response = file_get_contents($endpoint, false, $context);

// Process the response
if ($response === false) {
    // Handle error
    echo 'Error: Unable to fetch API response.';
} else {
    // Decode the JSON response
    $responseData = json_decode($response, true);

    // Access the generated text
    $generatedText = $responseData['choices'][0]['text'];

    // Output the generated text
    echo $generatedText;
}
*/

?>
