var mongoose = require('mongoose');
var Project = mongoose.model("projects");

exports.delete = function(req, res) {
    Project.findOne({_id:req.params.id}).exec(function(err, project){
        if(project) {
           project.remove();
        }

        res.render("deleted");

    });
}