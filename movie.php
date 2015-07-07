<?php
require __DIR__ . '/includes/config.php';
require __DIR__ . '/includes/functions.php';

$id = (int) $_GET['id'];
$movie = getMovie($id);
if(count($movie) < 1) { require __DIR__ . '/404.php'; } 
$stream = generateSecureStream($movie['filename']);

$description = htmlentities($movie['plot'], ENT_QUOTES);

$og_title = htmlentities($movie['title'] . ' (' . $movie['year'] . ')', ENT_QUOTES);
$og_description = $description;
$og_url = $www . 'movie.php?id=' . $movie['id'];
$og_image = $movie['poster'];

$twitter_url = $og_url;
$twitter_title = $og_title;
$twitter_description = $description;
$twitter_image = $og_image;

$no_warning = true;
$no_description_intro = true;

include __DIR__ . '/includes/header.php';
?>
		<div class="home movie section">
			<div class="container">
				<div class="content">
					<div class="player">
						<div class="player-object">
							<div id="playerXJXweHTdLqjJ"></div>
							<script>
							jwplayer('playerXJXweHTdLqjJ').setup({
								playlist: [{
									sources: [{
										file: '<?php echo $stream; ?>',
										type: 'video/mp4',
										default: true
									}],
									image: '',
									tracks: []
								}],
								width: '100%',
								aspectratio: '2.4:1',
								autostart: 'true'
							});
							</script>
						</div>
						<div class="share-buttons">
							<div class="addthis_native_toolbox"></div>
						</div>
						<div class="movie-infobox">
							<div class="movie-poster">
								<img src="<?php echo $movie['poster']; ?>" />
							</div>
							<div class="movie-details">
								<h3 class="movie-title"><?php echo $movie['title']; ?> (<?php echo $movie['year']; ?>)</h3>
								<div class="movie-description">
									<p><?php echo $movie['plot']; ?></p>
								</div>
								<div class="movie-meta">
									<b>Rating</b>: <span class="movie-rating"><?php echo $movie['rating']; ?></span>/10 (<span class="movie-votes"><?php echo $movie['votes']; ?></span> votes) <br> <b>Released</b>: <span class="movie-released"><?php echo $movie['released']; ?></span>
								</div>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
<?php
include __DIR__ . '/includes/footer.php';
?>