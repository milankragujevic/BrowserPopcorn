<?php
error_reporting(E_ERROR && E_WARNING && E_PARSE);
ini_set('display_errors', false);
ini_set('log_errors', true);
ini_set('error_log', realpath(__DIR__ . '/../') . '/data/error.log');
session_start();
set_time_limit(0);
setlocale(LC_ALL, 'en_US.UTF8');
date_default_timezone_set('Europe/Belgrade');
if($_SERVER['SERVER_NAME'] == 'popcorntimefree.info') {
	$www = 'https://popcorntimefree.info/';
	$root = '/';
} elseif($_SERVER['SERVER_NAME'] == 'localhost') {
	$www = 'http://localhost/popcorn/';
	$root = '/popcorn/';
}
$admin_key = 'LOREMIPSUMDOLORISTAMETCONSECTETU'; // Omitted for security reasons
$stream_key = 'LOREMIPSUMDOLORISTAMETCONSECTETU'; // Omitted for security reasons