<?php
// POST /api/inquiry — the website's inquiry form, delivered by email through the hosting's own mail server (PHP mail()).
// Same checks and email format as src/app/api/inquiry/route.ts on the Node version. Settings: api/config.php.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $status, array $body): void {
  http_response_code($status);
  echo json_encode($body, JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'Method not allowed.']);

$config = is_file(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$to = trim((string) ($config['INQUIRY_TO'] ?? ''));
$from = trim((string) ($config['INQUIRY_FROM'] ?? ''));

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) reply(400, ['ok' => false, 'error' => 'Invalid request.']);

$clean = fn($v, int $max) => mb_substr(trim(preg_replace('/[\r\n]+/', ' ', (string) ($v ?? ''))), 0, $max);
$block = fn($v, int $max) => mb_substr(trim(str_replace("\r", '', (string) ($v ?? ''))), 0, $max);

// honeypot: pretend success to bots without sending anything
if ($clean($body['website'] ?? '', 200) !== '') reply(200, ['ok' => true]);

$audience = $clean($body['audience'] ?? '', 20) === 'Institution' ? 'Institution' : 'Individual';
$rawKind = $clean($body['kind'] ?? '', 20);
$kind = in_array($rawKind, ['Complaint', 'Newsletter', 'Quote'], true) ? $rawKind : 'Query';
$topicIn = $clean($body['topic'] ?? '', 20);
$topic = in_array($topicIn, ['Village', 'Accommodation', 'Catering', 'Retail', 'Spaces', 'Lifestyle'], true) ? $topicIn : 'Village';
$name = $clean($body['name'] ?? '', 120);
$organisation = $clean($body['organisation'] ?? '', 160);
$email = $clean($body['email'] ?? '', 160);
$phone = $clean($body['phone'] ?? '', 40);
$message = $block($body['message'] ?? '', 4000);
$roomIn = $clean($body['room'] ?? '', 30);
$room = in_array($roomIn, ['Junior staff', 'Single premium', 'Double premium', 'Triple premium'], true) ? $roomIn : '';
$residentsIn = $clean($body['residents'] ?? '', 6);
$residents = (ctype_digit($residentsIn) && (int) $residentsIn >= 1 && (int) $residentsIn <= 5000) ? $residentsIn : '';
$moveinIn = $clean($body['movein'] ?? '', 10);
$movein = preg_match('/^\d{4}-\d{2}-\d{2}$/', $moveinIn) ? $moveinIn : '';

$validEmail = (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$validEmail || ($kind !== 'Newsletter' && (mb_strlen($name) < 2 || mb_strlen($message) < 10))) {
  reply(422, ['ok' => false, 'error' => 'Please complete the required fields.']);
}

// not set up yet: say so honestly (the form then shows the phone numbers and email instead)
if ($to === '' || $from === '') reply(503, ['ok' => false, 'code' => 'not_configured', 'error' => 'Inquiry delivery is not configured.']);

$lines = [
  "Type: $kind",
  'From: ' . $audience . ($organisation !== '' ? " — $organisation" : ''),
  "About: Al Maskaan $topic",
  "Name: $name",
  "Email: $email",
  'Phone: ' . ($phone !== '' ? $phone : '—'),
];
if ($topic === 'Accommodation' && ($room !== '' || $residents !== '' || $movein !== '')) {
  $lines[] = 'Room type: ' . ($room !== '' ? $room : '—');
  $lines[] = 'Residents: ' . ($residents !== '' ? $residents : '—');
  $lines[] = 'Preferred move-in: ' . ($movein !== '' ? $movein : '—');
}
$lines[] = '';
$lines[] = $message;

$subject = "[Al Maskaan Village website] $kind · $topic · $name";
$safeName = str_replace(['<', '>', '"'], '', $name);
$headers = [
  'From: Al Maskaan Village Website <' . $from . '>',
  'Reply-To: ' . $safeName . ' <' . $email . '>',
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
];
$sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', implode("\n", $lines), implode("\r\n", $headers), '-f' . $from);

if (!$sent) {
  error_log('[inquiry] mail() failed');
  reply(502, ['ok' => false, 'error' => 'We could not deliver your message just now. Please try again, or call or email us.']);
}
reply(200, ['ok' => true]);
