window.items = {};

function loadMovies() {
	var query = $('.search-field input').val();
	$('.loading-search').fadeIn(300);
	$('.search-results-inner').html('');
	var queryComponent = '';
	if(!query != '') {
		queryComponent = '?query=' + encodeURIComponent(query);
	}
	$.get('http://api.popcorntimefree.info/content.php' + queryComponent, function(items) {
		if(items == null) {
			$('.no-results').fadeIn(300);
		} else {
			$('.no-results').fadeOut(300);
			$.each(items, function(i, item) {
				item.type = item.episodes == null ? 'movie' : 'tvshow';
				window.items[item.id] = item;
				$('.search-results-inner').append('<div class="search-result" data-type="' + item.type + '"><div class="movie-poster"><img src="' + item.poster + '" /></div><div class="movie-informations"><div class="movie-title">' + item.title + ' (' + item.year + ')</div><div class="movie-info-section"><div class="movie-stars"><div class="movie-stars-full" style="width:' + item.rating * 10 + '%"></div></div><div class="movie-rating"><span class="movie-rating-value">' + item.rating + '</span>/10</div><div class="movie-runtime">' + item.runtime + '</div><div class="movie-genres">' + item.genres + '</div><div class="clearfix"></div></div><div class="movie-plot"><p>' + item.plot + '</p></div><div class="movie-info-section-second">Director: <span class="movie-info-director">' + item.director + '</span>, Starring: <span class="movie-info-actors">' + item.actors + '</span></div><div class="play-button"><a href="#" data-imdbID="' + item.id + '">Play Now</a></div></div><div class="clearfix"></div></div>');
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
		$('.episodes-section').fadeOut(300);
		$('video').attr('src', '');
		$('.search-field input').val('');
		loadMovies();
	});
	$('.search-results').on('click', '.play-button a', function() {
		var id = $(this).attr('data-imdbID');
		$('.search-field input').val('');
		var item = window.items[id];
		if(item.type == 'movie') {
			var stream = item.stream;
			$('video').attr('src', stream);
			$('.main-section').fadeOut(300);
			$('.player-section').fadeIn(300);
		} else if(item.type == 'tvshow') {
			$('.main-section').fadeOut(300);
			$('.episodes-section').fadeIn(300);
			$('.episodes-section').attr('data-imdbID', item.imdbID);
			$('.episodes-section').attr('data-id', item.id);
			$('.episodes-section .movie-informations .movie-title').html(item.title);
			$('.episodes-section .movie-informations .movie-runtime').html(item.runtime);
			$('.episodes-section .movie-informations .movie-genres').html(item.genres);
			$('.episodes-section .movie-informations .movie-rating .movie-rating-value').html(item.rating);
			$('.episodes-section .movie-informations .movie-stars .movie-stars-full').css('width', item.rating * 10 + '%');
			$('.episodes-section .movie-informations .movie-plot p').html(item.plot);
			$('.episodes-section .movie-informations .movie-info-section-second .movie-info-director').html(item.director);
			$('.episodes-section .movie-informations .movie-info-section-second .movie-info-actors').html(item.actors);
			$('.episodes-section .movie-poster img').attr('src', item.poster);
			var seasons = '';
			$.each(array_keys(item.episodes), function(i, season) {
				seasons += '<div class="season-item' + (season == 1 ? ' active' : '') + '"><a href="#" data-season="' + season + '">Season ' + season + '</a></div>';
			});
			var episodes_1 = '';
			$.each(item.episodes[1], function(episode, stream) {
				episodes_1 += '<div class="episode-item' + (episode == 1 ? ' active' : '') + '"><a href="#" data-id="' + item.id + '" data-imdbID="' + item.imdbID + '" data-episode="' + episode + '" data-season="1" data-stream="' + stream + '">Episode ' + episode + '</a></div>';
			});
			$('.episodes-section .seasons-items').html(seasons);
			$('.episodes-section .episodes-items').html(episodes_1);
		}
	});
	$('.episodes-section .seasons-items').on('click', '.season-item', function(e) {
		$('.episodes-section .seasons-items .season-item.active').removeClass('active');
		$(this).addClass('active');
		var id = $('.episodes-section').attr('data-id');
		var season = $(this).find('a').attr('data-season');
		var item = window.items[id];
		var episodes = '';
		$.each(item.episodes[season], function(episode, stream) {
			episodes += '<div class="episode-item' + (episode == 1 ? ' active' : '') + '"><a href="#" data-id="' + item.id + '"  data-imdbID="' + item.imdbID + '" data-season="' + season + '" data-episode="' + episode + '" data-stream="' + stream + '">Episode ' + episode + '</a></div>';
		});
		$('.episodes-section .episodes-items').html(episodes);
		e.preventDefault();
		return false;
	});
	$('.episodes-section .episodes-items').on('click', '.episode-item', function() {
		var id = $(this).find('a').attr('data-id');
		var season = $(this).find('a').attr('data-season');
		var episode = $(this).find('a').attr('data-episode');
		var item = window.items[id];
		var stream = item.episodes[season][episode];
		$('.main-section').fadeOut(300);
		$('.player-section').fadeIn(300);
		$('.episodes-section').fadeOut(300);
		$('video').attr('src', stream);
	});
	$('.adblock-dismiss').click(function() {
		Cookies.set('pt_abD', 'true');
		$('.adblock-message-overlay').fadeOut(300);
	});
});