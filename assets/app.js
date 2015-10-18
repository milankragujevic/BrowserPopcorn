document.addEventListener('DOMContentLoaded', function() {
    var load_movies = function() {
		$('.movies').html('');
		$('.loading').fadeIn(300);
		var url = 'https://browserpopcorn.xyz/api/movies/' + window.genre.toLowerCase() + '/1';
		if(window.query != '') {
			url += '?query=' + query;
		}
		$.get(url, function(data) {
			$('.loading').fadeOut(300);
			$.each(data, function(i, item) {
				window.store[item.imdbID] = item;
				$('.movies').append('<div class="movie hidden" data-id="' + item.imdbID + '"><div class="poster"><div class="eye"><i class="fa fa-eye"></i></div><img src="' + item.Poster + '" /></div><div class="title">' + item.Title + '</div><div class="year">' + item.Year + '</div></div>');
				setTimeout(function() {
					$('.movie[data-id="' + item.imdbID + '"]').removeClass('hidden');
				}, (i + 1) * 150);
			});
		}).fail(function() {
			$('.error-loading-data').fadeIn(300);
			resize_dialog();
			$('.loading').fadeOut(300);
		});
	};
	var resize_dialog = function() {
		$('.dialog').each(function() {
			var ml = $(this).find('.dialog-contents').width() / 2;
			var mt = $(this).find('.dialog-contents').height() / 2;
			$(this).find('.dialog-contents').css({marginLeft: (-1) * ml, marginTop: (-1) * mt});
		});
	};
	var load_movie = function(id) {
		var movie = window.store[id];
		$('.single .poster img').attr('src', movie.Poster);
		$('.single .watch-button').attr('data-id', id);
		$('.single .title').html(movie.Title);
		$('.single .year').html(movie.Year);
		$('.single .plot p').html(movie.Plot);
		$('.single').addClass('active');
		$('.single-darken').fadeIn(300);
	};
	$(document).ready(function() {
		window.debug = window.location.hostname == 'localhost';
		window.genre = 'all';
		window.query = '';
		window.store = {};
		resize_dialog();
		load_movies();
		setTimeout(function() {
			if(!window.debug) { $('.advertisement').fadeIn(300); }
		}, 3000);
		$('.advertisement .close').click(function() {
			$('.advertisement').fadeOut(300);
		});
		$('.dialog .close').click(function() {
			$(this).parent().parent().fadeOut(300);
		});
		$('input').on('keyup', function(e) {
			if(e.keyCode == 13) {
				window.query = $(this).val();
				load_movies();
			}
		});
		$('.sidebar a').click(function() {
			$('.sidebar a.active').removeClass('active');
			$(this).addClass('active');
			window.genre = $(this).html().toLowerCase();
			if(window.genre == 'popular') { window.genre = 'all'; }
			load_movies();
		});
		$('.movies').on('click', '.movie', function() {
			var id = $(this).attr('data-id');
			load_movie(id);
		});
		$('.single .close').click(function() {
			$('.single').removeClass('active');
			$('.single-darken').fadeOut(300);
		});
		$('.single .watch-button').click(function() {
			var id = $(this).attr('data-id');
			var movie = window.store[id];
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
			$('.single .close').click();
		});
		$('.player .close').click(function() {
			videojs($('.video')[0]).dispose();
			$('.player').fadeOut(300);
		});
	});
}, false);