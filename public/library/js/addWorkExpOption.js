
var limit_input = 0;
var limit_skill = 0;
var limit_edu = 0;
var limit_lang = 0;
var limit_cert = 0;
var limit_ref = 0;


function limit(tag,op) {
		$("#"+tag).val( function(i, oldval) {
			if(op=="add") {
				return parseInt( oldval, 10) + 1;
			}
			else if(op=="sub") {
				return parseInt( oldval, 10) - 1;
			}
		});
}

function addInput(divName){
						limit("limit_input","add");
						limit_input++;
                        var newdiv1 = document.createElement('div');
                        newdiv1.innerHTML = "<div id='cla_"+limit_input+"'><a class='del_cla'><i style='float: right;' class='fa fa-times' aria-hidden='true'></i></a><div class='row container-fluid'><div class='col-md-6'><label for='job'>Job title</label><input id='job' class='form-control' type='text'></div><div class='col-md-6'><label for='company'>Company</label><input id='company' class='form-control' type='text'>    </div></div><div class='row'><div class='col-md-6'><label for='startDate'>Date from</label><input id='startDate' class='form-control' type='month'></div><div class='col-md-6'><label for='endDate'>Date to</label><input id='endDate' class='form-control' type='month'></div></div><br><br></div>";
                        document.getElementById(divName).appendChild(newdiv1);
                    }
function addSkill(divName1){
						limit("limit_skill","add");
						limit_skill++;
                        var newdiv1 = document.createElement('div');
                        newdiv1.innerHTML = "<div id='cla1_"+limit_skill+"'><a class='del_cla1'><i style='float: right;' class='fa fa-times' aria-hidden='true'></i></a><div class='row container-fluid'><div class='col-md-6'><label for='domain'>Domain&nbsp;</label><select id='domain' name='Domain'><option value='Website, IT and Software'>Website, IT and Software</option><option value='Data Analysis'>Data Analysis</option><option value='Mobile Phones and Computing'>Mobile Phones and Computing</option><option value='Writing and Content'>Writing and Content</option><option value='Sales and Marketing'>Sales and Marketing</option><option value='Design, Media and Architecture'>Design, Media and Architecture</option><option value='Engineering and Science'>Engineering and Science</option><option value='Business, Accounting, HR and Legal'>Business, Accounting, HR and Legal</option></select><br><br><label for='skill'>Skill&nbsp;</label><select name='skills'><option value='PHP'>PHP</option><option value='Software Architecture'>Software Architecture</option><option value='SEO'>SEO</option><option value='MySQL'>MySQL</option><option value='Java'>Java</option><option value='HTML5'>HTML5</option><option value='C Programming'>C Programming</option><option value='App Developer'>App Developer</option><option value='Blog Install'>Blog Install</option><option value='Wordpress'>Wordpress</option></select></div></div><br><br></div>";
                        document.getElementById(divName1).appendChild(newdiv1);
                    }
function addEdu(divName2){
						limit("limit_edu","add");
						limit_edu++;
                        var newdiv1 = document.createElement('div');
                        newdiv1.innerHTML = "<div id='cla2_"+limit_edu+"'><a class='del_cla2'><i style='float: right;' class='fa fa-times' aria-hidden='true'></i></a><div class='row container-fluid'><div class='col-md-12'><label for='job'>Institution</label><input id='job' class='form-control' type='text'><br><label for='course'>Course</label><input id='course' class='form-control' type='text'><br></div><div class='row'><div class='col-md-6'><label for='startDate'>Grades</label><input id='startDate' class='form-control' type='text'></div><div class='col-md-6'><label for='endDate'>Passed out</label><input id='endDate' class='form-control' type='month'></div></div></div><br><br></div>";
                        document.getElementById(divName2).appendChild(newdiv1);
                    }
function addLang(divName3){
						limit("limit_lang","add");
						limit_lang++;
                        var newdiv1 = document.createElement('div');
                        newdiv1.innerHTML = "<div id='cla3_"+limit_lang+"'><a class='del_cla3'><i style='float: right;' class='fa fa-times' aria-hidden='true'></i></a><div class='row container-fluid'><div class='col-md-6'><label for='skill'>Language</label><input id='skill' class='form-control' type='text'></div></div><br><br></div>";
                        document.getElementById(divName3).appendChild(newdiv1);
                    }
function addCerti(divName4){
						limit("limit_cert","add");
						limit_cert++;
                        var newdiv1 = document.createElement('div');
                        newdiv1.innerHTML = "<div id='cla4_"+limit_cert+"'><a class='del_cla4'><i style='float: right;' class='fa fa-times' aria-hidden='true'></i></a><div class='row container-fluid'><div class='col-md-8'><label for='job'>Certificate</label><input id='job' class='form-control' type='text'></div><div class='col-md-4'><label for='startDate'>Date from</label><input id='startDate' class='form-control' type='month'></div></div><br><br></div>";
                        document.getElementById(divName4).appendChild(newdiv1);
                    }
function addRef(divName5){
						limit("limit_ref","add");
						limit_ref++;
                        var newdiv1 = document.createElement('div');
                        newdiv1.innerHTML = "<div id='cla5_"+limit_ref+"'><a class='del_cla5'><i style='float: right;' class='fa fa-times' aria-hidden='true'></i></a><div class='row container-fluid'><div class='row'><div class='col-md-6'><label for='rname'>Name </label><input id='rname' class='form-control' type='text'></div><div class='col-md-6'><label for='jobprofile'>Job Profile</label><input id='jobprofile' class='form-control' type='text'></div></div><div class='row'><div class='col-md-6'><label for='company'>Organization</label><input id='company' class='form-control' type='text'></div><div class='col-md-6'><i class='fa fa-phone-square' aria-hidden='true'></i><label for='phone'>&nbsp; Mobile </label><input id='phone' class='form-control' type='text' maxlength=10  required onkeypress='return event.charCode >= 48 && event.charCode <= 57'></div></div></div><br><br></div>";
                        document.getElementById(divName5).appendChild(newdiv1);
                    }
$(document).ready(function() {
	$('#dynamicInput').on('click', '.del_cla', function() {
			limit("limit_input","sub");
				$("#cla_"+limit_input).remove();
			limit_input--;
	});
    $('#dynamicSkill').on('click', '.del_cla1', function() {
			limit("limit_skill","sub");
				$("#cla1_"+limit_skill).remove();
			limit_skill--;
	});
    $('#dynamicEdu').on('click', '.del_cla2', function() {
			limit("limit_edu","sub");
				$("#cla2_"+limit_edu).remove();
			limit_edu--;
	});
    $('#dynamicLang').on('click', '.del_cla3', function() {
			limit("limit_lang","sub");
				$("#cla3_"+limit_lang).remove();
			limit_lang--;
	});
    $('#dynamicCerti').on('click', '.del_cla4', function() {
			limit("limit_cert","sub");
				$("#cla4_"+limit_cert).remove();
			limit_cert--;
	});
    $('#dynamicRef').on('click', '.del_cla5', function() {
			limit("limit_ref","sub");
				$("#cla5_"+limit_ref).remove();
			limit_ref--;
	});
});

