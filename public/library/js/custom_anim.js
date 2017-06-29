$(document).ready(function() {
	$('.arch-box').click(function() {
		$('.ns-bar').focus();
	});
	$('#search').submit(function(e) {
				e.preventDefault();
				var query = $('.ns-bar').val();
				$('#mainView').load('/search?q='+query);
	});
	$('.logo').click(function(){
		window.location.href="/";
	});
});