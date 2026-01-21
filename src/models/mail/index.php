<?php

$files_path = glob(__DIR__ . '/*.php');
if ($files_path !== false) { foreach ($files_path as $file) { require_once $file; } }