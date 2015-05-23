function loadMovies() {
	var query = $('.search-box').val();
	$('.loading').fadeIn(300);
	$('.movies').hide().html('');
	$.get('http://api.popcorntimefree.info/?action=movies&query=' + encodeURIComponent(query), function(data) {
		if(data == null) {
			$('.no-results').fadeIn(300);
		} else {
			$('.no-results').fadeOut(300);
			$.each(data, function(i, movie) {
				$('.movies').append('<div class="movie" data-id="' + movie.id + '"><div class="movie-poster"><img width="190" height="300" src="' + movie.poster + '" /></div><div class="movie-info"><span class="movie-title">' + movie.title + '</span><span class="movie-year">' + movie.year + '</span></div></div>');
			});
		}
	});
	$('.loading').fadeOut(300);
	$('.movies').fadeIn(300);
}

$(document).ready(function() {
	loadMovies();
	$('.search-box').on('keydown', _.debounce(loadMovies, 1000));
	$('.movies').on('click', '.movie', function() {
		$('.movies').fadeOut(300);
		$('.search').fadeOut(300);
		$('.search-box').val('');
		var id = $(this).attr('data-id');
		$.get('http://api.popcorntimefree.info/?action=details&id=' + id, function(movie) {
			$('.movie-infobox .movie-poster img').attr('src', movie.poster);
			$('.movie-infobox .movie-title').html(movie.title + ' (' + movie.year + ')');
			$('.movie-infobox .movie-description p').html(movie.plot);
			$('.movie-infobox .movie-meta .movie-rating').html(movie.rating);
			$('.movie-infobox .movie-meta .movie-released').html(movie.released);
			$('.movie-infobox .movie-meta .movie-votes').html(movie.votes);
			$('.loading-player').fadeIn(300);
			$('.player').fadeIn(300);
			$.get('http://api.popcorntimefree.info/?action=subtitles&id=' + id, function(subtitles) {
				var tracks = [];
				$.each(subtitles, function(language, file) {
					tracks.push({ 
						file: file,
						label: language,
						kind: 'captions'
					});
				});
				$('.loading-player').fadeOut(300);
				jwplayer.key = '5XXb+w0txH2+cnkwOtAOWXU39zFQbZ6VT9mOA6R83tk=';
				jwplayer('playerXJXweHTdLqjJ').setup({
					playlist: [{
						sources: [{
							file: movie.stream,
							type: 'video/mp4',
							default: true
						}],
						image: '',
						tracks: tracks
					}],
					width: '100%',
					aspectratio: '16:9',
					autostart: 'true',
					skin: 'glow'
				});
			});
		});
	});
	$('.home-button img').click(function() {
		jwplayer('playerXJXweHTdLqjJ').remove();
		$('.player').fadeOut(300);
		$('.search').fadeIn(300);
		$('.movies').fadeIn(300);
	});
});