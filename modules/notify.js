var mon = require('./mongodb.js');
var mail = require('./email.js');
module.exports = function(http) {

// var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  /* Completed-project Scripts */
  socket.on('confirm-project',function(sender,activity,receiver){
	io.emit('confirm', sender, activity, receiver);
	mon.cproj.findOne({'email':sender},function(err,projects){
		if(err) {
			throw err;
		}
		else {
			if(!projects) {
				var proj = new mon.cproj ({
					email: sender,
					nopp: 1
				});
				proj.save(function(err){if(err){throw err}});
			}
			else {
				var proj = new mon.cproj({
					email: sender,
					nopp: projects.nopp++
				});
				mon.cproj.remove({"email":sender},function(err) {
					if(err) {
						throw err;
					}
				});
				proj.save(function(err){if(err){throw err}});
			}
		}
		
	});
  });
  /* Notification Scripts */
  socket.on('fetch', function() {
	mon.notify.find({}, function(err,not){
        if(err) {console.log(err);}
        else {
          for(i=0;i<not.length;i++) {
            io.emit('notification', not[i].sender, not[i].action, not[i].receiver);
          }
        }
      });
  });
  socket.on('read',function(receiver) {
	  mon.notify.find({"status":0}, function(err,not){
		for(i=0;i<not.length;i++) {
			if(not[i].receiver===receiver){
			mon.notify.update({status: 1},function(err, count) {
				if (err) return next(err);
					callback(err, count);
				});
			}
		}
	  });
  });
  /* confirm project */
  socket.on('confirm',function(sender,activity,receiver) {
	io.emit('confirm', sender, activity, receiver);
    mail(sender, receiver, sender+" "+activity);
      //Code to save data to MongoDB.
        var notification = new mon.notify({
              sender: sender,
              receiver: receiver,
              action: activity,
              status: 1
          });
      notification.save(function(error) {if (error) {res.send(error);}});
	  mon.projects.findOne({"_id":activity},function(err,pro){
		  if(err) {
			throw err;
		  }
		  else {
			var proj = mon.myproj({
				email: receiver,
				projid: pro._id
			});
			proj.save(function(error) {if(err){throw err;}});
		  }
	  });
	  var feed = new mon.feedback({
		empemail : receiver,
		entremail : sender,
		comments : "",
		rating : ""
	  });
	  feed.save(function(error) {if (error) {res.send(error);}});
  });
  /* general notification */
  socket.on('notification', function(sender,activity,receiver){
    //Immediate Notification fetch
    io.emit('notification', sender, activity, receiver);
    mail(sender, receiver, sender+" "+activity);
      //Code to save data to MongoDB.
        var notification = new mon.notify({
              sender: sender,
              receiver: receiver,
              action: activity,
              status: 0
          });
      notification.save(function(error) {if (error) {res.send(error);}});
    });
    /* Chat Scripts */
    socket.on('message', function(sender,receiver, message, fullname){
      if(!sender) {
        /*mon.message.find({}, function(err,mes){
          if(err) {console.log(err);}
          else {
            for(i=0;i<mes.length;i++) {
              io.emit('message', mes[i].sender, mes[i].receiver, mes[i].message, mes[i].fullname);
            }
          }
        });*/
      }
      else {
      //Immediate Message fetch
      io.emit('message', sender, receiver, message, fullname);
        //Code to save data to MongoDB.
          var mess = new mon.message({
                sender: sender,
                receiver: receiver,
                message: message,
				fullname: fullname
            });
        mess.save(function(error) {if (error) {res.send(error);}});
      }
      });
  });
}
