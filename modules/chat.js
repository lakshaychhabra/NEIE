var mon = require('./mongodb.js');
module.exports = function(app) {

// var http = require('http').Server(app);
var io = require('socket.io')(app);

io.on('connection', function(socket){
  socket.on('message', function(sender,receiver, message){
    if(!sender) {
      mon.message.find({}, function(err,mes){
        if(err) {console.log(err);}
        else {
          for(i=0;i<mes.length;i++) {
            io.emit('message', mes[i].sender, mes[i].receiver, mes[i].message);
          }
        }
      });
    }
    else {
    //Immediate Notification fetch
    io.emit('message', sender, receiver, message);
      //Code to save data to MongoDB.
        var mess = new mon.message({
              sender: sender,
              receiver: receiver,
              message: message
          });
      mess.save(function(error) {if (error) {res.send(error);}});
    }
    });
  });
}
