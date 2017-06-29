var socket = io();
var curr_user;
$(document).ready(function () {
   curr_user = $('#xdi').val();
   socket.emit('message',"","","");
   socket.on('message', function(sender,receiver, message, fullname){
    /* Who will get the message */
    // alert(sender+" sent "+message+" to "+receiver);
    if(curr_user==receiver) {
        startChat(sender,fullname);
        $("#chatbox_"+sender+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+message+'</span></div>');
    }
  });
});
function startChat(boxUser,fullname) {
  createBox(boxUser,fullname);
  $("#chatbox_"+boxUser+" .chatboxtextarea").focus();
}

function createBox(boxUser,fullname) {
  if($("#chatbox_"+boxUser).length == 0) {
	var fn = $("#xdf").val();
    var box = '<div id="chatbox_'+boxUser+'" class="chatbox" ><div class="chatboxhead" onclick="resizeBox(\''+boxUser+'\')"><div class="chatboxtitle">'+fullname+'</div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="closeBox(\''+boxUser+'\')">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="javascript:return checkChatBoxInputKey(event,this,\''+boxUser+'\',\''+fn+'\');"></textarea></div></div>';
    $('.chatBar').append(box);
  }
  else {
    $("#chatbox_"+boxUser+" .chatboxtextarea").focus();
  }
}

function resizeBox(boxUser) {
    if($("#chatbox_"+boxUser+" .chatboxcontent").css("display")=="none") {
      $("#chatbox_"+boxUser+" .chatboxcontent").show();
      $("#chatbox_"+boxUser+" .chatboxinput").show();
      $("#chatbox_"+boxUser+" .chatboxtextarea").focus();
    }
    else {
      $("#chatbox_"+boxUser+" .chatboxcontent").hide();
      $("#chatbox_"+boxUser+" .chatboxinput").hide();
    }
}

function closeBox(boxUser) {
  $("#chatbox_"+boxUser).detach();
}

function checkChatBoxInputKey(event,chatboxtextarea,receiver,fullname) {
  if(event.keyCode == 13 && event.shiftKey == 0)  {
	   message = $(chatboxtextarea).val();
	 	 message = message.replace(/^\s+|\s+$/g,"");
	   $(chatboxtextarea).val('');
	   $(chatboxtextarea).focus();
	   $(chatboxtextarea).css('height','44px');
	   if (message != '') {
		     message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
         fire_message(curr_user,receiver,message, fullname);
        $("#chatbox_"+receiver+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessageby">'+message+'</span></div>');
 				$("#chatbox_"+receiver+" .chatboxcontent").scrollTop($("#chatbox_"+receiver+" .chatboxcontent")[0].scrollHeight);
    }
	 return false;
	}
}

function fire_message(sender,receiver,message, fullname) {
  socket.emit('message', sender, receiver, message, fullname);
}
