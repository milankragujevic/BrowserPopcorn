window.api_key = '9tt9P84ezt7nSyDd52u8VHuE66yoDAsg';

function loadMovies() {
	var query = $('.search-field input').val();
	$('.loading-search').fadeIn(300);
	$('.search-results-inner').html('');
	$.get('http://api.popcorntimefree.info/movies.php?query=' + encodeURIComponent(query) + '&key=' + window.api_key, function(movies) {
		if(movies == null) {
			$('.no-results').fadeIn(300);
		} else {
			$('.no-results').fadeOut(300);
			$.each(movies, function(i, movie) {
				$('.search-results-inner').append('<div class="search-result"><div class="movie-poster"><img src="' + movie.poster + '" /></div><div class="movie-informations"><div class="movie-title">' + movie.title + ' (' + movie.year + ')</div><div class="movie-info-section"><div class="movie-stars"><div class="movie-stars-full" style="width:' + movie.rating * 10 + '%"></div></div><div class="movie-rating"><span class="movie-rating-value">' + movie.rating + '</span>/10</div><div class="movie-runtime"></div><div class="movie-genres">' + movie.genres + '</div><div class="clearfix"></div></div><div class="movie-plot"><p>' + movie.plot + '</p></div><div class="movie-info-section-second">Director: <span class="movie-info-director">' + movie.director + '</span>, Starring: <span class="movie-info-actors">' + movie.actors + '</span></div><div class="play-button"><a href="#" data-imdbID="' + movie.id + '" data-stream="' + movie.stream + '">Play Now</a></div></div><div class="clearfix"></div></div>');
			});
		}
		$('.main-section').fadeIn(300);
		$('.loading-search').fadeOut(300);
	});
}

$(document).ready(function() {
	loadMovies();
	$('.search-field input').on('keydown', function(e) {
		if(e.keyCode == 13) {
			loadMovies();
		}
	});
	$('.home-button img').click(function() {
		$('.main-section').fadeIn(300);
		$('.player-section').fadeOut(300);
		$('video').attr('src', '');
		$('.search-field input').val('');
	});
	$('.search-results').on('click', '.play-button a', function() {
		var stream = $(this).attr('data-stream');
		$('video').attr('src', stream);
		$('.main-section').fadeOut(300);
		$('.player-section').fadeIn(300);
	});
});