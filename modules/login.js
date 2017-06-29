var bcrypt = require('bcrypt'); // Crypto
var session = require('express-session'); //Session

module.exports = function(app,mon) {
/* Serve login requests at http://localhost/login */
app.post('/login',function(req,res){
  var em = req.body.email;
  var pw = req.body.password;
		mon.Users.findOne({"cred.email": em}, function(err, user) {
				if(user) {
					var afterHash = user.cred.pwd;
					if (err) {
						throw err;
					}
					if(bcrypt.compareSync(pw, afterHash)) {
							req.session.cred = user.cred;
							req.session.did = user._id;
							req.session.log = 1;
							res.redirect('/');
					}
					else {
						req.flash('info', 'pw');
						res.redirect('/');
					}
				}
				else {
					req.flash('info', 'pw');
					res.redirect('/');
				}
		});
	});
 }
