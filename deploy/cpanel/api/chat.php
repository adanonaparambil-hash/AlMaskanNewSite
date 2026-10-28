<?php
// POST /api/chat — on cPanel hosting the site assistant runs without AI: this answers "not configured", and the
// chat widget then replies from its built-in topics (rooms, quotes, catering, retail, spaces, lifestyle, location,
// contact). The AI answers need the Node.js version of the site.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
http_response_code(503);
echo json_encode(['ok' => false, 'code' => 'not_configured']);
