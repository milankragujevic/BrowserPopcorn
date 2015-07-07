<?php 
function cacheData() {
	global $admin_key;
	if(time() - filemtime(realpath(__DIR__ . '/../') . '/data/movies.json') > 60 * 60 || filesize(realpath(__DIR__ . '/../') . '/data/movies.json') < 1) {
		file_put_contents(realpath(__DIR__ . '/../') . '/data/movies.json', file_get_contents('http://admin.popcorntimefree.info/api/movies.php?key=' . $admin_key . '&app=popcorntime-v2'));
	}
}

function generateSecureStream($file) {
	global $stream_key;
	$full_url = '/stream/' . urldecode($file);
	$expires = time() + 60 * 60 * 6;
	$ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
	$token = str_replace('=', '', strtr(base64_encode(md5($stream_key . $full_url . $expires . $ip, true)), '+/', '-_'));
	return 'http://cdn.popcorntimefree.info' . $full_url . '?token=' . $token . '&expires=' . $expires;
}

function getMovies() {
	cacheData();
	$movies = json_decode(file_get_contents(realpath(__DIR__ . '/../') . '/data/movies.json'), true);
	foreach($movies as $i => $movie) {
		$movies[$i]['poster'] = str_replace('http://', 'https://', $movies[$i]['poster']);
	}
	return $movies;
}

function getMovie($id) {
	$movies = getMovies();
	foreach($movies as $movie) {
		if($movie['id'] == $id) { return $movie; }
	}
	return [];
}

function searchMovies($_movies, $query) {
	$query = strtolower(trim($query));
	$query = iconv('UTF-8', 'ASCII//TRANSLIT', $query);
	$movies = [];
	foreach($_movies as $_movie) {
		$title = $_movie['title'] . ' (' . $_movie['year'] . ')';
		$title = iconv('UTF-8', 'ASCII//TRANSLIT', $title);
		$genres = $_movie['genres_en'];
		$genres = iconv('UTF-8', 'ASCII//TRANSLIT', $genres);
		$plot = $_movie['plot'];
		$plot = iconv('UTF-8', 'ASCII//TRANSLIT', $plot);
		$actors = $_movie['actors'];
		$actors = iconv('UTF-8', 'ASCII//TRANSLIT', $actors);
		$director = $_movie['director'];
		$director = iconv('UTF-8', 'ASCII//TRANSLIT', $director);
		$id = '[id|' . $_movie['id'] . ']';
		$imdbID = $_movie['imdbID'];
		if(stristr($title, $query) || stristr($genres, $query) || stristr($plot, $query) || stristr($actors, $query) || stristr($director, $query) || stristr($id, $query) || stristr($imdbID, $query)) {
			$movies[] = $_movie;
		}
	}
	return $movies;
}

function sortMovies($movies) {
	usort($movies, function($movieA, $movieB) {
		return $movieA['popularity'] == $movieB['popularity'] ? 0 : $movieA['popularity'] > $movieB['popularity'] ? -1 : 1;
	});
	return $movies;
}

function isGoogleBot() {
	return strstr(strtolower($_SERVER['HTTP_USER_AGENT']), "googlebot");
}