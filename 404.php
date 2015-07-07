<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

header('HTTP/1.1 404 Not Found');

$no_ads = true;
$no_og_tags = true;
$no_twitter_tags = true;
$no_description_intro = true;
$no_warning = true;
$no_share = true;
$no_jwplayer = true;

$page_title = 'Page Not Found';

include __DIR__ . '/includes/header.php';
?>
		<div class="page page-404 section">
			<div class="container">
				<h2 class="page-title">Page Not Found</h2>
				<div class="page-content">
					<p>We're sorry, but the requested page does not exist on this server. </p>
					<p>Go to our <a href="<?php echo $www; ?>">home page</a>, or if you want to report this error, you can send us an email at milankragujevic@gmail.com. </p>
				</div>
			</div>
		</div>
<?php
include __DIR__ . '/includes/footer.php';
?>