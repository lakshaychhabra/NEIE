module.exports = function(app, mon) {
    app.post('/feedback', function(req, res) {
        mon.feedback.findOne({ 'email': req.body.empem }, function(err, feeds) {
            if (err) {
                throw err;
            } else {
                var feed = new mon.feedback({
                    empemail: req.body.empem,
                    entremail: req.session.cred.email,
                    comments: req.body.feed,
                    rating: req.body.rate
                });
                feed.save(function(err) { if (err) { throw err } });
                res.redirect('/');
            }
        });
    });

    /* Project Save */
    app.post('/project-save', function(req, res) {
        var typejob = req.body.tjob;
        var djob = req.body.desjob;
        var pname = req.body.proname;
        var srequired = [];
        var pdescribe = req.body.despro;
        var pri = req.body.inr;
        var dur = req.body.dur;

        var limit_skill = req.body.limit_skill;
        if (limit_skill > 1) {
            for (i = 0; i < limit_skill; i++) {
                srequired[i] = {
                    name: req.body.skills[i]
                };
            }
        } else {
            srequired = {
                name: req.body.skills
            }
        }
        var proj = new mon.projects({
            email: req.session.cred.email,
            typeofjob: typejob,
            describejob: djob,
            projectname: pname,
            skillsrequired: srequired,
            projectdescribe: pdescribe,
            price: pri,
            duration: dur
        });
        proj.save(function(error) {
            if (error) {
                res.send(error);
            } else {
                res.redirect('/#/postProject');
                console.log('Form Submitted');
            }
        });
    });
    /* Entrepreneur Profile Save */
    app.post('/en-profile-save', function(req, res) {
        var porgName = req.body.orgName;
        var pfullName = req.body.repName;
        var paboutUs = req.body.about;
        var pvision = req.body.vision;
        var pcorpHQ = req.body.hqloc;
        var pfoundOn = req.body.fDate;
        var piType = req.body.itype;

        var prof = new mon.enProfile({
            email: req.session.cred.email,
            orgName: porgName,
            fullName: pfullName,
            aboutUs: paboutUs,
            vision: pvision,
            foundOn: pfoundOn,
            corpHQ: pcorpHQ,
            iType: piType
        });
        prof.save(function(error) {
            if (error) {
                res.send(error);
            } else {
                res.redirect('/#/editEntreProfile');
                console.log('Form Submitted');
            }
        });
    });
    /* dummy testing purposes */
    app.post('/dummy-post', function(req, res) {
        res.send(req.body.dum[0]);
    });
    /* Expert Question */
    app.post('/ex-req-save', function(req, res) {
        var post = req.body;
        var query = new mon.exreq({
            email: req.session.cred.email,
            ques1: post.domain,
            ques2: post.ques4,
            ques3: post.ques2,
            ques4: post.ques3
        });
        query.save(function(error) {
            if (error) {
                res.send(error);
            } else {
                res.redirect('/');
                console.log('Expert Query Requested.');
            }
        });
    });
    /* Query Post */
    app.post('/query-post', function(req, res) {
        var post = req.body;
        var query = new mon.queries({
            email: req.session.cred.email,
            domain: post.domain,
            desc: post.desc,
            expec: post.expec
        });
        query.save(function(error) {
            if (error) {
                res.send(error);
            } else {
                res.redirect('/');
                console.log('Query Posted');
            }
        });
    });
    /* Answer to above Query */
    app.post('/df-answer', function(req, res) {
        var post = req.body;
        var qid = post.qid;
        var txt = post.txt;
        var answer = new mon.answers({
            email: req.session.cred.email,
            qid: qid,
            txt: txt
        });
        answer.save(function(error) {
            if (error) {
                res.send(error);
            } else {
                res.redirect('/');
                console.log('Answer Posted');
            }
        });
    });

    /* Profile Save */
    app.post('/profile-save', function(req, res) {
        /* basic data */
        var intro = req.body.intro;
        var fatherName = req.body.fatherName;
        var address = req.body.addr1 + " " + req.body.addr2 + " " + req.body.addr3;
        var site = req.body.web;
        var lin = req.body.lin;
        var twit = req.body.twit;

        /* array declares */
        var workex = [];
        var skill = [];
        var edu = [];
        var lang = [];
        var cert = [];
        var ref = [];

        /* respective counter data */
        var limit_input = req.body.limit_input;
        var limit_skill = req.body.limit_skill;
        var limit_edu = req.body.limit_edu;
        var limit_lang = req.body.limit_lang;
        var limit_cert = req.body.limit_cert;
        var limit_ref = req.body.limit_ref;

        /* dynamic data */
        // Input
        for (i = 0; i < limit_input; i++) {
            workex[i] = {
                jtitle: req.body.job_ip[i],
                company: req.body.company_ip[i],
                dfrom: req.body.startDate_ip[i],
                dto: req.body.endDate_ip[i]
            };
        }
        // Skill
        for (i = 0; i < limit_skill; i++) {
            skill[i] = {
                name: req.body.skill[i]
            };
        }
        // Edu
        for (i = 0; i < limit_edu; i++) {
            edu[i] = {
                inst: req.body.job_ed[i],
                course: req.body.course_ed[i],
                score: req.body.startDate_ed[i],
                pass: req.body.endDate_ed[i]
            };
        }
        // Langs
        for (i = 0; i < limit_lang; i++) {
            lang[i] = {
                name: req.body.lang[i]
            };
        }
        // Certs
        for (i = 0; i < limit_cert; i++) {
            cert[i] = {
                name: req.body.job_cert[i],
                dfrom: req.body.startDate_cert[i]
            };
        }
        // References
        for (i = 0; i < limit_ref; i++) {
            ref[i] = {
                name: req.body.rname[i],
                profile: req.body.jobprofile[i],
                org: req.body.company_ref[i],
                mob: req.body.phone_ref[i]
            };
        }

        var proj = new mon.profiles({
            email: req.session.cred.email,
            firstName: req.session.cred.firstName,
            lastName: req.session.cred.lastName,
            intro: intro,
            fatName: fatherName,
            addr: address,
            webs: site,
            lin: lin,
            twit: twit,
            wex: workex,
            skills: skill,
            edu: edu,
            langs: lang,
            certs: cert,
            refers: ref
        });
        proj.save(function(error) {
            if (error) {
                res.send(error);
            } else {
                res.redirect('/');
                console.log('Profile Updated');
            }
        });
    });
    app.post('/job-save', function(req, res) {
        var email = req.session.cred.email;
        var text1i = req.body.texts1;
        var text2i = req.body.texts2;
        var text3i = req.body.texts3;
        var text4i = req.body.texts4;
        var text5i = req.body.texts5;
        var jobs = new mon.jobdb({
            email: email,
            text1: text1i,
            text2: text2i,
            text3: text3i,
            text4: text4i,
            text5: text5i
        });
        jobs.save(function(error) {
            if (error) {
                console.error(error);
            } else {
                res.redirect('/');
                console.log('job Posted');
            }
        });
    });
    //fin
    app.post('/fin-saved', function(req, res) {

        var email = req.session.cred.email;
        var que1fi = req.body.quesf1;
        var que2fi = req.body.quesf2;
        var que3fi = req.body.quesf3;
        var que4fi = req.body.quesf4;
        var que5fi = req.body.quesf5;
        var que6fi = req.body.quesf6;
        var que7fi = req.body.quesf7;
        var fins = new mon.finanicialdb({
            email: email,
            quef1: que1fi,
            quef2: que2fi,
            quef3: que3fi,
            quef4: que4fi,
            quef5: que5fi,
            quef6: que6fi,
            quef7: que7fi
        });
        fins.save(function(error) {

            if (error) {
                console.error(error);
            }
            res.redirect('/');
            console.log('Fin assist form Submitted');
        });
    });
    app.post('/mar-save', function(req, res) {


        var que1i = req.body.ques1;
        var que2i = req.body.ques2;
        var que3i = req.body.ques3;
        var que4i = req.body.ques4;
        var que5i = req.body.ques5;
        var que6i = req.body.ques6;
        var que7i = req.body.ques7;
        var que8i = req.body.ques8;
        var que9i = req.body.ques9;
        var que10i = req.body.ques10;
        var markets = new mon.markdb({

            quem1: que1i,
            quem2: que2i,
            quem3: que3i,
            quem4: que4i,
            quem5: que5i,
            quem6: que6i,
            quem7: que7i,
            quem8: que8i,
            quem9: que9i,
            quem10: que10i
        })
        markets.save(function(error) {

            if (error) {
                console.error(error);
            }
            res.redirect('/');
            console.log('markdb Updated');
        });
    });
}