<?php
require __DIR__ . '/includes/config.php';
require __DIR__ . '/includes/functions.php';

$query = urldecode($_GET['query']);
$page = (int) $_GET['page'];
$movies = getMovies();
if(!empty($query)) {
	$movies = searchMovies($movies, $query);
}
$movies = sortMovies($movies);
$movies = array_chunk($movies, 16);
$pages = count($movies);
if($page < 1) { $page = 1; }
if($page > $pages) { $page = $pages; }
$movies = $movies[$page-1];
?>
<?php foreach($movies as $i => $movie) { ?>
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