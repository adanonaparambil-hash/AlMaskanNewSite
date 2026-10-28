<?php
// Settings for the website's inquiry form (api/inquiry.php).
// FIRST INSTALL: rename this file to config.php, then fill in the two lines below. Later updates of the website
// never overwrite config.php, so the settings stay.
//
// INQUIRY_TO   — who receives the website's inquiries (several addresses: separate them with commas)
// INQUIRY_FROM — the sender address: must be an address of this domain, e.g. website@almaskaanvillage.com
//
// Until both are filled in, the form tells visitors their message was not sent and shows the phone numbers and email.
return [
  'INQUIRY_TO' => 'operations@almaskaanvillage.com',
  'INQUIRY_FROM' => '',
];
