var bcrypt = require('bcrypt'); // Crypto
module.exports = function(app,mon) {
/* Serve login requests at http://localhost/register */
app.post('/register',function(req,res){
	var dat = req.body;
	var pw = dat.createpwd;
	if(!req.body.eMail || !req.body.phone || !pw) {
			req.flash('info', 'fe');
			res.redirect('/');
	}
	else {
		mon.Users.findOne({"cred.email":req.body.eMail}, function(err, user) {
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
							firstName: req.body.fName,
							lastName: req.body.lName,
							orgName: req.body.oName,
							email: req.body.eMail,
							pwd: pwh,
							typ: req.body.typ,
							webs: req.body.web,
							mobile: req.body.phone
						}
					});
					}
					else if(dat.typ === "ex") {
					var User = new mon.Users({
						cred: {
							firstName: req.body.fName,
							lastName: req.body.lName,
							email: req.body.eMail,
							pwd: pwh,
							typ: req.body.typ,
							domain: req.body.domain,
							mobile: req.body.phone
						}
					});
					}
					else {
						var User = new mon.Users({
							cred: {
								orgName: req.body.oName,
								email: req.body.eMail,
								pwd: pwh,
								typ: req.body.typ,
								webs: req.body.web,
								mobile: req.body.phone,
								emp:req.body.empl
						}
					});
					}
					User.save(function(error) {
						if (error) {
							res.send(error);
						}
						else {
							mon.Users.findOne({"cred.email": req.body.eMail}, function(err, u) {
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
					// console.log("new register");
				}
			}
			else {
				req.flash('info', 'ue');
				res.redirect('/');
				// console.log("new register");
			}
		});
	}
});
}
