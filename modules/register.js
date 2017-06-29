var bcrypt = require('bcrypt'); // Crypto
module.exports = function(app,mon) {
/* Serve login requests at http://localhost/register */
app.post('/register',function(req,res){
	var dat = req.body;
	var fn = dat.fName;
	var ln = dat.lName;
	var on = dat.oName;
	var em = dat.eMail;
	var mob = dat.phone;	
	var pw = dat.createpwd;
	if(!em || !mob || !pw) {
			req.flash('info', 'fe');
			res.redirect('/');
	}
	else {
		mon.Users.findOne({"cred.email":em}, function(err, user) {
			if (err) {throw err;}
			if(!user) {
				/* Password Matching */
				var pw_cr = dat.createpwd;
				var pw_co = dat.confirmpwd;
				/* Body password parsing */
				if(pw_cr === pw_co) {
					var pwh = bcrypt.hashSync(dat.createpwd, 10);
					if((dat.typ === "em") || (dat.typ === "en" && dat.man === "self")) {
					var User = new mon.Users({
						cred: {
							firstName: fn,
							lastName: ln,
							orgName: on,
							email: em,
							pwd: pwh,
							typ: req.body.typ,
							webs: req.body.web,
							mobile: mob		                  
						}
					});
					}
					else if(dat.typ === "ex") {
					var User = new mon.Users({
						cred: {
							firstName: fn,
							lastName: ln,
							email: em,
							pwd: pwh,
							typ: req.body.typ,
							domain: req.body.domain,
							mobile: mob		                  
						}
					});
					}
					else {
						var User = new mon.Users({
							cred: {
								orgName: dat.oName,
								email: dat.eMail,
								pwd: pwh,
								typ: dat.typ,
								webs: dat.web,
								mobile: dat.phone,
								emp:dat.empl
						}
					});
					}
					User.save(function(error) {
						if (error) {
							res.send(error);
						}
						else {
							mon.Users.findOne({"cred.email": em}, function(err, u) {
								if(err) {
									throw err;
								}
								else {
									req.session.cred = u.cred;
									req.flash('info', 'ss');
									req.session.log = 1;
									res.redirect('/');
								}
							});
							//req.flash('info', 'ss');
							//res.redirect('/');
							//console.log("new register");
						}
					});
				}
				else {
					req.flash('info', 'pm');
					res.redirect('/');
					console.log("new register");
				}
			}
			else {
				req.flash('info', 'ue');
				res.redirect('/');
				console.log("new register");
			}
		});
	}
});
}
