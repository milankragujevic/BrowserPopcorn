window.items = {};

function loadMovies() {
	var query = $('.search-field input').val();
	$('.loading-search').fadeIn(300);
	$('.search-results-inner').html('');
	var queryComponent = '';
	if(query.length > 0) {
		queryComponent = '?query=' + encodeURIComponent(query);
	}
	$.get('http://api.popcorntimefree.info/content.php' + queryComponent, function(items) {
		if(items == null) {
			$('.no-results').fadeIn(300);
		} else {
			$('.no-results').fadeOut(300);
			$.each(items, function(i, item) {
				item.type = !item.episodes || typeof item.episodes == 'undefined' ? 'movie' : 'tvshow';
				window.items[item.imdbID] = item;
				$('.search-results-inner').append('<div class="search-result" data-type="' + item.type + '"><div class="movie-poster"><img src="' + item.poster + '" /></div><div class="movie-informations"><div class="movie-title">' + item.title + ' (' + item.year + ')</div><div class="movie-info-section"><div class="movie-stars"><div class="movie-stars-full" style="width:' + item.rating * 10 + '%"></div></div><div class="movie-rating"><span class="movie-rating-value">' + item.rating + '</span>/10</div><div class="movie-runtime">' + item.runtime + '</div><div class="movie-genres">' + item.genres + '</div><div class="clearfix"></div></div><div class="movie-plot"><p>' + item.plot + '</p></div><div class="movie-info-section-second">Director: <span class="movie-info-director">' + item.director + '</span>, Starring: <span class="movie-info-actors">' + item.actors + '</span></div><div class="play-button"><a href="#" data-imdbID="' + item.imdbID + '">Play Now</a></div></div><div class="clearfix"></div></div>');
			});
		}
		$('.main-section').fadeIn(300);
		$('.page-section').fadeOut(300);
		$('.loading-search').fadeOut(300);
	});
}

function selectTVShow(item) {
	$('.main-section').fadeOut(300);
	$('.page-section').fadeOut(300);
	$('.episodes-section').fadeIn(300);
	$('.episodes-section').attr('data-imdbID', item.imdbID);
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
		seasons += '<div class="season-item' + (season == 1 ? ' active' : '') + '"><a href="#" data-imdbID="' + item.imdbID + '" data-season="' + season + '">Season ' + season + '</a></div>';
	});
	var episodes_1 = '';
	$.each(item.episodes[1], function(episode, stream) {
		episodes_1 += '<div class="episode-item' + (episode == 1 ? ' active' : '') + '"><a href="#" data-imdbID="' + item.imdbID + '" data-episode="' + episode + '" data-season="1" data-stream="' + stream + '">Episode ' + episode + '</a></div>';
	});
	$('.episodes-section .seasons-items').html(seasons);
	$('.episodes-section .episodes-items').html(episodes_1);
}

function selectItem(imdbID) {
	var item = window.items[imdbID];
	if(item.type == 'movie') {
		playMovie(item);
	} else if(item.type == 'tvshow') {
		selectTVShow(item);
	}
}

function selectSeason(_this) {
	$('.episodes-section .seasons-items .season-item.active').removeClass('active');
	$(_this).addClass('active');
	var imdbID = $('.episodes-section').attr('data-imdbID');
	var season = $(_this).find('a').attr('data-season');
	var item = window.items[imdbID];
	var episodes = '';
	$.each(item.episodes[season], function(episode, stream) {
		episodes += '<div class="episode-item' + (episode == 1 ? ' active' : '') + '"><a href="#" data-imdbID="' + item.imdbID + '" data-season="' + season + '" data-episode="' + episode + '" data-stream="' + stream + '">Episode ' + episode + '</a></div>';
	});
	$('.episodes-section .episodes-items').html(episodes);
}

function playEpisode(_this) {
	var imdbID = $(_this).find('a').attr('data-imdbID');
	var season = $(_this).find('a').attr('data-season');
	var episode = $(_this).find('a').attr('data-episode');
	var item = window.items[imdbID];
	var stream = item.episodes[season][episode];
	$('.main-section').fadeOut(300);
	$('.player-section').fadeIn(300);
	$('.page-section').fadeOut(300);
	$('.episodes-section').fadeOut(300);
	$('video').attr('src', stream);
}	

function playMovie(item) {
	var stream = item.stream;
	$('video').attr('src', stream);
	$('.main-section').fadeOut(300);
	$('.page-section').fadeOut(300);
	$('.player-section').fadeIn(300);
}

function goHome() {
	$('.main-section').fadeIn(300);
	$('.player-section').fadeOut(300);
	$('.page-section').fadeOut(300);
	$('.episodes-section').fadeOut(300);
	$('video').attr('src', '');
	$('.search-field input').val('');
}

function show404() {
	$('.main-section').fadeOut(300);
	$('.player-section').fadeOut(300);
	$('.page-section').fadeOut(300);
	$('.episodes-section').fadeOut(300);
	$('video').attr('src', '');
	$('.search-field input').val('');
	$('.404-page').fadeIn(300);
}

$(document).ready(function() {
	$('.search-field input').on('keydown', function(e) {
		if(e.keyCode == 13) {
			window.location.hash = '#!/search/' + encodeURIComponent($('.search-field input').val());
		}
	});
	$('.home-button img').click(function() {
		window.location.hash = '';
	});
	$('.search-results').on('click', '.play-button a', function(e) {
		var imdbID = $(this).attr('data-imdbID');
		window.location.hash = '#!/item/' + encodeURIComponent(imdbID);
		e.preventDefault();
		return false;
	});
	$('.episodes-section .seasons-items').on('click', '.season-item', function(e) {
		selectSeason(this);
		e.preventDefault();
		return false;
	});
	$('.episodes-section .episodes-items').on('click', '.episode-item', function(e) {
		playEpisode(this);
		e.preventDefault();
		return false;
	});
	$('.adblock-dismiss').click(function(e) {
		Cookies.set('pt_abD', 'true');
		$('.adblock-message-overlay').fadeOut(300);
		e.preventDefault();
		return false;
	});
	$(window).on('hashchange', function() {
		var hash = window.location.hash.substring(3).split('/');
		if(typeof hash[1] == 'undefined' || !hash[1]) { hash[1] = ''; }
		var type = hash[0];
		if(type == 'item') {
			var id = decodeURIComponent(hash[1]);
			if(typeof window.items[id] == 'undefined' || !window.items[id]) {
				$.get('http://api.popcorntimefree.info/content.php?query=' + id, function(items) {
					if(items.length < 1) {
						goHome();
						loadMovies();
						return;
					} else {
						item = items[0];
						item.type = !item.episodes || typeof item.episodes == 'undefined' ? 'movie' : 'tvshow';
						window.items[item.imdbID] = item;
						selectItem(id);
					}
				});
			} else {
				selectItem(id);
			}
			return;
		}
		if(type == 'search') {
			var query = decodeURIComponent(hash[1]);
			$('.search-field input').val(query);
			loadMovies();
			return;
		}
		goHome();
		loadMovies();
	});
	$(window).trigger('hashchange');
});