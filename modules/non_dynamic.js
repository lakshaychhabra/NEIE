module.exports = function(router, mon, auth) {
    var tier = require('./tier.js');
    /*Dynamic Global Profile Handling */
    router.get('/profile', auth, function(req, res) {
        var email = req.query.id;
        if (!email) {
            email = req.session.cred.email;
        }
        console.log(tier(email));

        mon.Users.findOne({ "cred.email": email }, function(err, user) {
            var type = user.cred.typ;
            /* Entrepreneur Profiles */
            if (type === "en") {
                mon.enProfile.findOne({ "email": email }, function(err, profile) {
                    if (err) {
                        throw err;
                    } else {
                        if (!profile) {
                            res.render('profile.ejs');
                        } else {
                            res.render('profile.ejs', { data: profile, tier: score });
                        }
                    }

                });
            }
            /* Employee profiles */
            else {
                mon.profiles.findOne({ "email": email }, function(err, prof) {
                    if (err) { throw err; }

                    if (!prof) {
                        var cred = user.cred;
                        res.send(cred.email);
                    } else {
                        var cred = user.cred;
                        // score = tier(cred.email);
                        res.render('employeeCVdisplay.ejs', { data: { cred, prof } });
                    }
                });
            }
        });
    });
    /* Search */
    router.get('/search', function(req, res) {
        var query = req.query.q;
        if (!query) {
            res.render('searchNotFound.ejs', { data: "No query Submitted" });
        } else {
            var results = {
                projects: [],
                profiles: [],
                queries: []
            };
            /* Profiles with matching Skillset */
            mon.profiles.find({}, function(err, prof) {
                if (err) { throw err; }
                for (i = 0; i < prof.length; i++) {
                    for (j = 0; j < prof[i].langs.length; j++) {
                        if (query.toUpperCase() === prof[i].langs[j].name.toUpperCase()) {
                            var info = {
                                fn: prof[i].firstName,
                                ln: prof[i].lastName,
                                email: prof[i].email,
                                skills: prof[i].langs
                            };
                            results.profiles.push(info);
                        }
                    }
                }
                /* Projects with matching skill set */
                mon.projects.find({}, function(err, proj) {
                    if (err) { throw err; }
                    for (i = 0; i < proj.length; i++) {
                        for (j = 0; j < proj[i].skillsrequired.length; j++) {
                            if (query.toUpperCase() === proj[i].skillsrequired[j].name.toUpperCase()) {
                                results.projects.push(proj[i]);
                            }
                        }
                    }
                    mon.queries.find({}, function(err, quer) {
                        if (err) { throw err; }
                        for (i = 0; i < quer.length; i++) {
                            if (query.toUpperCase() === quer[i].domain.toUpperCase()) {
                                results.queries.push(quer[i]);
                            }
                        }
                        //res.send(results.projects+" "+results.profiles);
                        if ((!results.projects[0]) && (!results.profiles[0]) && (!results.queries[0])) {
                            res.render('searchNotFound.ejs', { data: query });
                        } else {
                            res.render('search.ejs', { data: results, cred: req.session.cred });
                        }
                    });
                });
            });
        }
    });
    /* My Queries */
    router.get('/myQueries', auth, function(req, res) {
        var email = req.session.cred.email;
        mon.queries.find({ "email": email }, function(err, queries) {
            if (err) {
                throw err;
            } else {
                res.render('myQueries.ejs', { data: queries });
            }
        });
    });
    /* My jobs */
    router.get('/myJob', auth, function(req, res) {
        var email = req.session.cred.email;
        mon.jobdb.find({ "email": email }, function(err, jobdb) {
            if (err) {
                throw err;
            } else {
                res.render('myJob.ejs', { data: jobdb });
            }
        });
    });

    /* Dynamic Queries */
    router.get('/queries', function(req, res) {
        var id = req.query.id;
        mon.queries.findOne({ "_id": id }, function(err, query) {
            if (err) {
                throw err;
            } else {
                mon.answers.find({ "qid": id }, function(err, ans) {
                    if (err) {
                        throw err;
                    } else {
                        res.render('queries.ejs', { ques: query, answers: ans });
                    }
                });
            }
        });
    });
    router.get('/myProjects', function(req, res) {
        if (req.session.cred.typ === "em") {
            mon.myproj.find({ "email": req.session.cred.email }, function(err, myproj) {
                if (err) {
                    throw err;
                } else {
                    for (i = 0; i < myproj.length; i++) {
                        mon.projects.find({ "_id": myproj[i].projid }, function(err, projs) {
                            if (err) {
                                throw err;
                            } else {
                                res.render('myProjectsEmp.ejs', { data: projs });
                            }
                        });
                    }
                }
            });
        } else if (req.session.cred.typ === "en") {
            var email = req.session.cred.email;
            mon.projects.find({ "email": email }, function(err, projects) {
                if (err) {
                    throw err;
                } else {
                    res.render('myProjectsEntre.ejs', { data: projects });
                }
            });
        }
    });

    router.get('/feed', function(req, res) {
        mon.feedback.find({ "entremail": req.session.cred.email }, function(err, feed) {
            if (err) {
                throw err;
            } else {
                res.render('entreFeedback.ejs', { data: feed });
            }
        });
    });


}