<?php
// OPTIONAL settings for the website's inquiry form (api/inquiry.php).
// Without this file the form sends to operations@almaskaanvillage.com, from website@almaskaanvillage.com.
// To change either address: rename this file to config.php and edit the lines below. Later updates of the
// website never overwrite config.php, so your settings stay.
//
// INQUIRY_TO   — who receives the website's inquiries (several addresses: separate them with commas)
// INQUIRY_FROM — the sender address: must be an address of this domain
return [
  'INQUIRY_TO' => 'operations@almaskaanvillage.com',
  'INQUIRY_FROM' => 'website@almaskaanvillage.com',
];
