document.addEventListener('DOMContentLoaded', function() {
    var load_movies = function() {
        $('.movies').html('');
        $('.loading').fadeIn(300);
        var url = 'https://api.browserpopcorn.xyz/movies/' + window.genre;
        if (window.query != '') {
            url += '?query=' + query;
        }
        $.get(url, function(data) {
            $('.loading').fadeOut(300);
            $.each(data, function(i, item) {
                if (typeof item.release_date == 'undefined') {
                    return;
                }
                window.store[item.id] = item;
                $('.movies').append('<div class="movie hidden" data-id="' + item.id + '"><div class="poster"><div class="eye"><i class="fa fa-eye"></i></div><img src="' + item.poster_path + '" /></div><div class="title">' + item.title + '</div><div class="year">' + item.release_date.split('-')[0] + '</div></div>');
                setTimeout(function() {
                    $('.movie[data-id="' + item.id + '"]').removeClass('hidden');
                }
                , (i + 1) * 150);
            }
            );
        }
        ).fail(function() {
            alert('Error loading data...');
            $('.loading').fadeOut(300);
        }
        );
    }
    ;
    var load_movie = function(id) {
        var movie = window.store[id];
        if (typeof movie.release_date == 'undefined') {
            return;
        }
        $('.single .poster img').attr('src', movie.poster_path);
        $('.single .watch-button').attr('data-id', id);
        $('.single .imdb-button').attr('href', 'http://www.imdb.com/title/' + movie.imdb_id + '/');
        $('.single .title').html(movie.title);
        $('.single .year').html(movie.release_date.split('-')[0]);
        $('.single .plot p').html(movie.overview);
        $('.single').addClass('active');
        $('.single-darken').fadeIn(300);
    }
    ;
    $(document).ready(function() {
        window.genre = 'all';
        window.query = '';
        window.store = {};
        load_movies();
        setTimeout(function() {
            $('.advertisement').fadeIn(300);
        }
        , 3000);
        $('.advertisement .close').click(function() {
            $('.advertisement').fadeOut(300);
        }
        );
        $('input').on('keyup', function(e) {
            if (e.keyCode == 13) {
                window.query = $(this).val();
                load_movies();
            }
        }
        );
        $('.sidebar a').click(function() {
            $('.sidebar a.active').removeClass('active');
            $(this).addClass('active');
            window.genre = $(this).attr("data-genre");
            if (window.genre == 'popular') {
                window.genre = 'all';
            }
            load_movies();
        }
        );
        $('.movies').on('click', '.movie', function() {
            var id = $(this).attr('data-id');
            load_movie(id);
        }
        );
        $('.single .close').click(function() {
            $('.single').removeClass('active');
            $('.single-darken').fadeOut(300);
        }
        );
        $('.single .watch-button').click(function() {
            var id = $(this).attr('data-id');
            var movie = window.store[id];
            $('.video-wrapper').html('<video width="640" height="360" class="video video-js vjs-default-skin vjs-big-play-centered" controls autoplay preload><source src="' + movie.video_url + '" type="video/mp4"></video>');
            $('.player').fadeIn(300);
            videojs($('.video')[0], {
                width: $('.player').innerWidth(),
                height: $('.player').innerHeight()
            }, function() {
                this.play();
            }
            );
            $('.single .close').click();
        }
        );
        $('.player .close').click(function() {
            videojs($('.video')[0]).dispose();
            $('.player').fadeOut(300);
        }
        );
    }
    );
}
, false);