/**
 * Created by Anuj on 25-Mar-17.
 */

function popUp(event) {

    event.stopPropagation();
    var a=document.getElementById("pop-up");

    a.style.transition="all 1s";
    a.style.height="40%";
    a.style.width="40%";
    a.style.border="2px solid white";
    a.style.boxShadow="0px 0px 5px 1px white";

}
function stable(event) {
    event.stopPropagation();

}
document.body.addEventListener("click", function(event) {
    if(document.getElementById("pop-up").style.height != "0%") {
        document.getElementById("pop-up").style.transition ="all 1s";
        document.getElementById("pop-up").style.height ="0%";
        document.getElementById("pop-up").style.width ="0%";
        document.getElementById("pop-up").style.border ="0px solid transparent";
        document.getElementById("pop-up").style.boxShadow="0px 0px 0px 0px transparent";

    }
});