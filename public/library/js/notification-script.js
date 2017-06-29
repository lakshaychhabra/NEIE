/**
 * Created by Anuj on 24-Mar-17.
 */
function notify(event) {

    event.stopPropagation();
    var b=document.getElementById("notify-pannel");

    if(b.style.left!="100%"){
        b.style.transition="all 0.5s";
        b.style.left="100%";
    }else{

        b.style.transition="all 0.5s";
        b.style.left="80%";
    }
}
document.body.addEventListener("click", function(event) {
    if(document.getElementById("notify-pannel").style.left!="100%") {
        document.getElementById("notify-pannel").style.transition = "all 0.5s";
        document.getElementById("notify-pannel").style.left="100%";
    }

});