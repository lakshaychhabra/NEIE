/**
 * Created by Anuj on 23-Mar-17.
 */
function drop(event) {

    event.stopPropagation();

    var a=document.getElementById("drop");
    if(a.style.display!="block"){
        a.style.transition="all 0.5s";
        a.style.display="block";
    }
    else {
        a.style.transition="all 0.5s";
        a.style.display="none";
    }
}
function picClick(event) {
    event.stopPropagation();

    var a=document.getElementById("profile-pic");
    if(a.style.display!="block"){
        a.style.display="block";
    }
    else {
        a.style.display="none";
    }

}

document.body.addEventListener("click", function(event) {
    if(document.getElementById("drop").style.display != "none") {
        document.getElementById("drop").style.transition="all 0.5s";
        document.getElementById("drop").style.display ="none";
    }

    if(document.getElementById("profile-pic").style.display != "none") {
        document.getElementById("profile-pic").style.display = "none";
    }
});