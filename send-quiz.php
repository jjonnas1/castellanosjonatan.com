<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_payload']);
    exit;
}

// Honeypot: si un bot rellenó el campo oculto, respondemos ok sin enviar nada.
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean_line($value) {
    $value = trim((string) $value);
    return str_replace(["\r", "\n"], ' ', $value);
}

$name = clean_line($data['name'] ?? '');
$email = trim((string) ($data['email'] ?? ''));
$whatsapp = clean_line($data['whatsapp'] ?? '');
$language = clean_line($data['language'] ?? '');
$level = clean_line($data['level'] ?? '');
$score = (int) ($data['score'] ?? 0);
$total = (int) ($data['total'] ?? 20);

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $language === '' || $level === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'missing_fields']);
    exit;
}

$to = 'jonatancastellanosabogado@gmail.com';
$subject = "Nuevo resultado del test de nivel: $name ($language $level)";

$body = "Nuevo resultado del test de nivel de idioma\n\n";
$body .= "Nombre: $name\n";
$body .= "Email: $email\n";
$body .= "WhatsApp: " . ($whatsapp !== '' ? $whatsapp : 'No proporcionado') . "\n";
$body .= "Idioma evaluado: $language\n";
$body .= "Nivel obtenido: $level\n";
$body .= "Puntaje: $score / $total\n";
$body .= "Fecha: " . date('Y-m-d H:i:s') . "\n";
$body .= "Origen: " . ($_SERVER['HTTP_REFERER'] ?? 'castellanosjonatan.com') . "\n";

$fromEmail = 'noreply@castellanosjonatan.com';
$headers = "From: Test de Nivel <$fromEmail>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $subject, $body, $headers);

echo json_encode(['ok' => (bool) $sent]);
