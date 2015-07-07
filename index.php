<?php
require __DIR__ . '/includes/config.php';
require __DIR__ . '/includes/functions.php';

$query = urldecode($_GET['query']);
$page = (int) $_GET['page'];
$movies = getMovies();
if(!empty($query)) {
	$movies = searchMovies($movies, $query);
	file_put_contents(__DIR__ . '/data/searches.log', date('Y-m-d H:i:s') .'|' . (count($movies) < 1 ? 'false' : 'true') . '|' . $query . "\n", FILE_APPEND);
}
$movies = sortMovies($movies);
$movies = array_chunk($movies, 16);
$pages = count($movies);
if($page < 1) { $page = 1; }
if($page > $pages) { $page = $pages; }
$movies = $movies[$page-1];

$no_share = true;
$no_jwplayer = true;

if(isGoogleBot()) {
	if($_GET['ref'] == 'blog' && $_GET['method'] == 'welcomebar') {
		require __DIR__ . '/404.php'; exit;
	}
}

include __DIR__ . '/includes/header.php';
?>
		<div class="home section">
			<div class="container">
				<div class="search">
					<form method="get" action="<?php echo $www; ?>">
						<input type="text" name="query" class="search-box" placeholder="Search movies by title, year, genres, actors..." <?php if($query != '') { echo 'value="' . htmlentities($query) . '" '; } ?>/>
					</form>
				</div>
				<div class="content">
					<?php if(count($movies) < 1) { ?>
					<div class="no-results">
						Oops. It looks like we don't have that movie. Try another one.
					</div>
					<?php } else { ?>
					<div class="movies" data-page="<?php echo $page; ?>" data-pages="<?php echo $pages; ?>" data-ajax-url="<?php echo $www; ?>ajax.php?<?php if($query != '') { echo 'query=' . htmlentities($query) . '&'; } ?>page=">
						<?php foreach($movies as $movie) { ?>
						<div class="movie" onclick="window.location='<?php echo $www; ?>movie.php?id=<?php echo $movie['id']; ?>'">
							<div class="movie-poster">
								<a href="<?php echo $www; ?>movie.php?id=<?php echo $movie['id']; ?>">
									<img src="<?php echo $movie['poster']; ?>" width="190" />
								</a>
							</div>
							<div class="movie-info">
								<span class="movie-title"><?php echo $movie['title']; ?></span>
								<span class="movie-year"><?php echo $movie['year']; ?></span>
							</div>
						</div>
						<?php } ?>
					</div>
					<div class="clearfix"></div>
					<?php if(!isGoogleBot()) { ?>
						<div class="load-more">Load More</div>
					<?php } else { ?>
						<div style="">
							<?php for($i = 1; $i <= $pages; $i++) { ?>
								<a href="<?php echo $www; ?>?<?php if($query != '') { echo 'query=' . htmlentities($query) . '&amp;'; } ?>page=<?php echo $i; ?>"><?php echo $i; ?></a>
							<?php } ?>
						</div>
					<?php } ?>
					<?php } ?>
				</div>
			</div>
		</div>
<?php
include __DIR__ . '/includes/footer.php';
?>