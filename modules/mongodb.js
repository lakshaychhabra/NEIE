var mongoose = require('mongoose'); //MongoConnection
/* Mongo Connectivity */
mongoose.connect("mongodb://root:neie_rootexec@ds139942.mlab.com:39942/neie");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error")); //DB Connection fail
db.once("createConnection",function(callback) {
	console.log("MongoDB Connection Succeeded"); //DB connection success
});

/*Mongoose Schema */
var Schema = mongoose.Schema;
// employee schema
var logSchema = new Schema({
    cred: {
		firstName: String,
		lastName: String,
		orgName: String,
		email: String,
		pwd: String,
		typ: String,
		webs: String,
		mobile: String,
		domain: String
	}
});
//post a project schema
//hey ya
var project = new Schema({
		email: String,
    typeofjob: String,
    describejob: String,
    projectname: String,
    skillsrequired: [Schema.Types.Mixed],
    projectdescribe: String,
    price: String,
	duration: String,
});
// profile schema
var profile = new Schema({
	email: String,
	firstName: String,
	lastName: String,
	intro: String,
	fatName: String,
	addr: String,
	webs: String,
	lin: String,
	twit: String,
	wex: [Schema.Types.Mixed],
	skills: [Schema.Types.Mixed],
	edu: [Schema.Types.Mixed],
	langs: [Schema.Types.Mixed],
	certs: [Schema.Types.Mixed],
	refers: [Schema.Types.Mixed]
});
// enterepenuer schema
var enProfile = new Schema({
	email: String,
	orgName: String,
	fullName: String,
	aboutUs: String,
	vision: String,
	foundOn: String,
	corpHQ: String,
	iType: String
});
// Notifications Schema
var notify = new Schema({
	sender: String,
	receiver: String,
	action: String,
	status: Number
});
//message schema
var message = new Schema({
	sender: String,
	receiver: String,
	message: String,
	fullname: String
});
//queries schema
var queries = new Schema({
	email: String,
	domain: String,
	desc: String,
	expec: String
});
//Answers
var answers = new Schema({
	email: String,
	qid: String,
	txt: String
});
//expert ques schema
var expert_request = new Schema({
	email: String,
	ques1: String,
	ques2: String,
	ques3: String,
	ques4: String
});
//job schema
var job = new Schema({
		email: String,
		text1: String,
    text2: String,
    text3:String,
    text4:String,
    text5:String
});
//financial assist schema
var finanicial = new Schema({
		email:String,
    quef1: String,
    quef2: String,
    quef3:String,
    quef4:String,
    quef5:String,
    quef6:String,
    quef7:String

});
// market assist schema
var marketing = new Schema({
		email:String,
    quem1: String,
    quem2: String,
    quem3:String,
    quem4:String,
    quem5:String,
    quem6:String,
    quem7:String,
    quem8:String,
    quem9:String,
    quem10:String
});
//Feedback Schema
var feed = new Schema({
		empemail: String,
        entremail:String,
		comments: String,
		rating: String
});
// My Projects
var myproj = new Schema({
	projid : String,
	email : String
});
// Projects completion
var comp_proj = new Schema({
	email: String,
	nopp: Number
});

module.exports = {
	Users : mongoose.model("Users", logSchema),
	projects : mongoose.model("Projects", project),
	profiles : mongoose.model("Profiles", profile),
	enProfile : mongoose.model("Entrepreneur_prof", enProfile),
	notify : mongoose.model("Notifications", notify),
	message : mongoose.model("Messages", message),
	queries : mongoose.model("Queries", queries),
	answers : mongoose.model("Answers", answers),
	exreq : mongoose.model("Expert_Requests", expert_request),
	jobdb : mongoose.model("job", job),
	finanicialdb : mongoose.model("fin", finanicial),
	markdb : mongoose.model("market",marketing),
	feedback : mongoose.model("feedback",feed),
	myproj : mongoose.model("myprojects",myproj),
	cproj : mongoose.model("completed",comp_proj)
}
