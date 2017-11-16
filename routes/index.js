var express = require('express');
var router = express.Router();
var fs = require('fs');
var mon = require('./../modules/mongodb');

/* Authentication and Authorization Middleware */
var auth = function(req, res, next) {
	if (req.session.log === 1) {
		return next();
	}
	else {
		return res.redirect('/');
	}
};
/**/
var nd = require('./../modules/non_dynamic')(router,mon,auth);

//Login Endpoint
router.get('/login', auth, function (req, res) {
  res.redirect("/");
});

//Register Endpoint
router.get('/register', auth, function (req, res) {
  res.redirect("/");
});


// Logout endpoint
router.get('/logout', function (req, res) {
	if (req.session.log === 1) {
		console.log("Logout : "+req.session.cred.email);
		req.session.destroy();
	}
	res.redirect('/');
});

/* Serve index files*/
router.get('/',function(req,res) {
	if (req.session && req.session.log === 1) {
		var sess = req.session;
		if(sess.cred.typ === 'em') {
			res.render('afterLoginEmployee.ejs',{data:sess,messages: req.flash('info')});
		}
		else if (sess.cred.typ === 'en') {
			res.render('afterLoginEntrepreneur.ejs',{data:sess,messages: req.flash('info')});
		}
		else if (sess.cred.typ === 'ex') {
			mon.exreq.find({"ques1":sess.cred.domain},function(err,ex){
				if(err) {throw err;}
				res.render('afterLoginExpert.ejs',{data:sess,messages: req.flash('info'),ques:ex});
			});
		}
	}
	else {
		res.render('index.ejs',{messages: req.flash('info')});
	}
});
router.get('/chatBody',auth,function(req,res){
	var sess = req.session;
	var q = req.query.id;
	mon.exreq.find({"ques1":sess.cred.domain},function(err,ex){
		mon.Users.findOne({"cred.email":ex[q].email},function(err,us){
			if(err) {throw err;}
			res.render('chatBody.ejs',{data:sess,messages: req.flash('info'),ques:ex[q],user:us});
		});
	});
});

//Dynamic Paths
router.get('/:dynamicroute', function(req,res) {
	var fetch = req.params.dynamicroute+'.ejs';
	if(fs.statSync('views/'+fetch)) {
		res.render(fetch, {data:req.session});
	}
	else {
		//console.log('File '+fetch+' not found.');
		res.status(404);
	}
});
module.exports = router;
