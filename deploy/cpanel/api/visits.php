<?php
// GET/POST /api/visits — the footer's "visitors since launch" counter, kept in a small file on the server
// (api/data/visits.txt). Each browser counts once: the page only POSTs on its first visit. Bots are not counted.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$dir = __DIR__ . '/data';
$file = $dir . '/visits.txt';
if (!is_dir($dir)) @mkdir($dir, 0755, true);

$fh = @fopen($file, 'c+');
if (!$fh) {
  http_response_code(502);
  echo json_encode(['configured' => true, 'error' => true]);
  exit;
}
flock($fh, LOCK_EX);
$count = (int) stream_get_contents($fh);
$bot = (bool) preg_match('/bot|crawl|spider|slurp|preview|headless|lighthouse/i', $_SERVER['HTTP_USER_AGENT'] ?? '');
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !$bot) {
  $count++;
  ftruncate($fh, 0);
  rewind($fh);
  fwrite($fh, (string) $count);
  fflush($fh);
}
flock($fh, LOCK_UN);
fclose($fh);
echo json_encode(['configured' => true, 'count' => $count]);
