var mon = require('./mongodb.js');

module.exports = function(email) {
	var f_score=0;
	
	mon.feedback.find({"empemail":email},function(err,feed){
		if(err) {
			console.log(err);
		}
		else {
			for(i=0;i<feed.length;i++) {
				if(!feed[i].rating) {
				}
				else {
				f_score = f_score + parseInt(feed[i].rating);
				}
			}
			return f_score;
		}
	});
}