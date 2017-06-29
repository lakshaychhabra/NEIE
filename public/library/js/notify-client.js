var socket = io();

$(document).ready(function () {
  /* Fetching of Notification */
 socket.on('notification', function(sender,activity, receiver){
    /* Who will get the notif */
    var xd = $('#xd').val();
	if( xd == receiver ) {
		display(sender, activity, receiver);
    }
  });
  socket.on('confirm', function(sender,activity, receiver){
    /* Who will get the notif */
    var xd = $('#xd').val();
	if( xd == receiver ) {
		display_args(sender, activity, receiver);
    }
  });

$('.notification-button').click(function() {
    $('.notification-button').css("color","rgb(173,173,173)");
	//socket.emit('fetch');
	//socket.emit('read');
  });
  function display(sender, activity, receiver) {
      $('.notification-button').css("color","#2eccfa");
	  $('.notification-pannel').append("<a href='/profile?id="+sender+"'><div class='notification-item-btn'>"+sender+" "+activity+"<br><a href='' class='btn btn-success' onclick=\"fire_confirm(\'"+receiver+"\',\'"+activity+"\',\'"+sender+"\')\"><i class='fa fa-check-circle-o'></i>Approve</a><a href='' class='btn btn-danger'><i class='fa fa-times-circle-o'></i>Decline</a></div></div></a>");
      $('.notif').fadeIn();
    }
	function display_args(sender, activity, receiver) {
		$('.notification-pannel').append("<a href='/profile?id="+sender+"'><div class='notification-item-btn'>"+sender+" "+activity+"<br></div></div></a>");
		$('.notif').fadeIn();
	}
});

/* Miscellaneous Functions */

function fire_project(poster,pid,applier) {
  socket.emit('notification', applier, pid, poster);
  alert('Application submitted to project head for approval.');
}
function fire_confirm(sender,activity,receiver) {
	socket.emit('confirm', sender, activity, receiver);
}
function fire_confirm_proj(sender,activity,receiver) {
	socket.emit('confirm-project', sender, activity, receiver);
}