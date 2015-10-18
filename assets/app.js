window.onload = function() {
	app.start(jQuery);
};
var app = {};
app.start = function(jQuery) {
	window.$ = jQuery;
	app.pages = 1;
	app.page = 1;
	app.genre = 'All';
	app.query = '';
	app.store = {};
	app.clean_movies();
	app.load_movies(app.page, app.genre, app.query);
	app.attach_genre_click_event();
	app.attach_search_event();
	app.attach_hash_event();
};
app.show_loading = function() {
	$('.loading').fadeIn(300);
};
app.hide_loading = function() {
	$('.loading').fadeOut(300);
};
app.disable_infinite_scroll = function() {
	$('body').attr('data-noload', '1');
};
app.enable_infinite_scroll = function() {
	$('body').attr('data-noload', '0');
};
app.can_infinite_scroll = function() {
	return $('body').attr('data-noload') != '1';
};
app.clean_movies = function() {
	$('.movies').html('');
};
app.push_movie_into_store = function(mID, callback) {
	$.get('https://browserpopcorn.xyz/api/movies/all/1?query=' + mID, function(data) {
		$.each(data, function(i, item) {
			app.store[item.imdbID] = item;
			if (typeof callback != 'undefined') {
				callback();
			}
		});
	});
};
app.attach_hash_event = function() {
	var hash = document.location.hash;
	if (hash != '') {
		if (hash.split('/')[1] == 'movie') {
			var mID = hash.split('/')[2];
			if (typeof app.store[mID] == 'undefined') {
				app.push_movie_into_store(mID, function() {
					app.show_movie(mID);
				});
			} else {
				app.show_movie(mID);
			}
		}
	}
};
app.set_hash_location = function(loc) {
	document.location.hash = '#/' + loc;
}
app.attach_genre_click_event = function() {
	$('.sidebar').on('click', 'a', function() {
		$('.sidebar a.active').removeClass('active');
		$(this).addClass('active');
		var genre = $(this).html();
		if (genre == 'Popular') {
			genre = 'All';
		}
		app.genre = genre;
		app.page = 1;
		app.clean_movies();
		app.load_movies(app.page, app.genre, app.query);
	});
};
app.attach_search_event = function() {
	$('input').on('keyup', function(e) {
		if (e.keyCode != 13) {
			return;
		}
		app.query = $(this).val();
		app.page = 1;
		app.clean_movies();
		app.load_movies(app.page, app.genre, app.query);
	});
};
app.play_video = function(id) {
	app.playing = true;
	var movie = app.store[id];
	var subtitles = '';
	$.each(movie.Subtitles, function(i, subtitle) {
		var lang = subtitle.language;
		var srclang = subtitle.language.toLowerCase().replace(' ', '-');
		var url = subtitle.url;
		var str_default = '';
		if(srclang == 'english') {
			str_default = ' default';
		}
		subtitles += '<track kind="captions" src="' + url + '" srclang="' + srclang + '" label="' + lang + '"' + str_default + '>';
	});
	$('.video-wrapper').html('<video width="640" height="360" class="video video-js vjs-skin-default vjs-big-play-button" controls><source src="' + movie.Video + '" type="video/mp4">' + subtitles + '</video>');
	$('.player').fadeIn(300);
	videojs($('.video')[0], {
		width: $('.player').innerWidth(),
		height: $('.player').innerHeight()
	}, function() {
		this.play();
	});
	$('.player .close').click(function() {
		app.hide_player();
	});
};
app.hide_player = function() {
	if (app.playing) {
		videojs($('.video')[0]).dispose();
	}
	$('.player').fadeOut(300);
	app.playing = false;
};
app.attach_movie_click_event = function() {
	$('.movies').on('click', '.movie', function() {
		var id = $(this).attr('data-id');
		app.show_movie(id);
	});
	$('.single .close').click(function() {
		app.set_hash_location('');
		$('.single').removeClass('active');
		$('.single-darken').fadeOut(300);
	});
	$('.single .watch-button').click(function() {
		app.play_video($(this).attr('data-id'));
		$('.single .close').click();
		return;
	})
};
app.show_movie = function(id) {
	var movie = app.store[id];
	app.set_hash_location('movie/' + id);
	$('.single .poster img').attr('src', movie.Poster);
	$('.single .watch-button').attr('data-id', id);
	$('.single .title').html(movie.Title);
	$('.single .year').html(movie.Year);
	$('.single .plot p').html(movie.Plot);
	$('.single').addClass('active');
	$('.single-darken').fadeIn(300);
	app.hide_player();
};
app.attach_scroll_handler = function(callback) {
	$('.main').on('scroll', function() {
		if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
			if (typeof callback != 'undefined') {
				callback();
			}
		}
	});
};
app.infinite_scroll = function() {
	if (!app.can_infinite_scroll()) {
		return;
	}
	app.page++;
	if (app.page >= 50) {
		return;
	}
	app.load_movies(app.page, app.genre, app.query);
};
app.load_movies = function(page, genre, query) {
	app.show_loading();
	app.hide_player();
	app.disable_infinite_scroll();
	var url = 'https://browserpopcorn.xyz/api/movies/' + genre.toLowerCase() + '/' + page;
	if(query != '') {
		url += '?query=' + query;
	}
	$.get(url, function(data) {
		$.each(data, function(i, item) {
			app.store[item.imdbID] = item;
			$('.movies').append('<div class="movie hidden" data-id="' + item.imdbID + '"><div class="poster"><div class="eye"><i class="fa fa-eye"></i></div><img src="' + item.Poster + '" /></div><div class="title">' + item.Title + '</div><div class="year">' + item.Year + '</div></div>');
			$('.movie[data-id="' + item.imdbID + '"]').hide();
			$('<img />').attr('src', item.Poster).load(function() {
				$('.movie[data-id="' + item.imdbID + '"]').show();
				setTimeout(function() {
					$('.movie[data-id="' + item.imdbID + '"]').removeClass('hidden');
					if (i == data.length - 1) {
						app.enable_infinite_scroll();
					}
				}, (i + 1) * 50);
			});
		});
		app.hide_loading();
		//app.attach_scroll_handler(app.infinite_scroll);
		app.attach_movie_click_event();
	});
};