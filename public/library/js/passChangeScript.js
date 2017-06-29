/**
 * Created by Anuj on 21-Mar-17.
 */
function passChange(event) {
    event.stopPropagation();
    var a=document.getElementById("password");


    if (a.style.display=="block"){
        a.style.display="none";
    }else {
        a.style.display="block";
        document.getElementById("drop").style.display="none";
    }
}

document.body.addEventListener("click", function(event) {
    if(document.getElementById("password").style.display != "none") {

        document.getElementById("password").style.display ="none";
    }
});
