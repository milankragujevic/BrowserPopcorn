<?php
if(!isset($description)) {
	$description = 'Popcorn Time now works in your browser! Watch the best movies instantly in HD, for free!';
}

if(!isset($og_title) && !isset($og_description) && !isset($og_url) && !isset($og_image)) {
	$og_title = 'Popcorn Time';
	$og_description = $description;
	$og_url = $www;
	$og_image = $www . 'assets/facebook-preview.jpg';
}

if(!isset($twitter_url) && !isset($twitter_title) && !isset($twitter_description) && !isset($twitter_image)) {
	$twitter_url = $www;
	$twitter_title = 'Popcorn Time';
	$twitter_description = $description;
	$twitter_image = $www . 'assets/twitter-preview.png';
}
?>
<!DOCTYPE html>
<head>
	<meta charset="utf-8"/>
	<title><?php if(isset($page_title)) { ?><?php echo $page_title; ?> - BrowserPopcorn<?php } else { ?>Popcorn Time in your browser!<?php } ?></title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="author" content="Milan Kragujevic" />
    <meta name="description" content="<?php echo $description; ?>" />
	<meta name="google-site-verification" content="q47G1qBVUGtyv42hJyPHE0xF9Sjx9wlKn5pykrxWv9g" />
	
	<?php if(!isset($no_og_tags)) { ?>
    <meta property="og:title" content="<?php echo $og_title; ?>" />
    <meta property="og:description" content="<?php echo $og_description; ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo $og_url; ?>" />
	<meta property="og:image" content="<?php echo $og_image; ?>" />
	<?php } ?>
	
	<?php if(!isset($no_twitter_tags)) { ?>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:url" content="<?php echo $twitter_url; ?>" />
    <meta name="twitter:domain" content="popcorntimefree.info" />
    <meta name="twitter:title" content="<?php echo $twitter_title; ?>" />
    <meta name="twitter:description" content="<?php echo $twitter_description; ?>" />
    <meta name="twitter:image" content="<?php echo $twitter_image; ?>" />
    <meta name="twitter:site" content="@milankragujevic" />
    <meta name="twitter:creator" content="@milankragujevic" />
	<?php } ?>
	
	<?php if(!isset($no_jwplayer)) { ?>
	<script src="//jwpsrv.com/library/Go2q0EpJEeOKGBIxOQfUww.js"></script>
	<?php } ?>
	<?php if(!isset($no_share)) { ?>
	<script src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-504653e56bb5a119"></script>
	<?php } ?>
	
    <link rel="shortcut icon" href="<?php echo $www; ?>favicon.ico" />
	<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin" />
	<link rel="stylesheet" href="<?php echo $www; ?>assets/style.css" />
	<script src="<?php echo $www; ?>assets/jquery.js"></script>
	<script src="<?php echo $www; ?>assets/scripts.js"></script>
</head>
<body>
	<div class="wrapper">
		<div class="intro section">
			<div class="container">
				<h1><a href="<?php echo $www; ?>">Popcorn Time</a></h1>
				<?php if(!isset($no_description_intro)) { ?>
				<h4>The easiest way to stream movies in your browser!</h6>
				<?php } ?>
			</div>
		</div>
		<?php if(!isset($no_warning)) { ?>
		<div class="warning section">
			<div class="container">
				<p>Downloading copyrighted material may be illegal in your country. Use at your own risk.</p>
			</div>
		</div>
		<?php } ?>
		<?php if(!isset($no_ads)) { ?>
		<div class="advertisement section">
			<div class="container">
				<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				<!-- responsive_ad -->
				<ins class="adsbygoogle"
					 style="display:block"
					 data-ad-client="ca-pub-8225192604010062"
					 data-ad-slot="1583687960"
					 data-ad-format="auto"></ins>
				<script>
				(adsbygoogle = window.adsbygoogle || []).push({});
				</script>
			</div>
		</div>
		<?php } ?>