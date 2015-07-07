$(document).ready(function() {
	$('.load-more').on('click', function() {
		var page = parseInt($('.movies').attr('data-page'));
		var pages = parseInt($('.movies').attr('data-pages'));
		var au = $('.movies').attr('data-ajax-url');
		if(page < pages) {
			page++;
			if(page >= pages) { $('.load-more').fadeOut(300); }
			$('.load-more').html('Loading...').addClass('disabled');
			$.get(au + page, function(data) {
				$('.movies').append(data);
				$('.load-more').html('Load More').removeClass('disabled');
			});
		} else {
			$('.load-more').fadeOut(300);
		}
		$('.movies').attr('data-page', page);
	});
});