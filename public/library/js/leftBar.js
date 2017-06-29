/**
 * Created by Anuj on 20-Mar-17.
 */

function slide() {

    var a=document.getElementById("left-can");
    var b= document.getElementById("canvas");
    var c=document.getElementById("mainView");


    if(a.style.left!="-17.35%"){
        a.style.transition="all 0.3s";
        a.style.left="-17.35%";
        b.style.transition="all 0.3s";
        b.style.width="98%";
        b.style.left="2%";
    }
    else {
        a.style.transition="all 0.3s";
        a.style.left="0%";
        b.style.transition="all 0.3s";
        b.style.width="82%";
        b.style.left="17.35%";
    }
}
function bp(event) {
    event.stopPropagation();
    var a=document.getElementById("bp2");
    if(a.style.display=="block"){
        a.style.transition="all 1s";
        a.style.display="none";
    }else {
        a.style.transition="all 1s";
        a.style.display="block";
    }
}

/*document.body.addEventListener("click", function () {
   document.querySelector("#bp2").style.display = "none";
});
*/
function stable(event){
    event.stopPropagation();
}